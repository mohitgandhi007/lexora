import React from 'react';

export const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-margin py-space-lg md:py-space-xl ${className}`}>
      {children}
    </div>
  );
};
