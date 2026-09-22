import React from 'react';
import { Link } from 'react-router-dom';

export interface SummaryCardProps {
  category: string;
  date: string;
  title: string;
  description: string;
  badgeLabel?: string;
  linkTo: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  category,
  date,
  title,
  description,
  badgeLabel = 'RATIO DECIDENDI',
  linkTo,
}) => {
  return (
    <article className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between hover:shadow-md hover:border-secondary/40 transition-all group">
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-secondary font-semibold tracking-wider uppercase text-[11px]">
            {category}
          </span>
          <span className="text-outline text-[11px]">{date}</span>
        </div>

        <h3 className="font-serif text-lg font-semibold text-on-surface group-hover:text-secondary transition-colors mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-xs text-on-surface-variant font-sans leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase text-outline tracking-wider">
          {badgeLabel}
        </span>
        <Link
          to={linkTo}
          className="text-xs font-semibold text-secondary hover:text-on-surface-variant flex items-center gap-1 transition-colors"
        >
          <span>View Summary</span>
          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
};
