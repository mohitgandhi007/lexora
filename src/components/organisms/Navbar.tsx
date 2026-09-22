import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import scalesEmblem from '../../assets/lexis_juris_luxury_scales_emblem.png';
import counselPortrait from '../../assets/counsel_portrait.png';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Documents', path: '/documents' },
    { label: 'Summaries', path: '/summary/doc-2' },
    { label: 'Search', path: '/search' },
    { label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-outline-variant/30">
        <div className="h-16 w-full px-margin max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Lockup */}
          <div className="flex items-center gap-space-xl">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={scalesEmblem}
                alt="Lexora Scales Insignia"
                className="h-8 w-8 rounded object-contain shadow-sm group-hover:scale-105 transition-transform"
              />
              <span className="font-headline-sm text-headline-sm tracking-[0.18em] text-on-surface uppercase font-serif font-bold">
                LEXORA
              </span>
            </Link>

            <div className="h-4 w-px bg-outline-variant/40 hidden md:block" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-space-lg relative h-16">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center h-full text-body-md transition-colors ${
                    isActive(link.path)
                      ? 'text-on-surface font-title-md font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-secondary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-space-md">
            {/* Quick Search Bar */}
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="hidden lg:flex items-center bg-surface-container-low px-space-md py-1.5 rounded-lg text-on-surface-variant text-body-sm font-body-sm gap-space-sm border border-outline-variant/30 hover:border-secondary transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-outline">search</span>
              <span className="text-outline italic">Search briefs, statutes, authorities...</span>
              <span className="font-label-sm text-label-sm uppercase bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-mono">
                ⌘K
              </span>
            </button>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Notifications */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>

            <div className="h-4 w-px bg-outline-variant/40 hidden sm:block" />

            {/* Senior Counsel Profile */}
            <Link
              to="/settings"
              className="flex items-center gap-space-sm pl-space-xs group"
            >
              <img
                src={counselPortrait}
                alt="Adv. V. Nariman"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/50 group-hover:ring-secondary transition-all"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-title-md text-title-md text-on-surface leading-none group-hover:text-secondary transition-colors">
                  Adv. V. Nariman
                </span>
                <span className="font-label-sm text-label-sm uppercase text-secondary tracking-wider mt-0.5">
                  Senior Counsel
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-outline-variant/40 px-margin py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-surface-container text-secondary font-semibold'
                    : 'text-on-surface hover:bg-surface-container/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Chambers Registry • 2026</span>
              <span className="font-mono text-secondary">VAULT 256-BIT</span>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Matches Stitch Mobile Shell) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-lg border-t border-outline-variant/40 pb-safe">
        <div className="h-16 px-4 flex items-center justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${
              isActive('/') ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Home</span>
          </Link>

          <Link
            to="/documents"
            className={`flex flex-col items-center gap-1 ${
              isActive('/documents') ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">folder</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Briefs</span>
          </Link>

          <Link
            to="/upload"
            className="w-11 h-11 -mt-4 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Upload Document"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
          </Link>

          <Link
            to="/summary/doc-2"
            className={`flex flex-col items-center gap-1 ${
              isActive('/summary') ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Insights</span>
          </Link>

          <Link
            to="/settings"
            className={`flex flex-col items-center gap-1 ${
              isActive('/settings') ? 'text-secondary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Chambers</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
