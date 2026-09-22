import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadDropzone } from '../components/organisms/UploadDropzone';

export const Upload: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="w-full max-w-5xl mx-auto px-margin pt-space-md flex flex-col gap-space-md">
        {/* Top Breadcrumb & Metadata Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md mb-2 border-b border-outline-variant/30 pb-3">
          <Link
            to="/documents"
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface transition-colors font-label-md text-xs uppercase tracking-wider group"
          >
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>Back to Documents</span>
          </Link>

          <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant font-mono text-[11px] tracking-wider uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>Chambers Vault • 256-Bit TLS • Privilege Protected</span>
          </div>
        </div>

        {/* Editorial Header Block */}
        <div className="mb-4">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
            Folio Ingestion Protocol • Sec. LX-901
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-on-surface tracking-tight font-semibold">
            Upload Legal Document
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant font-sans mt-1 max-w-2xl leading-relaxed">
            Deposit petitions, trial records, or lower court records. Synthesizes ratio decidendi, statutory conflicts, and citation validity in real-time.
          </p>
        </div>

        {/* Interactive Dropzone State Machine */}
        <UploadDropzone
          onSuccess={(doc) => {
            console.log('Ingested doc:', doc);
          }}
        />

        {/* Ingestion Guidelines Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-1.5 text-secondary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <h4 className="font-serif text-sm font-semibold text-on-surface">Supreme Court OCR</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Trained on bilingual English & Devanagari legal records, registry stamps, and handwritten bench marginalia.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-1.5 text-secondary">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <h4 className="font-serif text-sm font-semibold text-on-surface">Client Privilege Encrypted</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Zero training on advocate data. Sandbox isolation guarantees strict Section 126 Evidence Act immunity.
            </p>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-1.5 text-secondary">
              <span className="material-symbols-outlined text-[18px]">account_tree</span>
              <h4 className="font-serif text-sm font-semibold text-on-surface">Citation Concordance</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cross-references SCC, AIR, and BNS provisions automatically with 98.4%+ statutory accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
