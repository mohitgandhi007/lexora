import React, { useState } from 'react';
import counselPortrait from '../assets/counsel_portrait.png';
import { Button } from '../components/atoms/Button';

export const Settings: React.FC = () => {
  const [workspaceName, setWorkspaceName] = useState(
    'K. Venugopal Senior Chambers — Supreme Court Practice'
  );
  const [jurisdiction, setJurisdiction] = useState(
    'Supreme Court of India • Civil & Constitutional Appellate'
  );
  const [diglotActive, setDiglotActive] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-24 bg-surface">
      <div className="w-full max-w-4xl mx-auto px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Top Header */}
        <div className="border-b border-outline-variant/30 pb-3 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold block mb-1">
              Configuration Protocol
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold">
              Chambers & User Settings
            </h1>
          </div>
          {savedNotice && (
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
              Preferences Saved
            </span>
          )}
        </div>

        {/* SECTION 01: COUNSEL PROFILE */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={counselPortrait}
            alt="Adv. V. Nariman"
            className="w-24 h-24 rounded-full object-cover ring-2 ring-secondary/50 shadow-md shrink-0"
          />
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-mono text-[11px] uppercase tracking-wider text-secondary font-bold">
              Designated Senior Counsel
            </span>
            <h2 className="font-serif text-2xl font-bold text-on-surface mt-0.5">
              Adv. V. Nariman
            </h2>
            <p className="text-xs text-on-surface-variant font-mono mt-1">
              Supreme Court Bar Roll: SC/1994/DEL • 32 Years Standing
            </p>
            <p className="text-xs text-on-surface-variant mt-2 font-sans">
              Chambers of Supreme Court of India, Bhagwan Das Road, New Delhi.
            </p>
          </div>
        </section>

        {/* SECTION 02: WORKSPACE SPECIFICATION */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm flex flex-col gap-space-md">
          <div className="border-b border-outline-variant/20 pb-2">
            <span className="font-serif text-xs font-mono text-secondary uppercase font-bold tracking-wider">
              02 — Workspace Specification
            </span>
            <h3 className="font-serif text-lg font-semibold text-on-surface mt-0.5">
              Appellate Jurisdiction & Docket Parameters
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Workspace Identifier
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Primary Jurisdiction
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-secondary"
              >
                <option value="Supreme Court of India • Civil & Constitutional Appellate">
                  Supreme Court of India • Civil & Constitutional Appellate
                </option>
                <option value="Delhi High Court • Original & Commercial">
                  Delhi High Court • Original & Commercial
                </option>
                <option value="National Company Law Appellate Tribunal (NCLAT)">
                  National Company Law Appellate Tribunal (NCLAT)
                </option>
                <option value="International Commercial Arbitration Chambers">
                  International Commercial Arbitration Chambers
                </option>
              </select>
            </div>
          </div>

          {/* Bilingual Diglot Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <div>
              <span className="font-serif text-sm font-semibold text-on-surface block">
                Dual-Language Synthesis (English & Hindi Diglot)
              </span>
              <span className="text-xs text-on-surface-variant">
                Enables simultaneous bilingual ratio summaries for Supreme Court and High Court dockets.
              </span>
            </div>
            <input
              type="checkbox"
              checked={diglotActive}
              onChange={(e) => setDiglotActive(e.target.checked)}
              className="w-4 h-4 accent-secondary cursor-pointer shrink-0"
            />
          </div>

          {/* Vault Storage Tier */}
          <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-serif text-sm font-semibold text-on-surface block">
                Chambers Enterprise Dedicated Vault
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Dedicated tenant isolation • 48 Matters Indexed • 142 Folios Bound
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase text-secondary font-bold bg-surface-container px-2.5 py-1 rounded border border-outline-variant/40 self-start sm:self-auto">
              Tier Verified
            </span>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="terracotta" size="md" onClick={handleSave}>
              Save Chambers Configuration
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
