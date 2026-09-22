import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_SUMMARIES, MOCK_DOCUMENTS } from '../data/mockData';
import { LegalProvision } from '../components/molecules/LegalProvision';
import { Button } from '../components/atoms/Button';

export const Summary: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Look up summary by doc id, or default to doc-2 (Union of India v. K.S. Minerals)
  const summary = MOCK_SUMMARIES[id || 'doc-2'] || MOCK_SUMMARIES['doc-2'];
  const associatedDoc = MOCK_DOCUMENTS.find((d) => d.id === summary.documentId) || MOCK_DOCUMENTS[1];

  return (
    <div className="flex flex-col w-full pb-24 bg-surface">
      <div className="w-full max-w-5xl mx-auto px-margin pt-space-md flex flex-col gap-space-lg">
        {/* Top Breadcrumb & Metadata Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-b border-outline-variant/30 pb-3">
          <Link
            to="/documents"
            className="inline-flex items-center gap-1.5 text-secondary hover:text-on-surface transition-colors font-label-md text-xs uppercase tracking-wider group"
          >
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>Back to Repository</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={`/documents/${associatedDoc.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/50 text-xs font-mono uppercase text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">description</span>
              <span>Open in Document Viewer</span>
            </Link>

            <div className="flex items-center gap-1.5 bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>{summary.concordance}</span>
            </div>
          </div>
        </div>

        {/* 1. INTELLIGENCE BRIEF HEADER */}
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-secondary font-bold tracking-wider">
            <span>{summary.category}</span>
            <span className="text-outline-variant">•</span>
            <span>{summary.date}</span>
            <span className="text-outline-variant">•</span>
            <span className="text-outline font-normal">Folio Review</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-on-surface tracking-tight font-semibold leading-tight">
            {summary.title}
          </h1>

          <p className="text-xs sm:text-sm font-sans text-on-surface-variant">
            {summary.court} • <span className="font-medium text-on-surface">{summary.bench}</span>
          </p>
        </header>

        {/* 2. KEY TAKEAWAYS (HIGHLIGHT CALLOUT) */}
        <section className="bg-surface-container-low border-l-4 border-secondary p-space-lg rounded-r-xl shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-[20px] text-secondary">verified</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Key Legal Takeaways</h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed">
            {summary.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-secondary font-bold shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. EXECUTIVE SUMMARY */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-outline-variant/30 pb-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">article</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Executive Summary</h2>
          </div>
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
            {summary.executiveSummary}
          </p>
        </section>

        {/* 4. CASE INFORMATION GRID */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">account_balance</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Case Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Docket Identifier</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.caseNumber}</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Current Procedural Stage</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.stage}</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Petitioner</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.petitioner}</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Respondent</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.respondent}</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Forum Below</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.tribunalBelow}</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant/30">
              <span className="text-outline font-mono block text-[10px] uppercase mb-0.5">Date of Impugned Order</span>
              <span className="font-semibold text-on-surface">{summary.caseInformation.dateOfImpugnedOrder}</span>
            </div>
          </div>
        </section>

        {/* 5. LEGAL PROVISIONS ACCORDION */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-4 border-b border-outline-variant/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">gavel</span>
              <h2 className="font-serif text-lg font-semibold text-on-surface">Legal Provisions & Precedent Ratios</h2>
            </div>
            <span className="text-xs font-mono text-outline">
              {summary.legalProvisions.length} Provisions Flagged
            </span>
          </div>

          <div className="space-y-3">
            {summary.legalProvisions.map((provision, idx) => (
              <LegalProvision key={idx} provision={provision} defaultOpen={idx === 1} />
            ))}
          </div>
        </section>

        {/* 6. KEY FACTS */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">fact_check</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Chronological Key Facts</h2>
          </div>
          <ol className="space-y-3 text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed list-decimal list-inside pl-1">
            {summary.keyFacts.map((fact, idx) => (
              <li key={idx} className="pl-1">
                <span className="text-on-surface">{fact}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 7. IMPORTANT DATES TIMELINE */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">event</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Procedural Timeline & Critical Dates</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/40 text-[10px] font-mono uppercase text-outline">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Procedural Event</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-sans">
                {summary.importantDates.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-mono font-semibold text-secondary whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-2.5 px-3 text-on-surface">{item.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. PARTIES & COUNSEL */}
        <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-outline-variant/30 pb-2">
            <span className="material-symbols-outlined text-[20px] text-secondary">groups</span>
            <h2 className="font-serif text-lg font-semibold text-on-surface">Parties & Representation</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/40 text-[10px] font-mono uppercase text-outline">
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Party Name</th>
                  <th className="py-2.5 px-3">Appearing Counsel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-sans">
                {summary.parties.map((p, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50">
                    <td className="py-2.5 px-3 font-mono text-outline uppercase">{p.role}</td>
                    <td className="py-2.5 px-3 font-semibold text-on-surface">{p.name}</td>
                    <td className="py-2.5 px-3 text-secondary font-medium">{p.counsel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. STATUTORY AI DISCLOSURE */}
        <div className="bg-surface-container-low border border-outline-variant/40 p-4 rounded-xl flex items-center gap-3 text-xs text-on-surface-variant font-mono">
          <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">info</span>
          <span>
            <strong>AI Disclosure:</strong> {summary.aiDisclosure}
          </span>
        </div>
      </div>
    </div>
  );
};
