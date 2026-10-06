import React from 'react';
import { LegalDocument } from '../../types';
import { DocumentRow } from '../molecules/DocumentRow';
import { StatusBadge } from '../atoms/StatusBadge';

export interface DocumentLedgerProps {
  documents: LegalDocument[];
  onSelectDocument?: (id: string) => void;
  onReviewBrief?: (id: string) => void;
}

export const DocumentLedger: React.FC<DocumentLedgerProps> = ({
  documents,
  onSelectDocument,
  onReviewBrief,
}) => {
  return (
    <div className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/40 bg-surface-container-low/50 text-[10px] font-mono tracking-editorial uppercase text-outline">
              <th className="py-3 px-4 font-semibold">Document Identity</th>
              <th className="py-3 px-4 font-semibold hidden sm:table-cell">Matter Classification</th>
              <th className="py-3 px-4 font-semibold hidden md:table-cell">Ingestion Date</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Docket Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                onSelect={onSelectDocument}
                onReviewBrief={onReviewBrief}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="sm:hidden divide-y divide-outline-variant/20">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onSelectDocument?.(doc.id)}
            className="p-4 flex flex-col gap-2 hover:bg-surface-container/40 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  description
                </span>
                <span className="font-serif text-sm font-semibold text-on-surface">
                  {doc.filename}
                </span>
              </div>
              <StatusBadge
                label={doc.status}
                variant={doc.status === 'Processed' ? 'processed' : 'queue'}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono">
              <span>{doc.type}</span>
              <span>{doc.pages} Folios • {doc.date}</span>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReviewBrief?.(doc.id);
                }}
                className="text-xs font-semibold text-secondary flex items-center gap-1"
              >
                <span>Review Brief</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
