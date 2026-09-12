import { motion, AnimatePresence } from 'framer-motion';
import { opening } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Props {
  onEnter: () => void;
  visible: boolean;
}

export function OpeningScreen({ onEnter, visible }: Props) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream px-8"
          style={{ height: '100dvh', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="text-center max-w-lg"
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-burgundy leading-snug tracking-tight mb-10">
              {opening.headline}
            </p>
            <motion.button
              whileHover={reduced ? undefined : { scale: 1.04 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              onClick={onEnter}
              className="px-8 py-3 rounded-full border border-blush bg-warm-white text-burgundy-light font-sans text-sm tracking-wide hover:bg-blush-light transition-colors cursor-pointer min-h-[44px]"
            >
              {opening.buttonText}
            </motion.button>
          </motion.div>

          <div
            className="absolute bottom-8 text-warm-gray text-xs font-handwritten tracking-wide"
            style={{ bottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}
          >
            a little place for you
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
