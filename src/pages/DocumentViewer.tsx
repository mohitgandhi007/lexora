import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_DOCUMENTS } from '../data/mockData';

export const DocumentViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doc = MOCK_DOCUMENTS.find((d) => d.id === id || d.filename === id) || MOCK_DOCUMENTS[1];

  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const totalPages = doc.pages || 142;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background">
      {/* 1. READER SUB-BAR TOOLBAR */}
      <div className="w-full bg-surface-container-low/95 backdrop-blur-md border-b border-outline-variant/40 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-margin py-2.5 flex flex-wrap items-center justify-between gap-space-md">
          {/* Left: Back & Title Meta */}
          <div className="flex items-center gap-space-md min-w-0">
            <Link
              to="/documents"
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-secondary transition-colors shrink-0 font-label-md text-xs uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">Repository</span>
            </Link>

            <div className="h-4 w-px bg-outline-variant/40 shrink-0" />

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-headline-sm text-sm sm:text-base text-on-surface truncate font-semibold font-serif">
                  {doc.title}
                </h1>
                <span className="font-label-sm text-xs text-on-surface-variant tracking-wider hidden md:inline">
                  — {doc.courtName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="bg-surface-container-highest text-on-surface-variant font-mono text-[10px] px-1.5 py-0.5 rounded uppercase">
                  {doc.type}
                </span>
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant font-mono text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                  ARCHIVAL RECORD
                </span>
                <span className="bg-surface-container text-on-surface-variant font-mono text-[10px] px-1.5 py-0.5 rounded">
                  {totalPages} FOLIOS
                </span>
              </div>
            </div>
          </div>

          {/* Right: Reader Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Zoom Control */}
            <div className="flex items-center bg-surface-container px-1 py-0.5 rounded border border-outline-variant/30 text-on-surface text-xs font-mono">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="w-6 h-6 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[14px]">remove</span>
              </button>
              <span className="px-1.5">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="w-6 h-6 flex items-center justify-center hover:bg-surface-container-high rounded transition-colors"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
              </button>
            </div>

            {/* Pagination Pager */}
            <div className="flex items-center bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/40 shadow-sm text-xs font-mono">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-30"
                title="Previous Page"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="px-1.5 text-on-surface whitespace-nowrap">
                <strong className="font-semibold text-secondary">{String(currentPage).padStart(2, '0')}</strong> / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-on-surface disabled:opacity-30"
                title="Next Page"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Jump to AI Summary */}
            <Link
              to={`/summary/${doc.id}`}
              className="flex items-center gap-1.5 bg-secondary text-on-secondary px-3 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-wider shadow-sm hover:bg-on-secondary-fixed-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
              <span className="hidden sm:inline">AI Summary</span>
            </Link>
          </div>
        </div>

        {/* METADATA STRIP */}
        <div className="w-full bg-surface-container px-margin py-1.5 border-t border-outline-variant/30 flex items-center justify-between overflow-x-auto text-on-surface-variant text-xs font-mono whitespace-nowrap gap-space-lg">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span><strong>Forum:</strong> {doc.courtName}</span>
              <span className="text-outline-variant">•</span>
              <span><strong>Date:</strong> {doc.date}</span>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <span className="hidden sm:inline"><strong>Bench:</strong> {doc.benchDesignation || 'Appellate Bench'}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-outline uppercase">
              <span>Client-Side AES-256</span>
              <span>•</span>
              <span className="text-secondary font-bold">Vol. I of IV</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN READER WORKSPACE (Sidebar Drawer + Folio Sheet) */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex relative">
        {/* LEFT SIDEBAR: Page Thumbnails */}
        <aside className="w-72 shrink-0 bg-surface-container-low border-r border-outline-variant/40 hidden lg:flex flex-col p-4 gap-3 select-none">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-outline border-b border-outline-variant/30 pb-2">
            <span>Pages ({totalPages})</span>
            <span className="text-secondary font-bold">Folio Index</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {[1, 2, 3, 4, 5, 6].map((pg) => (
              <div
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  currentPage === pg
                    ? 'bg-surface-container-lowest border-secondary shadow-md ring-1 ring-secondary'
                    : 'bg-surface-container hover:bg-surface-container-high border-outline-variant/40'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className={currentPage === pg ? 'text-secondary font-bold' : 'text-outline'}>
                    Folio {String(pg).padStart(2, '0')} {currentPage === pg ? '• Active' : ''}
                  </span>
                  {currentPage === pg && (
                    <span className="material-symbols-outlined text-[14px] text-secondary">bookmark</span>
                  )}
                </div>

                {/* Simulated Thumbnail Sheet */}
                <div className="w-full h-24 bg-surface p-2 rounded border border-outline-variant/30 flex flex-col justify-between">
                  <div className="w-12 h-1 bg-outline/40 mx-auto rounded mb-1" />
                  <div className="space-y-1">
                    <div className="w-full h-0.5 bg-outline/20 rounded" />
                    <div className="w-4/5 h-0.5 bg-outline/20 rounded" />
                    <div className="w-full h-0.5 bg-outline/20 rounded" />
                    <div className="w-3/4 h-0.5 bg-outline/20 rounded" />
                  </div>
                  <div className="w-8 h-1 bg-secondary/40 mx-auto rounded" />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER READING FOLIO */}
        <main className="flex-1 p-4 md:p-8 flex justify-center overflow-y-auto">
          <article
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-md p-8 md:p-14 text-on-surface font-serif transition-transform duration-150 relative"
          >
            {/* Archival Legal Header */}
            <div className="text-center border-b-2 border-outline-variant/40 pb-6 mb-8">
              <h2 className="text-sm font-mono tracking-editorial uppercase text-secondary font-bold mb-1">
                IN THE SUPREME COURT OF INDIA
              </h2>
              <h3 className="text-xs font-mono tracking-wider uppercase text-outline mb-3">
                EXTRAORDINARY APPELLATE JURISDICTION
              </h3>
              <p className="font-serif text-base font-semibold text-on-surface">
                SPECIAL LEAVE PETITION (CIVIL) DIARY NO. 41920 OF 2024
              </p>
              <p className="text-xs font-sans text-on-surface-variant mt-1">
                (Under Article 136 of the Constitution of India)
              </p>
            </div>

            {/* Parties Synopsis */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 font-sans text-xs mb-8 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span><strong>Petitioner:</strong> Union of India (Ministry of Mines)</span>
                <span className="font-mono text-outline">Versus</span>
                <span><strong>Respondent:</strong> K.S. Minerals & Offshore Ltd.</span>
              </div>
            </div>

            {/* Folio Text Content with luxury legal citation markers */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-on-surface">
              <p className="indent-8">
                <strong className="font-mono text-xs text-secondary mr-2">[1]</strong>
                The present Special Leave Petition raises substantial questions of law of general public importance concerning the extent of judicial scrutiny exercisable under{' '}
                <mark className="bg-secondary-fixed text-on-secondary-fixed font-semibold px-1 py-0.5 rounded font-sans">
                  Section 34 & 37
                </mark>{' '}
                of the Arbitration and Conciliation Act, 1996, in relation to sovereign mineral concessions located within the Exclusive Economic Zone under{' '}
                <mark className="bg-secondary-fixed text-on-secondary-fixed font-semibold px-1 py-0.5 rounded font-sans">
                  Article 297
                </mark>{' '}
                of the Constitution.
              </p>

              <p className="indent-8">
                <strong className="font-mono text-xs text-secondary mr-2">[2]</strong>
                It is respectfully submitted that the learned Sole Arbitrator exceeded his jurisdictional tether by re-writing commercial formula Clause 14.2 without bilateral consent. Such unilateral modification constitutes patent illegality appearing on the face of the award under{' '}
                <mark className="bg-secondary-fixed text-on-secondary-fixed font-semibold px-1 py-0.5 rounded font-sans">
                  Section 34(2A)
                </mark>, directly conflicting with the authoritative mandate of this Hon’ble Court in{' '}
                <em className="font-serif font-semibold text-on-surface">Associate Builders v. DDA (2015) 3 SCC 49</em> and{' '}
                <em className="font-serif font-semibold text-on-surface">Patel Engineering Ltd. (2020)</em>.
              </p>

              <p className="indent-8">
                <strong className="font-mono text-xs text-secondary mr-2">[3]</strong>
                The Division Bench of the High Court fell into grave error in affirming the award upon the superficial premise that contractual interpretation is solely within the arbitrator's province, failing to notice that statutory royalty regulations are non-derogable public policy covenants.
              </p>
            </div>

            {/* Folio Footer Stamp */}
            <div className="mt-16 pt-6 border-t border-outline-variant/30 flex items-center justify-between text-xs font-mono text-outline">
              <span>Folio Page {currentPage} of {totalPages}</span>
              <span className="text-secondary font-semibold">Filed by Adv. V. Nariman, Senior Counsel</span>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
