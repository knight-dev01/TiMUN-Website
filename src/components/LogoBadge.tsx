import React from 'react';

interface LogoBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withWordmark?: boolean;
  wordmark?: string;
  subline?: string;
}

/**
 * The TiMUN logo, always visible on any background: blue-on-transparent
 * mark seated on a white chip with a navy keyline. Use everywhere —
 * nav, hero, navy bands, red footer, modals.
 */
export const LogoBadge: React.FC<LogoBadgeProps> = ({
  size = 'md',
  withWordmark = false,
  wordmark = 'TiMUN 2027',
  subline = 'Youth Diplomacy & Leadership',
}) => {
  const heights = { sm: 'h-8', md: 'h-10', lg: 'h-14', xl: 'h-24' };
  return (
    <span className="inline-flex items-center gap-3">
      <span className="inline-flex items-center justify-center bg-white rounded-xl border-2 border-[#00387d] px-2.5 py-1.5 shadow-sm">
        <img
          src="/logo.png"
          alt="TiMUN Official Logo"
          className={`${heights[size]} w-auto object-contain`}
          loading="eager"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </span>
      {withWordmark && (
        <span className="leading-tight text-left">
          <span className="block font-bold text-[#00387d]" style={{ fontFamily: "'Roboto Slab', Georgia, serif" }}>
            {wordmark}
          </span>
          <span className="block text-[11px] font-medium text-[#777777]">{subline}</span>
        </span>
      )}
    </span>
  );
};
