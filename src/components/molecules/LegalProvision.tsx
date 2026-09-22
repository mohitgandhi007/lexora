import React, { useState } from 'react';
import { LegalProvision as LegalProvisionType } from '../../types';

export const LegalProvision: React.FC<{ provision: LegalProvisionType; defaultOpen?: boolean }> = ({
  provision,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg bg-surface-container-low transition-all duration-200 border border-outline-variant/30 overflow-hidden">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm cursor-pointer hover:bg-surface-container select-none transition-colors"
      >
        <div className="flex items-start gap-space-sm">
          <span className="px-2.5 py-1 rounded bg-surface-container-highest text-secondary font-label-md text-label-md tracking-wider uppercase shrink-0">
            {provision.sectionNumber}
          </span>
          <div>
            <h4 className="font-title-lg text-title-lg text-on-surface font-serif">
              {provision.heading}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              {provision.actName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider shrink-0 self-end md:self-auto">
          <span>{isOpen ? 'Collapse' : 'View Ratio'}</span>
          <span
            className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="px-space-md pb-space-md pt-space-xs text-body-md font-body-md text-on-surface-variant bg-surface-container-lowest/70 border-t border-outline-variant/20">
          <blockquote className="border-l-2 border-secondary pl-3.5 py-1 my-2 font-serif text-on-surface italic text-sm leading-relaxed bg-surface/40 rounded-r">
            “{provision.verbatimQuote}”
          </blockquote>

          {provision.interpretationNote && (
            <div className="text-xs text-on-surface-variant font-sans bg-surface-container p-3 rounded border border-outline-variant/30 mt-2">
              <strong className="text-on-surface font-semibold">Chambers Analysis: </strong>
              {provision.interpretationNote}
            </div>
          )}

          {provision.docketReference && (
            <div className="flex items-center gap-space-sm text-label-sm font-label-sm text-outline mt-3">
              <span className="bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface font-mono">
                {provision.docketReference}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
