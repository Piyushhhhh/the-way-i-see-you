import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Deterministic pseudo-random generator to avoid Math.random() in render
function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type PetalKind = 'petal' | 'speck';

interface Petal {
  id: number;
  kind: PetalKind;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
  rotateStart: number;
  rotateEnd: number;
  blur: number;
  color: string;
  scaleY: number;
}

const COLORS = [
  'var(--color-blush)',
  'var(--color-rose-muted)',
  'var(--color-blush-light)',
  'rgba(139, 94, 94, 0.5)',
];

function useParticleCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 12;
    if (window.innerWidth >= 1024) return 20;
    if (window.innerWidth >= 640) return 16;
    return 12;
  });

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(20);
      else if (window.innerWidth >= 640) setCount(16);
      else setCount(12);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

function generatePetals(count: number): Petal[] {
  const rng = createRng(42);
  return Array.from({ length: count }, (_, i) => {
    const isPetal = rng() < 0.7;
    const kind: PetalKind = isPetal ? 'petal' : 'speck';

    return {
      id: i,
      kind,
      x: rng() * 96 + 2,
      size: isPetal ? 5 + rng() * 7 : 2 + rng() * 3,
      delay: rng() * 14,
      duration: 12 + rng() * 10,
      opacity: isPetal ? 0.28 + rng() * 0.2 : 0.18 + rng() * 0.12,
      drift: (15 + rng() * 30) * (rng() > 0.5 ? 1 : -1),
      rotateStart: rng() * 360,
      rotateEnd: rng() * 360 + (rng() > 0.5 ? 180 : -180),
      blur: isPetal ? rng() * 1.2 : rng() * 0.5,
      color: COLORS[Math.floor(rng() * COLORS.length)],
      scaleY: isPetal ? 0.55 + rng() * 0.35 : 1,
    };
  });
}

export function FloatingParticles() {
  const reduced = useReducedMotion();
  const count = useParticleCount();
  const petals = useMemo(() => generatePetals(count), [count]);

  if (reduced) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: p.kind === 'petal' ? '50% 0 50% 50%' : '50%',
            background: p.kind === 'petal'
              ? `radial-gradient(ellipse at 30% 30%, ${p.color}, transparent 70%)`
              : p.color,
            opacity: p.opacity,
            filter: p.blur > 0.3 ? `blur(${p.blur}px)` : undefined,
            scaleY: p.scaleY,
            willChange: 'transform',
          }}
          animate={{
            y: ['-5vh', '105vh'],
            x: [0, p.drift, 0],
            rotate: [p.rotateStart, p.rotateEnd],
          }}
          transition={{
            y: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: p.duration * 0.5, delay: p.delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
            rotate: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          }}
        />
      ))}
    </div>
  );
}
