import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { thingsINotice } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';

function useCardsPerPage() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  });

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const GAP = 16;

export function ThingsINoticeSection() {
  const reduced = useReducedMotion();
  const cardsPerPage = useCardsPerPage();
  const totalPages = Math.ceil(thingsINotice.length / cardsPerPage);
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    setPage(p => Math.min(p, Math.ceil(thingsINotice.length / cardsPerPage) - 1));
  }, [cardsPerPage]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewportWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback((p: number) => {
    setPage(Math.max(0, Math.min(p, totalPages - 1)));
  }, [totalPages]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchDeltaX.current < -50) goTo(page + 1);
    else if (touchDeltaX.current > 50) goTo(page - 1);
  }, [goTo, page]);

  // Each card width = (viewportWidth - gaps) / cardsPerPage
  const cardWidth = viewportWidth > 0
    ? (viewportWidth - GAP * (cardsPerPage - 1)) / cardsPerPage
    : 0;

  // Track offset: shift by page * (full page width including gap after it)
  const pageStride = viewportWidth + GAP;
  const translateX = -(page * pageStride);

  return (
    <SectionWrapper id="things-i-notice" className="!max-w-none !px-0 !pt-4 md:!pt-6 !pb-6 md:!pb-8">
      <div className="px-5 max-w-4xl mx-auto mb-5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={16} className="text-rose-muted" />
          <h2 className="font-serif text-2xl md:text-3xl text-burgundy">
            Things I notice about you
          </h2>
        </div>
        <p className="text-sm text-warm-gray text-center sm:hidden">Swipe to see more</p>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-14">
        {/* Carousel viewport + arrows wrapper */}
        <div className="relative">
          <button
            onClick={() => goTo(page - 1)}
            aria-label="Previous"
            disabled={page === 0}
            className={`hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-warm-white/90 border border-blush/50 shadow-md items-center justify-center text-burgundy-light hover:bg-blush-light transition-all cursor-pointer ${
              page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => goTo(page + 1)}
            aria-label="Next"
            disabled={page === totalPages - 1}
            className={`hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-warm-white/90 border border-blush/50 shadow-md items-center justify-center text-burgundy-light hover:bg-blush-light transition-all cursor-pointer ${
              page === totalPages - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronRight size={20} />
          </button>

        <div
          ref={viewportRef}
          className="overflow-hidden rounded-xl"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: translateX }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
          >
            {thingsINotice.map((item, i) => (
              <motion.div
                key={i}
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min((i % cardsPerPage) * 0.06, 0.3), duration: 0.5 }}
                className="flex-shrink-0 px-5 py-4 rounded-2xl bg-warm-white/70 backdrop-blur-sm border border-blush/50 shadow-sm"
                style={{ width: cardWidth || undefined }}
              >
                <p className="font-serif text-[15px] md:text-base text-burgundy/90 leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </div>

        {/* Pagination: dots for desktop/tablet, counter for mobile */}
        {cardsPerPage > 1 ? (
          <div className="flex justify-center mt-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
                className="w-11 h-11 flex items-center justify-center cursor-pointer"
              >
                <span className={`block rounded-full transition-all ${
                  i === page
                    ? 'w-2.5 h-2.5 bg-rose-muted'
                    : 'w-2 h-2 bg-blush/60 hover:bg-blush'
                }`} />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-warm-gray mt-3">
            {page + 1} / {totalPages}
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
