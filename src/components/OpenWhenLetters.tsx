import { useState, useEffect, useRef } from 'react';
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
  setRef,
}: {
  letter: Letter;
  index: number;
  onOpen: () => void;
  setRef: (el: HTMLButtonElement | null) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      ref={setRef}
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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy/30 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={letter.label}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative flex flex-col max-w-md w-full bg-warm-white rounded-2xl border border-blush/50 shadow-xl"
        style={{ maxHeight: 'calc(100dvh - 2rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — 44px touch target */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-11 h-11 flex items-center justify-center cursor-pointer"
          aria-label="Close letter"
        >
          <span className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center text-burgundy-light hover:bg-blush transition-colors">
            <X size={16} />
          </span>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-0 flex-shrink-0">
          <p className="font-handwritten text-xl text-rose-muted mb-4 pr-10">
            {letter.label}
          </p>
          <div className="w-10 h-[1px] bg-blush mb-4" />
        </div>

        {/* Scrollable letter body */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 space-y-4"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
        >
          {letter.message.split('\n\n').map((para, j) => (
            <p key={j} className="font-serif text-[17px] text-burgundy leading-relaxed">
              {renderBold(para)}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pt-4 pb-6 flex-shrink-0 text-right">
          <span className="font-handwritten text-warm-gray text-lg">with love</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function OpenWhenLettersSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const envelopeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClose = () => {
    const idx = openIndex;
    setOpenIndex(null);
    if (idx !== null) {
      setTimeout(() => envelopeRefs.current[idx]?.focus(), 50);
    }
  };

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
            onOpen={() => setOpenIndex(i)}
            setRef={(el) => { envelopeRefs.current[i] = el; }}
          />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <LetterModal
            letter={letters[openIndex]}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
