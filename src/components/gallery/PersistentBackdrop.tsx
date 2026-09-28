import React from 'react';

/**
 * General fixed background: one TiMUN mark centered on the viewport,
 * faint enough to sit behind everything without touching readability.
 * Static (no animation) so it costs nothing after first paint.
 * Always below nav (z-50), modals (z-50) and floating actions (z-40).
 */
export const PersistentBackdrop: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none select-none fixed inset-0 z-[1] overflow-hidden"
  >
    <img
      src="/logo.png"
      alt=""
      loading="lazy"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vmin] max-w-none h-auto object-contain opacity-[0.035]"
      onError={e => {
        e.currentTarget.style.display = 'none';
      }}
    />
  </div>
);
