import { LegalDocument } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

// When backend is ready, VITE_API_BASE_URL will point to Hono API (e.g. http://localhost:8787/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const documentsApi = {
  async getDocuments(): Promise<LegalDocument[]> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/documents`);
        if (!response.ok) throw new Error('Failed to fetch documents from Hono API');
        return await response.json();
      } catch (err) {
        console.warn('API error, falling back to local chambers archive:', err);
      }
    }
    // Simulate lightweight network latency
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_DOCUMENTS]), 150);
    });
  },

  async getDocumentById(id: string): Promise<LegalDocument | undefined> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/documents/${id}`);
        if (!response.ok) throw new Error('Failed to fetch document from Hono API');
        return await response.json();
      } catch (err) {
        console.warn('API error, falling back to local chambers archive:', err);
      }
    }
    return new Promise((resolve) => {
      const doc = MOCK_DOCUMENTS.find((d) => d.id === id || d.filename === id);
      setTimeout(() => resolve(doc), 100);
    });
  },

  async uploadDocument(file: File): Promise<LegalDocument> {
    if (API_BASE_URL) {
      const formData = new FormData();
      formData.append('document', file);
      const response = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload to Hono API failed');
      return await response.json();
    }

    // Local simulated ingestion response
    return new Promise((resolve) => {
      const newDoc: LegalDocument = {
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
        snippet: 'Newly ingested docket through client-side AES-256 chambers pipeline. Ready for intelligence synthesis.',
      };
      setTimeout(() => resolve(newDoc), 800);
    });
  },
};
