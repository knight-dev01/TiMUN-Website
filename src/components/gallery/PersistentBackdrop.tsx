import React, { useEffect, useState } from 'react';

/**
 * General fixed background: one TiMUN mark centered on the viewport.
 * Fades out while the hero (which carries the real logo) is visible,
 * so the mark never duplicates — then persists for the whole page.
 */
export const PersistentBackdrop: React.FC = () => {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') {
      setOverHero(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none fixed inset-0 z-[1] overflow-hidden transition-opacity duration-700"
      style={{ opacity: overHero ? 0 : 1 }}
    >
      <img
        src="/logo.png"
        alt=""
        loading="lazy"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmin] max-w-none h-auto object-contain opacity-[0.05]"
        onError={e => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
