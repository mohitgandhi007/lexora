import { LegalDocument } from '../types';
import { MOCK_DOCUMENTS } from '../data/mockData';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const searchApi = {
  async searchCases(query: string): Promise<LegalDocument[]> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Search failed on Hono API');
        return await res.json();
      } catch (err) {
        console.warn('API search error, falling back to local concordance search:', err);
      }
    }

    return new Promise((resolve) => {
      if (!query.trim()) {
        resolve([...MOCK_DOCUMENTS]);
        return;
      }
      const q = query.toLowerCase();
      const results = MOCK_DOCUMENTS.filter(
        (doc) =>
          doc.filename.toLowerCase().includes(q) ||
          doc.courtName.toLowerCase().includes(q) ||
          doc.type.toLowerCase().includes(q) ||
          (doc.snippet && doc.snippet.toLowerCase().includes(q))
      );
      setTimeout(() => resolve(results), 150);
    });
  },
};
