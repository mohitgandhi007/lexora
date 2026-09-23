import { LegalDocument } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

// Production API URL configured via env or app.json extra
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const documentsApi = {
  async getDocuments(): Promise<LegalDocument[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/documents`);
        if (!res.ok) throw new Error('Failed to fetch dockets from Hono API');
        return await res.json();
      } catch (err) {
        console.warn('API unavailable, returning local chambers repository:', err);
      }
    }
    return new Promise((resolve) => setTimeout(() => resolve([...MOCK_DOCUMENTS]), 200));
  },

  async getDocumentById(id: string): Promise<LegalDocument | undefined> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/documents/${id}`);
        if (!res.ok) throw new Error('Failed to fetch docket from Hono API');
        return await res.json();
      } catch (err) {
        console.warn('API unavailable, returning local chambers repository:', err);
      }
    }
    return new Promise((resolve) => {
      const doc = MOCK_DOCUMENTS.find((d) => d.id === id || d.filename === id);
      setTimeout(() => resolve(doc), 150);
    });
  },

  async uploadDocument(file: { name: string; size?: number; uri?: string }): Promise<LegalDocument> {
    if (API_BASE_URL && file.uri) {
      const formData = new FormData();
      formData.append('document', {
        uri: file.uri,
        name: file.name,
        type: 'application/pdf',
      } as any);
      const res = await fetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Hono upload failed');
      return await res.json();
    }

    return new Promise((resolve) => {
      const newDoc: LegalDocument = {
        id: `doc-${Date.now()}`,
        filename: file.name,
        title: file.name,
        courtName: 'Supreme Court of India',
        benchDesignation: 'Registry Ingestion Pipeline',
        type: file.name.toLowerCase().includes('slp')
          ? 'Special Leave Petition'
          : file.name.toLowerCase().includes('award')
          ? 'Commercial Award'
          : 'Judgment',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        pages: Math.floor(Math.random() * 60) + 20,
        status: 'Processed',
        fileSize: file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '5.2 MB',
        verified: true,
        concordance: '98.8%',
        snippet: 'Newly ingested docket through mobile client-side privilege pipeline.',
      };
      setTimeout(() => resolve(newDoc), 800);
    });
  },
};
