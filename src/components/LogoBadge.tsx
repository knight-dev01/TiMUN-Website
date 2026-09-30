import React from 'react';

interface LogoBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withWordmark?: boolean;
  wordmark?: string;
  subline?: string;
  /** Set on dark backgrounds: a soft halo keeps the blue mark readable. */
  onDark?: boolean;
  /** 'icon' = emblem only (small spots); 'lockup' = full wordmark art. Defaults: sm → icon. */
  variant?: 'auto' | 'icon' | 'lockup';
}

/**
 * The TiMUN logo, clean and borderless. On dark surfaces a soft white
 * halo sits behind the mark so it stays visible — no chips, no keylines.
 */
export const LogoBadge: React.FC<LogoBadgeProps> = ({
  size = 'md',
  withWordmark = false,
  wordmark = 'TiMUN 2027',
  subline = 'Youth Diplomacy & Leadership',
  onDark = false,
  variant = 'auto',
}) => {
  const heights = { sm: 'h-9', md: 'h-10', lg: 'h-16', xl: 'h-28' };
  const src = variant === 'icon' || (variant === 'auto' && size === 'sm') ? '/logo-icon.png' : '/logo.png';
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className="inline-flex items-center justify-center rounded-xl px-1"
        style={
          onDark
            ? { background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0) 72%)' }
            : undefined
        }
      >
        <img
          src={src}
          alt="TiMUN Official Logo"
          className={`${heights[size]} w-auto object-contain relative`}
          loading="eager"
          onError={e => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </span>
      {withWordmark && (
        <span className="leading-tight text-left">
          <span className="block font-bold text-[#00387d]" style={{ fontFamily: "'Nunito Sans', system-ui, sans-serif" }}>
            {wordmark}
          </span>
          <span className="block text-[11px] font-medium text-[#777777]">{subline}</span>
        </span>
      )}
    </span>
  );
};
