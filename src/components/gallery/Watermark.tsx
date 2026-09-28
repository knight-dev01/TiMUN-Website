import React from 'react';

interface WatermarkProps {
  side?: 'left' | 'right';
  opacity?: number;
  onDark?: boolean;
}

/**
 * Giant faint TiMUN navy-ink logo drifting behind each section — the
 * backdrop travels with the user as they scroll. Reads as a paper
 * watermark, never as content.
 */
export const Watermark: React.FC<WatermarkProps> = ({
  side = 'right',
  opacity = 0.05,
  onDark = false,
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none select-none absolute top-1/2 -translate-y-1/2 z-10 overflow-hidden ${
      side === 'right' ? 'right-0' : 'left-0'
    }`}
  >
    <img
      src="/logo.png"
      alt=""
      loading="lazy"
      style={{ opacity, filter: onDark ? 'grayscale(1) invert(1)' : 'grayscale(1)' }}
      className="w-[300px] sm:w-[460px] h-auto object-contain"
      onError={e => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);
