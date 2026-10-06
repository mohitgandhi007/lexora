import { ChambersTenant, ChambersUser } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

const FALLBACK_TENANT: ChambersTenant = {
  id: 'tenant-supreme-chambers',
  name: 'Chambers of Supreme Court Practice',
  jurisdiction: 'Supreme Court of India • Civil & Constitutional Appellate',
  address: 'Chambers of Supreme Court of India, Bhagwan Das Road, New Delhi',
  createdAt: '2026-01-01',
};

const FALLBACK_USERS: ChambersUser[] = [
  {
    id: 'counsel-01',
    tenantId: 'tenant-supreme-chambers',
    email: 'nariman.senior@chambers.in',
    fullName: 'Adv. V. Nariman',
    role: 'admin',
    designation: 'Designated Senior Counsel',
    barCouncilId: 'SC/1994/DEL',
  },
  {
    id: 'counsel-02',
    tenantId: 'tenant-supreme-chambers',
    email: 'priya.advocate@chambers.in',
    fullName: 'Adv. Priya Ramaswamy',
    role: 'advocate',
    designation: 'Appellate Advocate',
    barCouncilId: 'D/1420/2012',
  },
  {
    id: 'staff-01',
    tenantId: 'tenant-supreme-chambers',
    email: 'clerk.registry@chambers.in',
    fullName: 'Mr. R. K. Sharma',
    role: 'staff',
    designation: 'Senior Bench Clerk',
    barCouncilId: 'REG/2018/SC',
  },
];

export const tenantsApi = {
  async getTenants(): Promise<ChambersTenant[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/tenants`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) return json.data;
      }
    } catch (e) {
      console.warn('API unavailable, returning local chambers tenant:', e);
    }
    return [FALLBACK_TENANT];
  },

  async getTenantById(id: string): Promise<ChambersTenant> {
    try {
      const res = await fetch(`${API_BASE_URL}/tenants/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn('API unavailable, returning local tenant:', e);
    }
    return FALLBACK_TENANT;
  },

  async updateTenant(id: string, data: Partial<ChambersTenant>): Promise<ChambersTenant> {
    try {
      const res = await fetch(`${API_BASE_URL}/tenants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn('API update failed, updating local state:', e);
    }
    return { ...FALLBACK_TENANT, ...data };
  },

  async getUsers(tenantId?: string): Promise<ChambersUser[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        headers: tenantId ? { 'x-tenant-id': tenantId } : {},
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) return json.data;
      }
    } catch (e) {
      console.warn('API unavailable, returning local chamber users:', e);
    }
    return FALLBACK_USERS;
  },

  async createUser(input: {
    tenantId: string;
    email: string;
    fullName: string;
    role?: 'admin' | 'advocate' | 'staff';
    barCouncilId?: string;
    designation?: string;
  }): Promise<ChambersUser> {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': input.tenantId,
        },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      console.warn('API createUser failed, falling back to local simulation:', e);
    }

    const newUser: ChambersUser = {
      id: `counsel-${Date.now()}`,
      tenantId: input.tenantId,
      email: input.email,
      fullName: input.fullName,
      role: input.role || 'advocate',
      barCouncilId: input.barCouncilId || 'BCI/2026',
      designation: input.designation || 'Counsel',
    };
    FALLBACK_USERS.push(newUser);
    return newUser;
  },
};
