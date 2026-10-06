import React, { useState, useEffect } from 'react';
import { tenantsApi } from '../../services/tenantsApi';
import { documentsApi } from '../../services/documentsApi';
import { ChambersTenant, ChambersUser, LegalDocument } from '../../types';
import { Button } from '../../components/atoms/Button';
import { StatusBadge } from '../../components/atoms/StatusBadge';

export const PortalPage: React.FC = () => {
  const [tenant, setTenant] = useState<ChambersTenant | null>(null);
  const [users, setUsers] = useState<ChambersUser[]>([]);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Invite Counsel Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newCounselName, setNewCounselName] = useState('');
  const [newCounselEmail, setNewCounselEmail] = useState('');
  const [newCounselRole, setNewCounselRole] = useState<'advocate' | 'staff' | 'admin'>('advocate');
  const [newCounselBarRoll, setNewCounselBarRoll] = useState('');
  const [newCounselDesignation, setNewCounselDesignation] = useState('Appellate Counsel');

  // Edit Tenant Details State
  const [isEditingTenant, setIsEditingTenant] = useState(false);
  const [tenantNameInput, setTenantNameInput] = useState('');
  const [tenantJurisdictionInput, setTenantJurisdictionInput] = useState('');
  const [tenantAddressInput, setTenantAddressInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    try {
      const [tList, uList, dList] = await Promise.all([
        tenantsApi.getTenants(),
        tenantsApi.getUsers(),
        documentsApi.getDocuments(),
      ]);

      const activeTenant = tList[0] || null;
      setTenant(activeTenant);
      if (activeTenant) {
        setTenantNameInput(activeTenant.name);
        setTenantJurisdictionInput(activeTenant.jurisdiction || '');
        setTenantAddressInput(activeTenant.address || '');
      }
      setUsers(uList);
      setDocuments(dList);
    } catch (e) {
      console.error('Error loading portal data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;

    try {
      const created = await tenantsApi.createUser({
        tenantId: tenant.id,
        fullName: newCounselName,
        email: newCounselEmail,
        role: newCounselRole,
        barCouncilId: newCounselBarRoll,
        designation: newCounselDesignation,
      });

      setUsers((prev) => [created, ...prev]);
      setIsInviteModalOpen(false);
      setNewCounselName('');
      setNewCounselEmail('');
      setNewCounselBarRoll('');
      showToast(`Counsel credentials issued for ${created.fullName || created.name || 'member'}`);
    } catch (err: any) {
      alert(err.message || 'Failed to add counsel');
    }
  };

  const handleSaveTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenant) return;

    try {
      const updated = await tenantsApi.updateTenant(tenant.id, {
        name: tenantNameInput,
        jurisdiction: tenantJurisdictionInput,
        address: tenantAddressInput,
      });
      setTenant(updated);
      setIsEditingTenant(false);
      showToast('Chambers organization profile updated');
    } catch (err: any) {
      alert(err.message || 'Failed to update chambers');
    }
  };

  const handleAdvanceMilestone = async (docId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'In Queue' ? 'processing' : 'ready';
    await documentsApi.updateMilestoneStatus(docId, nextStatus as any, undefined, '99.4%');
    showToast(`Docket milestone updated to: ${nextStatus.toUpperCase()}`);
    loadData();
  };

  const stats = {
    totalDocs: documents.length,
    processed: documents.filter((d) => d.status === 'Processed').length,
    inQueue: documents.filter((d) => d.status === 'In Queue' || d.status === 'Processing').length,
    counselCount: users.filter((u) => u.role === 'admin' || u.role === 'advocate').length,
    staffCount: users.filter((u) => u.role === 'staff').length,
  };

  return (
    <div className="flex flex-col w-full pb-24 bg-surface font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-secondary text-on-secondary px-5 py-3 rounded-xl shadow-lg border border-secondary/50 font-mono text-xs flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Top Chambers Header */}
        <div className="border-b border-outline-variant/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
                Organization Administration Portal
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold tracking-tight">
              {tenant?.name || 'Chambers of Supreme Court Practice'}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant font-sans mt-1">
              {tenant?.jurisdiction || 'Supreme Court of India • Civil & Constitutional Appellate'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              iconLeft={<span className="material-symbols-outlined text-[18px]">edit</span>}
              onClick={() => setIsEditingTenant(!isEditingTenant)}
            >
              {isEditingTenant ? 'Cancel Edit' : 'Edit Chambers'}
            </Button>
            <Button
              variant="terracotta"
              size="md"
              iconLeft={<span className="material-symbols-outlined text-[18px]">person_add</span>}
              onClick={() => setIsInviteModalOpen(true)}
            >
              Invite Counsel
            </Button>
          </div>
        </div>

        {/* Edit Tenant Form Drawer */}
        {isEditingTenant && (
          <form
            onSubmit={handleSaveTenant}
            className="bg-surface-container-lowest p-6 rounded-2xl border border-secondary/40 shadow-sm flex flex-col gap-4 animate-fade-in"
          >
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <h3 className="font-serif text-lg font-semibold text-on-surface">
                Modify Chambers Specification
              </h3>
              <span className="font-mono text-[11px] text-secondary font-semibold uppercase">
                Tenancy ID: {tenant?.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Chambers Name
                </label>
                <input
                  type="text"
                  required
                  value={tenantNameInput}
                  onChange={(e) => setTenantNameInput(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Primary Forum / Jurisdiction
                </label>
                <input
                  type="text"
                  required
                  value={tenantJurisdictionInput}
                  onChange={(e) => setTenantJurisdictionInput(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Physical Registry Address
                </label>
                <input
                  type="text"
                  value={tenantAddressInput}
                  onChange={(e) => setTenantAddressInput(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditingTenant(false)}>
                Dismiss
              </Button>
              <Button type="submit" variant="terracotta" size="sm">
                Commit Updates
              </Button>
            </div>
          </form>
        )}

        {/* Chambers Telemetry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
              Archival Dockets
            </span>
            <span className="font-serif text-3xl font-bold text-on-surface mt-1">
              {stats.totalDocs}
            </span>
            <span className="text-xs font-mono text-emerald-700 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {stats.processed} Synthesized & Indexed
            </span>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
              Ingestion Pipeline
            </span>
            <span className="font-serif text-3xl font-bold text-on-surface mt-1">
              {stats.inQueue}
            </span>
            <span className="text-xs font-mono text-amber-700 mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
              Pending OCR Milestone
            </span>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
              Enrolled Advocates
            </span>
            <span className="font-serif text-3xl font-bold text-on-surface mt-1">
              {stats.counselCount}
            </span>
            <span className="text-xs font-mono text-secondary mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">balance</span>
              Supreme Court & High Court Bar
            </span>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-semibold">
              Registry Clerks
            </span>
            <span className="font-serif text-3xl font-bold text-on-surface mt-1">
              {stats.staffCount}
            </span>
            <span className="text-xs font-mono text-outline mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">badge</span>
              Filing & Bench Assistants
            </span>
          </div>
        </div>

        {/* SECTION 1: COUNSEL & USER MANAGEMENT */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">
                Directory & Access Control
              </span>
              <h2 className="font-serif text-xl font-bold text-on-surface">
                Chambers Members & Rolls
              </h2>
            </div>
            <span className="font-mono text-xs text-outline font-semibold">
              {users.length} Enrolled Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-[11px] font-mono uppercase text-outline">
                  <th className="py-2.5 px-3">Counsel / Member</th>
                  <th className="py-2.5 px-3">Chambers Designation</th>
                  <th className="py-2.5 px-3">Role Tier</th>
                  <th className="py-2.5 px-3">Bar Roll ID</th>
                  <th className="py-2.5 px-3">Email Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-xs font-sans">
                {users.map((u) => {
                  const counselName = u.fullName || u.name || 'Counsel';
                  return (
                    <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-serif font-bold text-secondary text-sm">
                            {counselName.charAt(0)}
                          </div>
                          <span className="font-semibold text-on-surface">{counselName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant font-medium">
                        {u.designation || 'Counsel'}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : u.role === 'advocate'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-stone-100 text-stone-700 border border-stone-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-outline">{u.barCouncilId || '—'}</td>
                      <td className="py-3 px-3 font-mono text-on-surface-variant">{u.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: DOCUMENT INGESTION & MILESTONES */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-6">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4 mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary font-bold block">
                Folio Lifecycle
              </span>
              <h2 className="font-serif text-xl font-bold text-on-surface">
                Document Ingestion & Processing Milestones
              </h2>
            </div>
            <span className="font-mono text-xs text-outline font-semibold">
              Live Database Dockets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-[11px] font-mono uppercase text-outline">
                  <th className="py-2.5 px-3">Document Title</th>
                  <th className="py-2.5 px-3">Court / Forum</th>
                  <th className="py-2.5 px-3">Milestone Status</th>
                  <th className="py-2.5 px-3">Concordance</th>
                  <th className="py-2.5 px-3">Pages / Size</th>
                  <th className="py-2.5 px-3 text-right">Advance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-xs font-sans">
                {documents.map((d) => (
                  <tr key={d.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-on-surface">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          description
                        </span>
                        <span>{d.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-on-surface-variant">{d.courtName}</td>
                    <td className="py-3 px-3">
                      <StatusBadge label={d.status} variant={d.status === 'Processed' ? 'processed' : d.status === 'Processing' ? 'caution' : 'queue'} pulse={d.status === 'Processing'} />
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-800 font-semibold">
                      {d.concordance || '98.5%'}
                    </td>
                    <td className="py-3 px-3 font-mono text-outline">
                      {d.pages} p. • {d.fileSize}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {d.status !== 'Processed' ? (
                        <button
                          onClick={() => handleAdvanceMilestone(d.id, d.status)}
                          className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] uppercase tracking-wider hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                        >
                          Advance Milestone ➔
                        </button>
                      ) : (
                        <span className="font-mono text-[11px] text-outline italic">
                          Milestone Complete
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Invite Counsel Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant/60 shadow-xl p-6 sm:p-8 animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary font-bold block">
                  Chambers Bar Registry
                </span>
                <h3 className="font-serif text-xl font-bold text-on-surface">
                  Enroll Advocate / Staff
                </h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleInviteUser} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Adv. Rajeshwari Seth"
                  value={newCounselName}
                  onChange={(e) => setNewCounselName(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Official Chambers Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="rajeshwari@chambers.in"
                  value={newCounselEmail}
                  onChange={(e) => setNewCounselEmail(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono uppercase text-outline font-semibold">
                    Role Tier
                  </label>
                  <select
                    value={newCounselRole}
                    onChange={(e: any) => setNewCounselRole(e.target.value)}
                    className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                  >
                    <option value="advocate">Advocate</option>
                    <option value="admin">Senior Counsel / Admin</option>
                    <option value="staff">Staff / Clerk</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono uppercase text-outline font-semibold">
                    Bar Roll ID
                  </label>
                  <input
                    type="text"
                    placeholder="D/1842/2016"
                    value={newCounselBarRoll}
                    onChange={(e) => setNewCounselBarRoll(e.target.value)}
                    className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Chambers Designation
                </label>
                <input
                  type="text"
                  placeholder="Appellate Associate"
                  value={newCounselDesignation}
                  onChange={(e) => setNewCounselDesignation(e.target.value)}
                  className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-outline-variant/30">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="terracotta" size="md">
                  Issue Credentials
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
