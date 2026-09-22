import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_DOCUMENTS } from '../data/mockData';
import { DocumentLedger } from '../components/organisms/DocumentLedger';
import { SearchBar } from '../components/molecules/SearchBar';
import { Button } from '../components/atoms/Button';

export const Documents: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'All' | 'Processed' | 'In Queue'>('All');
  const [jurisdictionFilter, setJurisdictionFilter] = useState('All');
  const [matterFilter, setMatterFilter] = useState('All');

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.snippet && doc.snippet.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        activeStatusFilter === 'All' || doc.status === activeStatusFilter;

      const matchesJurisdiction =
        jurisdictionFilter === 'All' || doc.courtName.includes(jurisdictionFilter);

      const matchesMatter =
        matterFilter === 'All' || doc.type === matterFilter;

      return matchesSearch && matchesStatus && matchesJurisdiction && matchesMatter;
    });
  }, [searchQuery, activeStatusFilter, jurisdictionFilter, matterFilter]);

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="w-full max-w-7xl mx-auto px-margin pt-space-md flex flex-col gap-space-md">
        {/* Top Docket Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
            <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
              CHAMBERS REGISTRY • MICHAELMAS '26
            </span>
          </div>
          <span className="font-mono text-xs text-outline font-semibold">
            FOLIO No. 104 • 256-BIT PRIVILEGED
          </span>
        </div>

        {/* Page Title & Upload Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-1">
          <div>
            <span className="text-[10px] font-mono tracking-editorial uppercase text-secondary font-bold block mb-1">
              Appellate Repository
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-on-surface tracking-tight font-semibold">
              Legal Documents & Archive
            </h1>
            <p className="text-sm text-on-surface-variant font-sans mt-1">
              Archival custody & legal intelligence synthesis across Indian Courts
            </p>
          </div>

          <Button
            variant="terracotta"
            size="md"
            iconLeft={<span className="material-symbols-outlined text-[18px]">upload_file</span>}
            onClick={() => navigate('/upload')}
          >
            Upload Document
          </Button>
        </div>

        {/* Bench Archive Telemetry Card */}
        <div className="overflow-hidden rounded-xl bg-surface-container-high p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/40 shadow-sm mt-2">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-11 h-11 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-secondary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">auto_stories</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm uppercase text-secondary tracking-wider font-bold">
                BENCH ARCHIVE TELEMETRY
              </span>
              <span className="font-title-md text-title-md text-on-surface truncate">
                48 Folios Bound • 4 Ingestion Pipelines Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-emerald-700" />
              <span className="font-mono text-xs font-semibold text-on-surface">OCR Concordance: 88%</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 mt-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search briefs, citations (Art. 136, § 482), parties..."
          />

          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setActiveStatusFilter('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeStatusFilter === 'All'
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              All ({MOCK_DOCUMENTS.length})
            </button>

            <button
              onClick={() => setActiveStatusFilter('Processed')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeStatusFilter === 'Processed'
                  ? 'bg-secondary text-on-secondary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Processed (4)
            </button>

            <button
              onClick={() => setActiveStatusFilter('In Queue')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeStatusFilter === 'In Queue'
                  ? 'bg-secondary text-on-secondary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Processing (1)
            </button>

            {/* Jurisdiction Dropdown Filter */}
            <div className="ml-auto flex items-center gap-2">
              <select
                value={jurisdictionFilter}
                onChange={(e) => setJurisdictionFilter(e.target.value)}
                className="bg-surface-container text-on-surface text-xs font-sans px-3 py-1.5 rounded border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
              >
                <option value="All">All Jurisdictions</option>
                <option value="Supreme Court">Supreme Court of India</option>
                <option value="Delhi">Delhi High Court</option>
                <option value="Bombay">Bombay High Court</option>
                <option value="Arbitral">Arbitral Tribunal</option>
              </select>

              <select
                value={matterFilter}
                onChange={(e) => setMatterFilter(e.target.value)}
                className="bg-surface-container text-on-surface text-xs font-sans px-3 py-1.5 rounded border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
              >
                <option value="All">All Matters</option>
                <option value="Special Leave Petition">Special Leave Petition</option>
                <option value="Commercial Award">Commercial Award</option>
                <option value="Judgment">Judgment</option>
                <option value="Criminal Appeal">Criminal Appeal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Document Ledger Table */}
        <div className="mt-2">
          {filteredDocs.length > 0 ? (
            <DocumentLedger
              documents={filteredDocs}
              onSelectDocument={(id) => navigate(`/documents/${id}`)}
              onReviewBrief={(id) => navigate(`/summary/${id}`)}
            />
          ) : (
            <div className="text-center py-16 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/50">
              <span className="material-symbols-outlined text-[36px] text-outline mb-2">
                find_in_page
              </span>
              <p className="font-serif text-lg text-on-surface">No folios matched your query.</p>
              <p className="text-xs text-on-surface-variant mt-1">Try clearing filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
