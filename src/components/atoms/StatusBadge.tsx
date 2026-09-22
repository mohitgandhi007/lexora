import React from 'react';

export type StatusVariant = 'verified' | 'neutral' | 'caution' | 'critical' | 'archival' | 'processed' | 'queue';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  pulse?: boolean;
  code?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  pulse = false,
  code,
  className = '',
}) => {
  const styles: Record<StatusVariant, string> = {
    verified: 'bg-amber-100/60 text-amber-900 border-amber-300/70',
    processed: 'bg-secondary-fixed/50 text-on-secondary-fixed-variant border-secondary-fixed-dim/80',
    neutral: 'bg-surface-container text-on-surface-variant border-outline-variant/50',
    caution: 'bg-amber-50 text-amber-800 border-amber-200',
    queue: 'bg-surface-container-high text-on-surface-variant border-outline-variant/40',
    critical: 'bg-rose-50 text-rose-900 border-rose-200',
    archival: 'bg-stone-200/50 text-stone-700 border-stone-300',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border text-[11px] font-mono tracking-tight font-medium uppercase select-none ${styles[variant]} ${className}`}
    >
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse inline-block" />
      )}
      <span>{label}</span>
      {code && <span className="opacity-60 text-[9px] border-l border-current pl-1 ml-0.5">{code}</span>}
    </span>
  );
};
