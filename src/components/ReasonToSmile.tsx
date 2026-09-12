import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { smileReasons } from '../data/content';
import { SectionWrapper } from './SectionWrapper';

export function ReasonToSmileSection() {
  const [current, setCurrent] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const lastIndex = useRef(-1);

  const reveal = useCallback(() => {
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * smileReasons.length);
    } while (nextIndex === lastIndex.current && smileReasons.length > 1);
    lastIndex.current = nextIndex;
    setCurrent(smileReasons[nextIndex]);
    setKey((k) => k + 1);
  }, []);

  return (
    <SectionWrapper id="smile" className="text-center">
      <h2 className="font-serif text-2xl md:text-3xl text-burgundy mb-8">
        A reason to smile
      </h2>

      <div className="min-h-[100px] flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          {current && (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-xl md:text-2xl text-burgundy leading-relaxed max-w-md mx-auto"
            >
              {current}
            </motion.p>
          )}
        </AnimatePresence>

        {!current && (
          <p className="text-warm-gray text-sm">
            Tap the button below
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        onClick={reveal}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-blush bg-warm-white text-burgundy-light font-sans text-sm tracking-wide hover:bg-blush-light transition-colors cursor-pointer"
      >
        <Sparkles size={16} className="text-rose-muted" />
        Tap whenever you need a reason to smile
      </motion.button>
    </SectionWrapper>
  );
}
