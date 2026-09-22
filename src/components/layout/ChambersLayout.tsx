import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from './Footer';

export const ChambersLayout: React.FC<{ children: React.ReactNode; hideFooter?: boolean }> = ({
  children,
  hideFooter = false,
}) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface">
      <Navbar />
      <main className="flex-1 w-full pt-16">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};
