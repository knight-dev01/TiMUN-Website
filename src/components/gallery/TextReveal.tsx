import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Subtle word-by-word rise: opacity + 12px + slight blur, staggered.
 * One gentle pass when scrolled into view; static under reduced-motion.
 */
export const TextReveal: React.FC<TextRevealProps> = ({ text, className = '', as = 'h2' }) => {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');
  const Tag = (motion as any)[as] || motion.h2;

  if (reduceMotion) {
    const Plain: any = as;
    return <Plain className={className}>{text}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4, margin: '-40px' }}
      transition={{ staggerChildren: 0.045 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.26em]"
          variants={{
            hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};
