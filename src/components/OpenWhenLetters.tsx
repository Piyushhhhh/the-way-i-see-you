import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { letters } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Letter } from '../data/content';

function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function Envelope({
  letter,
  index,
  onOpen,
}: {
  letter: Letter;
  index: number;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      onClick={onOpen}
      className="w-full p-5 rounded-2xl bg-warm-white/70 backdrop-blur-sm border border-blush/40 shadow-sm text-left cursor-pointer hover:border-blush transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blush-light flex items-center justify-center flex-shrink-0 group-hover:bg-blush transition-colors">
          <Mail size={18} className="text-rose" />
        </div>
        <p className="font-serif text-lg text-burgundy">{letter.label}</p>
      </div>
    </motion.button>
  );
}

function LetterModal({
  letter,
  onClose,
}: {
  letter: Letter;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-burgundy/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative max-w-md w-full bg-warm-white rounded-2xl border border-blush/50 shadow-xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush-light flex items-center justify-center text-burgundy-light hover:bg-blush transition-colors cursor-pointer"
          aria-label="Close letter"
        >
          <X size={16} />
        </button>

        <p className="font-handwritten text-xl text-rose-muted mb-4">
          {letter.label}
        </p>

        <div className="w-10 h-[1px] bg-blush mb-5" />

        <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-4" style={{ scrollbarWidth: 'thin' }}>
          {letter.message.split('\n\n').map((para, j) => (
            <p key={j} className="font-serif text-[17px] text-burgundy leading-relaxed">
              {renderBold(para)}
            </p>
          ))}
        </div>

        <div className="mt-6 text-right">
          <span className="font-handwritten text-warm-gray text-lg">with love</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OpenWhenLettersSection() {
  const [openLetter, setOpenLetter] = useState<Letter | null>(null);

  return (
    <SectionWrapper id="letters">
      <h2 className="font-serif text-2xl md:text-3xl text-burgundy text-center mb-3">
        Open when...
      </h2>
      <p className="text-sm text-warm-gray text-center mb-8">
        Tap an envelope to read what's inside
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {letters.map((letter, i) => (
          <Envelope
            key={i}
            letter={letter}
            index={i}
            onOpen={() => setOpenLetter(letter)}
          />
        ))}
      </div>

      <AnimatePresence>
        {openLetter && (
          <LetterModal
            letter={openLetter}
            onClose={() => setOpenLetter(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
