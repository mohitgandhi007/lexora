import React from 'react';

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onOpenFilter?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search briefs, citations (Art. 136, § 482)...',
  onClear,
  onOpenFilter,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <div className="relative flex-1">
        <span className="material-symbols-outlined text-[20px] text-outline absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-surface-container-low border border-outline-variant/40 rounded-lg pl-10 pr-9 py-2.5 text-sm text-on-surface placeholder:text-outline placeholder:italic focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-sans"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>
      {onOpenFilter && (
        <button
          type="button"
          onClick={onOpenFilter}
          className="flex items-center gap-1.5 px-3.5 py-2.5 bg-surface border border-outline-variant/50 rounded-lg text-xs font-medium text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
          <span className="font-label-md uppercase tracking-wider">Filters</span>
        </button>
      )}
    </div>
  );
};
