import { LegalSummary } from '../types';
import { MOCK_SUMMARIES } from '../data/mockData';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const summariesApi = {
  async getSummaryByDocId(docId: string): Promise<LegalSummary | undefined> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/summaries/${docId}`);
        if (!res.ok) throw new Error('Failed to fetch summary from Hono API');
        return await res.json();
      } catch (err) {
        console.warn('API unavailable, returning local chambers summary:', err);
      }
    }
    return new Promise((resolve) => {
      const summary = MOCK_SUMMARIES[docId] || MOCK_SUMMARIES['doc-2'];
      setTimeout(() => resolve(summary), 150);
    });
  },
};
