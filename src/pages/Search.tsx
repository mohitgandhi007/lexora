import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DOCUMENTS } from '../data/mockData';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('patent illegality');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Briefs' | 'Precedents' | 'Statutes'>('All');

  const searchResults = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        doc.filename.toLowerCase().includes(q) ||
        doc.title.toLowerCase().includes(q) ||
        doc.type.toLowerCase().includes(q) ||
        (doc.snippet && doc.snippet.toLowerCase().includes(q))
      );
    });
  }, [query]);

  return (
    <div className="flex flex-col w-full pb-20 bg-surface">
      {/* 1. TOP RESEARCH QUERY HERO */}
      <section className="w-full bg-surface-container-low border-b border-outline-variant/40 pt-space-lg pb-space-lg px-margin">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-secondary font-bold tracking-wider">
              <span>Appellate Research Engine</span>
              <span className="text-outline-variant">•</span>
              <span>SCC & BNS Concordance</span>
            </div>
            <span className="font-mono text-xs text-outline hidden sm:inline">
              RANKED BY RELEVANCE & BENCH PRECEDENTS
            </span>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl shadow-sm px-4 py-3 focus-within:border-secondary transition-all">
            <span className="material-symbols-outlined text-outline text-[22px] mr-3">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search citations (Art. 136, § 34), statutes, judges, parties or precedents..."
              className="w-full bg-transparent font-sans text-sm md:text-base text-on-surface placeholder:text-outline placeholder:italic focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
            {(['All', 'Briefs', 'Precedents', 'Statutes'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DUAL-COLUMN RESEARCH VIEWPORT */}
      <main className="w-full max-w-7xl mx-auto px-margin pt-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* LEFT COLUMN: Search Results (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-secondary">01</span>
                <span className="font-label-md text-xs uppercase tracking-widest text-on-surface">
                  Folio & Drafting Documents
                </span>
              </div>
              <span className="text-xs font-mono text-outline">
                {searchResults.length} Archival Matches
              </span>
            </div>

            {/* Results Stream */}
            <div className="space-y-4">
              {searchResults.map((doc) => (
                <article
                  key={doc.id}
                  className="bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/40 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-surface-container-high text-on-surface">
                        {doc.type}
                      </span>
                      <span className="text-xs font-mono text-outline">{doc.courtName}</span>
                    </div>
                    <span className="text-xs font-mono text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      {doc.concordance || '98.5% Concordance'}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-on-surface hover:text-secondary cursor-pointer transition-colors mb-2">
                    <Link to={`/documents/${doc.id}`}>{doc.filename}</Link>
                  </h3>

                  {/* Highlight Quote */}
                  <div className="p-3 bg-surface-container-low rounded-lg text-xs md:text-sm text-on-surface-variant font-sans leading-relaxed border-l-2 border-secondary mb-4">
                    “...the learned arbitrator committed fatal{' '}
                    <mark className="bg-secondary-fixed text-on-secondary-fixed font-semibold px-1 py-0.5 rounded font-sans">
                      Section 34(2A) patent illegality
                    </mark>{' '}
                    appearing on the face of the award by unilaterally rewriting commercial formula Clause 14.2 without bilateral consent...”
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/documents/${doc.id}`}
                        className="text-secondary font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Open Document</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                      <span className="text-outline-variant">•</span>
                      <Link
                        to={`/summary/${doc.id}`}
                        className="text-on-surface-variant hover:text-on-surface flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                        <span>Intelligence Brief</span>
                      </Link>
                    </div>
                    <span className="font-mono text-outline text-[11px]">{doc.pages} Folios • {doc.date}</span>
                  </div>
                </article>
              ))}

              {searchResults.length === 0 && (
                <div className="text-center py-16 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/40">
                  <span className="material-symbols-outlined text-[36px] text-outline mb-2">search_off</span>
                  <p className="font-serif text-lg text-on-surface">No legal records found for "{query}".</p>
                  <p className="text-xs text-on-surface-variant mt-1">Try searching for "Arbitration", "SLP", or "Patent Illegality".</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Research Dossier & Filtering (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/40 shadow-sm">
              <span className="font-serif text-sm font-semibold text-on-surface block mb-2">
                Active Concordance Filters
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                <span className="bg-surface-container-highest px-2 py-1 rounded text-secondary font-semibold">
                  Section 34(2A)
                </span>
                <span className="bg-surface-container-highest px-2 py-1 rounded text-secondary font-semibold">
                  Article 136
                </span>
                <span className="bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant">
                  Supreme Court
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant/40 shadow-sm">
              <span className="font-serif text-sm font-semibold text-on-surface block mb-1">
                Concordance Matrix
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                Precedents calibrated against 2024–2026 Constitution Bench holdings.
              </p>
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-outline-variant/20">
                <span className="text-outline">Vector Indexing:</span>
                <span className="text-emerald-700 font-bold">99.4% Verified</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
