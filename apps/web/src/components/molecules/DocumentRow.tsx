import React from 'react';
import { StatusBadge } from '../atoms/StatusBadge';
import { LegalDocument } from '../../types';

export interface DocumentRowProps {
  document: LegalDocument;
  onSelect?: (id: string) => void;
  onReviewBrief?: (id: string) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({
  document,
  onSelect,
  onReviewBrief,
}) => {
  return (
    <tr
      onClick={() => onSelect?.(document.id)}
      className="group hover:bg-surface-container/60 border-b border-outline-variant/30 transition-colors cursor-pointer text-left"
    >
      {/* Document Identity */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-secondary group-hover:bg-secondary-fixed transition-colors shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              {document.status === 'In Queue' ? 'schedule' : 'description'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors truncate">
              {document.filename}
            </span>
            <span className="text-[11px] text-on-surface-variant font-mono mt-0.5">
              {document.pages} pages • {document.fileSize || 'Verified Record'}
            </span>
          </div>
        </div>
      </td>

      {/* Matter Classification */}
      <td className="py-4 px-4 hidden sm:table-cell">
        <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-xs font-medium">
          {document.type}
        </span>
      </td>

      {/* Ingestion Date */}
      <td className="py-4 px-4 text-xs font-mono text-on-surface-variant hidden md:table-cell">
        {document.date}
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <StatusBadge
          label={document.status}
          variant={document.status === 'Processed' ? 'processed' : document.status === 'In Queue' ? 'queue' : 'caution'}
          pulse={document.status === 'In Queue' || document.status === 'Processing'}
        />
      </td>

      {/* Docket Action */}
      <td className="py-4 px-4 text-right">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReviewBrief?.(document.id);
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-on-surface hover:text-secondary transition-colors cursor-pointer"
        >
          <span>Review Brief</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </td>
    </tr>
  );
};
