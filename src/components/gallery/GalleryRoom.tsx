import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface GalleryRoomProps {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}

/**
 * One "room" of the hall walkthrough: scroll-driven dolly-in
 * (y 90→0, opacity 0→1, scale .94→1, rotateX 8→0).
 * Renders plainly under prefers-reduced-motion.
 */
export const GalleryRoom: React.FC<GalleryRoomProps> = ({ id, index, label, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);

  if (reduceMotion) {
    return (
      <div id={id} data-room={label} data-room-index={index}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      ref={ref}
      data-room={label}
      data-room-index={index}
      className="hall-perspective"
      style={{ y, opacity, scale, rotateX, transformOrigin: 'center top' }}
    >
      {children}
    </motion.div>
  );
};
