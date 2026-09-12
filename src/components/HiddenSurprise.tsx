import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { hiddenSurprise } from '../data/content';

export function HiddenSurprise() {
  const tapCount = useRef(0);
  const [filled, setFilled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleTap = useCallback(() => {
    tapCount.current += 1;
    setFilled(true);
    if (tapCount.current >= 5) {
      setRevealed(true);
    }
  }, []);

  return (
    <div className="text-center py-12">
      <button
        onClick={handleTap}
        aria-label="A tiny heart"
        className="w-11 h-11 inline-flex items-center justify-center text-blush hover:text-rose-muted transition-colors cursor-pointer"
      >
        <Heart size={14} fill={filled ? 'currentColor' : 'none'} />
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-6 overflow-hidden"
          >
            <div className="max-w-sm mx-auto p-6 rounded-2xl bg-warm-white/80 border border-blush/50 shadow-sm">
              <p className="font-handwritten text-xl text-rose-muted mb-4">
                {hiddenSurprise.secretMessage}
              </p>

              {hiddenSurprise.mediaUrl ? (
                <a
                  href={hiddenSurprise.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-burgundy-light underline underline-offset-2 decoration-blush hover:text-burgundy transition-colors"
                >
                  {hiddenSurprise.mediaLabel}
                </a>
              ) : (
                <p className="text-xs text-warm-gray">
                  {hiddenSurprise.mediaLabel}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
