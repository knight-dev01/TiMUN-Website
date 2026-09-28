import React, { useEffect, useRef, useState } from 'react';

const VIDEO_SOURCES = [
  // Mixkit: audience raising hands at a business conference (HD 720p, ~3.8MB)
  'https://assets.mixkit.co/videos/13192/13192-720.mp4',
  // Mixkit: speaker giving a talk on a dark stage (HD 720p, ~3.3MB)
  'https://assets.mixkit.co/videos/13222/13222-720.mp4',
];

const POSTER =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80';

/**
 * Cinematic hall background for the hero (progressive enhancement).
 * Poster-first: navy-graded poster shows always; video layers on top only
 * when it can play (desktop, no reduced-motion, not hidden tab).
 */
export const SiteGalleryBackground: React.FC<{ localPoster: string }> = ({ localPoster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(false);
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (videoOk) video.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [reducedMotion, isMobile, videoOk]);

  const canPlayVideo = !reducedMotion && !isMobile;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#041D50]" aria-hidden="true">
      {/* Poster base: Unsplash hall, local hero as fallback underneath */}
      <img
        src={localPoster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={POSTER}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => {
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Looping hall footage (desktop only, silent) */}
      {canPlayVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoOk ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          onCanPlay={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
        >
          {VIDEO_SOURCES.map(src => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}

      {/* Navy grading wash for readable text */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#041D50]/85 via-[#08307F]/60 to-[#041D50]/90" />
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 40%, rgba(4,29,80,0.55) 100%)',
        }}
      />
      {/* Green podium glow, low and center */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[70%] h-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(11,225,73,0.25), transparent 70%)',
        }}
      />
    </div>
  );
};
