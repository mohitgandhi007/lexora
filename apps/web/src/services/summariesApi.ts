import { LegalSummary } from '../types';
import { MOCK_SUMMARIES } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const summariesApi = {
  async getSummaryByDocId(docId: string): Promise<LegalSummary | undefined> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/summaries/${docId}`);
        if (!response.ok) throw new Error('Failed to fetch summary from Hono API');
        return await response.json();
      } catch (err) {
        console.warn('API error, falling back to local summaries store:', err);
      }
    }

    return new Promise((resolve) => {
      // If direct match exists, return it; otherwise return default rich brief for demo
      const summary = MOCK_SUMMARIES[docId] || MOCK_SUMMARIES['doc-2'];
      setTimeout(() => resolve(summary), 150);
    });
  },

  async getAllSummaries(): Promise<LegalSummary[]> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/summaries`);
        if (!response.ok) throw new Error('Failed to fetch summaries from Hono API');
        return await response.json();
      } catch (err) {
        console.warn('API error, falling back to local summaries store:', err);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(Object.values(MOCK_SUMMARIES)), 150);
    });
  },
};
