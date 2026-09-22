import React from 'react';

export interface SectionHeaderProps {
  index?: string; // e.g. "01", "02"
  protocol?: string; // e.g. "ARCHIVAL RIGOR & REASONING"
  title: string;
  italicSuffix?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  protocol,
  title,
  italicSuffix,
  description,
  actions,
  className = '',
}) => {
  return (
    <header className={`border-b border-outline-variant/40 pb-4 mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {(index || protocol) && (
            <div className="flex items-center gap-2 text-[11px] tracking-editorial font-mono uppercase text-secondary font-semibold mb-1">
              {index && <span>{index}</span>}
              {index && protocol && <span className="opacity-60">/</span>}
              {protocol && <span>{protocol}</span>}
            </div>
          )}
          <h2 className="font-serif text-2xl md:text-3xl text-on-surface tracking-tight font-normal">
            {title} {italicSuffix && <em className="italic font-serif">{italicSuffix}</em>}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-on-surface-variant leading-relaxed max-w-2xl font-sans">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
};
