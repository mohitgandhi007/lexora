import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/30 py-space-lg px-margin text-xs text-on-surface-variant pb-24 md:pb-space-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-on-surface uppercase tracking-wider">LEXORA</span>
          <span className="text-outline-variant">|</span>
          <span>Chambers & Enterprise Appellate Intelligence</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-wider text-outline">
          <Link to="/documents" className="hover:text-secondary transition-colors">
            Court Repositories
          </Link>
          <Link to="/search" className="hover:text-secondary transition-colors">
            Citation Graph
          </Link>
          <Link to="/settings" className="hover:text-secondary transition-colors">
            Chambers Protocol
          </Link>
        </div>
      </div>
    </footer>
  );
};
