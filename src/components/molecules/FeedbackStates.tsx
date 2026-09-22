import React from 'react';
import { Button } from '../atoms/Button';

export const EmptyState: React.FC<{
  title: string;
  description: string;
  ctaText?: string;
  onAction?: () => void;
  icon?: string;
}> = ({ title, description, ctaText, onAction, icon = 'folder_open' }) => (
  <div className="text-center py-16 px-4 border border-dashed border-outline-variant/50 rounded-xl bg-surface-container-low/40">
    <div className="w-12 h-12 rounded-full bg-surface-container border border-outline-variant/60 flex items-center justify-center mx-auto text-on-surface-variant mb-3">
      <span className="material-symbols-outlined text-[24px] text-secondary">{icon}</span>
    </div>
    <h3 className="font-serif text-lg text-on-surface mb-1 font-semibold">{title}</h3>
    <p className="text-xs text-on-surface-variant max-w-sm mx-auto mb-5 font-sans leading-relaxed">
      {description}
    </p>
    {ctaText && (
      <Button variant="terracotta" size="sm" onClick={onAction}>
        {ctaText}
      </Button>
    )}
  </div>
);

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Consulting Chambers Neural Concordance...',
}) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
    <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-mono uppercase tracking-editorial text-on-surface-variant">
      {message}
    </p>
  </div>
);
