import React from 'react';

export const EditorialDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`w-full h-px bg-outline-variant/30 ${className}`} />;
};
