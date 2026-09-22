export interface AuthCredentials {
  email: string;
  password?: string;
  barRollNumber?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    designation: string;
    barRollNumber: string;
    chamber: string;
  };
  token: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const authApi = {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    if (API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Authentication failed');
      return await response.json();
    }

    // Mock local authentication response
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
          token: 'mock-lexora-session-token',
        });
      }, 600);
    });
  },

  async register(data: Record<string, string>): Promise<AuthResponse> {
    if (API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Registration failed');
      return await response.json();
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
      }, 700);
    });
  },
};
