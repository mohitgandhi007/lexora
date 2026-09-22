import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_DOCUMENTS } from '../data/mockData';
import { DocumentLedger } from '../components/organisms/DocumentLedger';
import { SummaryCard } from '../components/organisms/SummaryCard';
import ladyJusticeImg from '../assets/lady_justice.png';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const recentDocs = MOCK_DOCUMENTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. HERO SECTION */}
      <section className="w-full bg-surface border-b border-outline-variant/30 pt-space-md pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-secondary" />
              <span className="text-[11px] font-mono tracking-editorial uppercase text-secondary font-bold">
                Appellate Workspace & Synthesis
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-on-surface font-normal leading-[1.12] tracking-tight mb-4">
              Your Legal Knowledge,{' '}
              <em className="italic font-serif font-light text-secondary block sm:inline">
                Clearly Understood.
              </em>
            </h1>

            <p className="text-sm md:text-base text-on-surface-variant font-sans leading-relaxed mb-8 max-w-xl">
              Upload legal documents, extract the information that matters, and turn complex case material into structured insights.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary text-on-secondary font-label-md text-xs uppercase tracking-wider shadow-sm hover:bg-on-secondary-fixed-variant active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Upload Document</span>
              </Link>

              <Link
                to="/documents"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-container border border-outline-variant/50 text-on-surface font-label-md text-xs uppercase tracking-wider hover:bg-surface-dim/60 transition-colors cursor-pointer"
              >
                <span>View Documents</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-outline pt-2 border-t border-outline-variant/30 w-full">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
                Indian Evidence Act & BNS Aligned
              </span>
              <span className="text-outline-variant hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-secondary">lock</span>
                Encrypted Chambers Sandbox
              </span>
            </div>
          </div>

          {/* Right Hero Image (Lady Justice Stitch Visual) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-2xl border border-outline-variant/40 shadow-md group">
              <img
                src={ladyJusticeImg}
                alt="Bronze sculpture of Lady Justice with scales beside antique law volumes"
                className="w-full h-72 sm:h-96 lg:h-[420px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[10px] sm:text-xs tracking-wider uppercase">
                <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded">
                  FOLIO SERIES • 2026
                </span>
                <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded text-amber-200">
                  SUPREME COURT DOCKET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-margin pt-space-xl pb-space-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-editorial text-outline font-semibold">
              Quick Actions
            </span>
            <div className="h-px w-12 bg-outline-variant/50" />
          </div>
          <Link
            to="/documents"
            className="text-[11px] font-mono uppercase tracking-wider text-secondary hover:underline"
          >
            Workspace Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Quick Action 01 */}
          <Link
            to="/upload"
            className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 hover:border-secondary/50 hover:bg-surface-container transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-normal text-secondary">01</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  north_east
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-surface mb-1">
                Upload Document
              </h3>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Ingest SLPs, paper books, or charge sheets for automated indexing.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold mt-4">
              Direct Ingestion
            </span>
          </Link>

          {/* Quick Action 02 */}
          <Link
            to="/documents"
            className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 hover:border-secondary/50 hover:bg-surface-container transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-normal text-secondary">02</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  north_east
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-surface mb-1">
                View Documents
              </h3>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Browse indexed repository, evidentiary filings, and archived pleadings.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold mt-4">
              Repository Index
            </span>
          </Link>

          {/* Quick Action 03 */}
          <Link
            to="/summary/doc-2"
            className="bg-surface-container-low p-space-lg rounded-xl border border-outline-variant/30 hover:border-secondary/50 hover:bg-surface-container transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-normal text-secondary">03</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  north_east
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-on-surface mb-1">
                Recent Summaries
              </h3>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Access AI-extracted ratio decidendi, statutory anomalies, and brief notes.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold mt-4">
              Synthesized Ratios
            </span>
          </Link>
        </div>
      </section>

      {/* 3. RECENT DOCUMENTS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-margin pt-space-lg pb-space-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-editorial text-outline font-semibold">
              Recent Documents
            </span>
            <div className="h-px w-12 bg-outline-variant/50" />
          </div>
          <Link
            to="/documents"
            className="text-[11px] font-mono uppercase tracking-wider text-secondary hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Documents</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <DocumentLedger
          documents={recentDocs}
          onSelectDocument={(id) => navigate(`/documents/${id}`)}
          onReviewBrief={(id) => navigate(`/summary/${id}`)}
        />
      </section>

      {/* 4. RECENT SUMMARIES SECTION */}
      <section className="w-full max-w-7xl mx-auto px-margin pt-space-lg pb-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-editorial text-outline font-semibold">
                Recent Summaries
              </span>
              <div className="h-px w-12 bg-outline-variant/50" />
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Latest AI-synthesized ratio decidendi and bench insights
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold flex items-center gap-1 self-start sm:self-auto">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Synthesized via Constitutional Vector Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <SummaryCard
            category="ARBITRATION LAW"
            date="18 Sep 2026"
            title="SLP (Civil) Union of India vs. K.S. Minerals Ltd."
            description="Section 34 & 37 Arbitration Act jurisdictional overreach assessment. Isolated contradiction between High Court findings and 3-Judge Bench precedents."
            badgeLabel="RATIO DECIDENDI"
            linkTo="/summary/doc-2"
          />

          <SummaryCard
            category="LIMITATION & AWARD"
            date="17 Sep 2026"
            title="NHAI vs. M/s Soma Consortium"
            description="Section 34(3) statutory limitation bar flagged. Synthesized distinction parameters between patent illegality and commercial interpretation."
            badgeLabel="BENCH PRECEDENTS"
            linkTo="/summary/doc-3"
          />

          <SummaryCard
            category="CRIMINAL CODE CONCORDANCE"
            date="15 Sep 2026"
            title="State of Maharashtra vs. R. K. Singhal"
            description="Concordance cross-mapping of erstwhile IPC 420 against BNS 318(4) evidentiary thresholds with Supreme Court precedent matrix."
            badgeLabel="STATUTORY CONCORDANCE"
            linkTo="/summary/doc-4"
          />
        </div>
      </section>

      {/* 5. INFORMATION DOCTRINE SECTION */}
      <section className="w-full max-w-7xl mx-auto px-margin pb-space-lg">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/40 p-8 md:p-12 shadow-sm">
          {/* Watermark */}
          <div className="absolute -right-8 -bottom-10 select-none pointer-events-none opacity-5 font-serif text-[180px] font-bold leading-none text-on-surface">
            LEX
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-secondary" />
              <span className="text-[10px] font-mono tracking-editorial uppercase text-secondary font-bold">
                Archival Rigor & Reasoning
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-on-surface font-semibold tracking-tight uppercase mb-3">
              Understand More. Search Faster.
            </h2>

            <p className="text-sm md:text-base text-on-surface-variant font-sans leading-relaxed mb-6">
              Lexora structures unstructured judicial transcripts, paper books, and statutes into a verified, citation-backed intelligence network built strictly for high-stakes counsel and litigation chambers.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] font-mono text-outline font-semibold uppercase tracking-wider">
              <span>Bench Analysis</span>
              <span className="text-outline-variant">•</span>
              <span>Ratio Decidendi</span>
              <span className="text-outline-variant">•</span>
              <span>BNS Concordance</span>
              <span className="text-outline-variant">•</span>
              <span>Cross-Citation Graph</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
