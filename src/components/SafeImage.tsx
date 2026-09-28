import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

/**
 * Image with a graceful gradient fallback — remote photos (e.g. Nigerian
 * city photography) never render as broken-image icons.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  fallbackLabel = 'TiMUN 2027',
  className = '',
  alt = '',
  ...rest
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !rest.src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#00387d] via-[#15305b] to-slate-900 text-center p-6 ${className}`}
        role="img"
        aria-label={alt || fallbackLabel}
      >
        <div>
          <div className="font-serif italic font-bold text-[#f4a024] text-lg leading-snug">
            {fallbackLabel}
          </div>
          {alt ? (
            <div className="text-[11px] text-slate-300 mt-1 uppercase tracking-widest">
              {alt}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <img
      {...rest}
      alt={alt}
      className={className}
      loading={rest.loading || 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};
