import React, { useState } from 'react';

interface FlagImgProps {
  code: string;
  emoji: string;
  country: string;
  size?: 'sm' | 'md';
}

/**
 * Real country flag image (flagcdn) with emoji fallback.
 * Keeps flags truthful even if the CDN is unreachable.
 */
export const FlagImg: React.FC<FlagImgProps> = ({ code, emoji, country, size = 'md' }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className={size === 'sm' ? 'text-base leading-none' : 'text-4xl leading-none'} aria-hidden="true">
        {emoji}
      </span>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/w${size === 'sm' ? '40' : '80'}/${code.toLowerCase()}.png`}
      alt={`${country} flag`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={
        size === 'sm'
          ? 'w-5 h-auto rounded-[3px] shadow-sm'
          : 'w-14 h-auto rounded-md shadow-sm mx-auto'
      }
    />
  );
};
