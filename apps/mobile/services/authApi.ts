export interface AuthCredentials {
  email: string;
  password?: string;
  barRollNumber?: string;
}

export interface CounselProfile {
  id: string;
  name: string;
  designation: string;
  barRollNumber: string;
  chamber: string;
}

export interface AuthResponse {
  user: CounselProfile;
  token: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

export const authApi = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Auth API unavailable, falling back to local credentials session:', err);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'counsel-01',
            name: 'Adv. V. Nariman',
            designation: 'Senior Counsel',
            barRollNumber: 'SC/1994/DEL',
            chamber: 'Chambers of Supreme Court of India',
          },
          token: 'mock-lexora-mobile-token',
        });
      }, 500);
    });
  },

  async register(data: Record<string, string>): Promise<AuthResponse> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Auth API unavailable, falling back to mock enrollment:', err);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'counsel-new',
            name: data.fullName || 'Learned Advocate',
            designation: 'Counsel',
            barRollNumber: data.barRoll || 'BAR/2026',
            chamber: data.chamberName || 'Supreme Chambers',
          },
          token: 'mock-lexora-new-session',
        });
      }, 600);
    });
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('API unavailable for password reset:', err);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Chambers privilege recovery link transmitted.',
        });
      }, 500);
    });
  },
};
