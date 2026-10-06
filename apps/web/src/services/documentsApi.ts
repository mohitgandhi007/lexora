import { LegalDocument } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

const mapDocFromBackend = (doc: any): LegalDocument => {
  let mappedStatus: LegalDocument['status'] = 'Processed';
  if (doc.status === 'ready' || doc.status === 'Processed') mappedStatus = 'Processed';
  else if (doc.status === 'processing') mappedStatus = 'Processing';
  else if (doc.status === 'uploaded' || doc.status === 'In Queue') mappedStatus = 'In Queue';
  else if (doc.status === 'failed') mappedStatus = 'Failed';

  return {
    id: doc.id,
    filename: doc.filename || doc.title,
    title: doc.title || doc.filename,
    courtName: doc.courtName || 'Supreme Court of India',
    benchDesignation: doc.benchDesignation || 'Appellate Chambers Registry',
    caseNumber: doc.caseNumber,
    type: doc.type || (doc.category === 'pleading' ? 'Special Leave Petition' : doc.category === 'contract' ? 'Commercial Award' : 'Judgment'),
    date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '18 Sep 2026'),
    pages: Number(doc.pages) || 42,
    status: mappedStatus,
    fileSize: doc.fileSize || '4.5 MB',
    verified: doc.verified ?? (mappedStatus === 'Processed'),
    concordance: doc.concordance || (doc.ocrConfidence ? `${doc.ocrConfidence}%` : '98.5%'),
    snippet: doc.snippet || doc.ocrText || 'Appellate Chambers indexed docket.',
    ocrText: doc.ocrText,
    detectedActs: doc.detectedActs || [],
    ocrConfidence: doc.ocrConfidence,
    storagePath: doc.storagePath,
    tenantId: doc.tenantId,
  };
};

export const documentsApi = {
  async getDocuments(): Promise<LegalDocument[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/documents`);
      if (response.ok) {
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.data || []);
        if (list.length > 0) {
          return list.map(mapDocFromBackend);
        }
      }
    } catch (err) {
      console.warn('API error, falling back to local chambers archive:', err);
    }
    return [...MOCK_DOCUMENTS];
  },

  async getDocumentById(id: string): Promise<LegalDocument | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/${id}`);
      if (response.ok) {
        const doc = await response.json();
        if (doc && !doc.error) return mapDocFromBackend(doc);
      }
    } catch (err) {
      console.warn('API error, falling back to local chambers archive:', err);
    }
    return MOCK_DOCUMENTS.find((d) => d.id === id || d.filename === id);
  },

  async uploadDocument(file: File): Promise<LegalDocument> {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('filename', file.name);
      formData.append('title', file.name.replace(/\.pdf$/i, '').replace(/_/g, ' '));
      const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const created = await response.json();
        return mapDocFromBackend(created);
      }
    } catch (err) {
      console.warn('API upload failed, creating local document instance:', err);
    }

    const fallbackDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      filename: file.name,
      title: file.name,
      courtName: 'Supreme Court of India',
      benchDesignation: 'Registry Docket Ingestion',
      type: file.name.toLowerCase().includes('slp')
        ? 'Special Leave Petition'
        : file.name.toLowerCase().includes('award')
        ? 'Commercial Award'
        : 'Judgment',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      pages: Math.floor(Math.random() * 80) + 20,
      status: 'Processed',
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      verified: true,
      concordance: '98.5%',
      snippet: 'Newly ingested docket through client-side chambers pipeline.',
    };
    MOCK_DOCUMENTS.unshift(fallbackDoc);
    return fallbackDoc;
  },

  subscribeToProgress(
    documentId: string,
    onProgress: (progress: {
      step: 'UPLOADING' | 'EXTRACTING_TEXT' | 'UNDERSTANDING_STRUCTURE' | 'PREPARING_SUMMARY' | 'COMPLETED' | 'FAILED';
      progressPercent: number;
      message: string;
      error?: string;
    }) => void
  ): () => void {
    let isClosed = false;

    if (typeof window !== 'undefined' && window.EventSource) {
      try {
        const eventSource = new EventSource(`${API_BASE_URL}/documents/${documentId}/progress`);

        eventSource.addEventListener('progress', (e) => {
          try {
            const data = JSON.parse(e.data);
            onProgress(data);
            if (data.step === 'COMPLETED' || data.step === 'FAILED') {
              eventSource.close();
            }
          } catch (_) {}
        });

        eventSource.onerror = () => {
          eventSource.close();
          if (!isClosed) startPolling();
        };

        return () => {
          isClosed = true;
          eventSource.close();
        };
      } catch (err) {
        console.warn('SSE subscription failed, using polling fallback:', err);
      }
    }

    function startPolling() {
      const interval = setInterval(async () => {
        if (isClosed) {
          clearInterval(interval);
          return;
        }
        try {
          const res = await fetch(`${API_BASE_URL}/documents/${documentId}/status`);
          if (res.ok) {
            const json = await res.json();
            if (json.progress) {
              onProgress(json.progress);
              if (json.progress.step === 'COMPLETED' || json.progress.step === 'FAILED') {
                clearInterval(interval);
              }
            }
          }
        } catch (_) {}
      }, 700);

      return () => {
        isClosed = true;
        clearInterval(interval);
      };
    }

    return startPolling();
  },

  getFileUrl(documentId: string): string {
    return `${API_BASE_URL}/documents/${documentId}/file`;
  },

  async updateMilestoneStatus(
    id: string,
    status: 'uploaded' | 'processing' | 'ready' | 'failed',
    ocrText?: string,
    concordance?: string
  ): Promise<LegalDocument | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/documents/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ocrText, concordance }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return mapDocFromBackend(json.data);
      }
    } catch (err) {
      console.warn('Status patch failed:', err);
    }
    return null;
  },

  async deleteDocument(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (err) {
      console.warn('Delete failed:', err);
      return false;
    }
  },
};
