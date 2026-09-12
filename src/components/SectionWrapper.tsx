import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={reduced ? undefined : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`px-5 py-12 md:py-16 max-w-2xl md:max-w-4xl mx-auto w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}
