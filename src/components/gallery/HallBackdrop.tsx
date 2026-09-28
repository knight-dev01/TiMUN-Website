import React from 'react';

/**
 * Warm cinematic hall backdrop — zero video, zero lag.
 * Layered radial glows + two slow-drifting aurora blobs (transform-only),
 * all frozen under prefers-reduced-motion. DelegatesCanvas + HallStage
 * sit on top of this in the hero.
 */
export const HallBackdrop: React.FC<{ localPoster: string }> = ({ localPoster }) => (
  <div className="absolute inset-0 overflow-hidden bg-[#041D50]" aria-hidden="true">
    {/* Faint photographic depth (local, already bundled) */}
    <img
      src={localPoster}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-25"
    />

    {/* Warm amber hearth-glow, low center */}
    <div
      className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-[85%] h-[55%]"
      style={{
        background:
          'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(251,191,36,0.28), transparent 70%)',
      }}
    />

    {/* Drifting aurora blobs (green podium + blue depth) */}
    <div
      className="aurora-blob absolute left-[8%] top-[6%] w-[46%] h-[52%] rounded-full"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(11,225,73,0.20), transparent 65%)',
        filter: 'blur(10px)',
      }}
    />
    <div
      className="aurora-blob absolute right-[4%] top-[22%] w-[42%] h-[48%] rounded-full"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(56,130,246,0.30), transparent 65%)',
        filter: 'blur(12px)',
        animationDelay: '-7s',
      }}
    />

    {/* Navy grading wash for readable text */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#041D50]/80 via-[#08307F]/45 to-[#041D50]/92" />
    {/* Vignette */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 42%, rgba(4,29,80,0.6) 100%)',
      }}
    />
    {/* Candle-warm flicker along the podium line */}
    <div
      className="warm-flicker absolute left-1/2 bottom-0 -translate-x-1/2 w-[64%] h-28"
      style={{
        background:
          'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(251,191,36,0.22), transparent 70%)',
      }}
    />
  </div>
);
