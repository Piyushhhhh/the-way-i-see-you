import { motion } from 'framer-motion';
import { timeline } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function TimelineSection() {
  const reduced = useReducedMotion();
  const base = import.meta.env.BASE_URL;

  return (
    <SectionWrapper id="timeline" className="!pt-6 md:!pt-8">
      <h2 className="font-serif text-2xl md:text-3xl text-burgundy text-center mb-8">
        Our little timeline
      </h2>

      <div className="relative max-w-xl mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-blush/60" />

        {timeline.map((moment, i) => (
          <motion.div
            key={i}
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-8 last:mb-0 pl-12"
          >
            <div className="absolute top-2 left-[10px] w-3 h-3 rounded-full bg-rose-muted border-2 border-cream" />

            <div
              className={`rounded-2xl backdrop-blur-sm border shadow-sm ${
                moment.isClosing
                  ? 'bg-blush-light/40 border-blush/60 text-center py-8 px-6'
                  : 'bg-warm-white/70 border-blush/40 p-5'
              }`}
            >
              <span className="text-[11px] text-warm-gray font-sans tracking-widest uppercase">
                {moment.date}
              </span>
              <h3
                className={`font-serif text-burgundy mt-1 ${
                  moment.isClosing ? 'text-xl md:text-2xl mb-4' : 'text-lg md:text-xl mb-3'
                }`}
              >
                {moment.title}
              </h3>

              <p
                className={`font-serif italic leading-relaxed ${
                  moment.isClosing
                    ? 'text-burgundy/80 text-base md:text-lg'
                    : 'text-burgundy/70 text-[15px] border-l-2 border-blush/60 pl-4 mb-3'
                }`}
              >
                {moment.quote}
              </p>

              {moment.description && (
                <div className="space-y-3 mt-3">
                  {moment.description.split('\n\n').map((para, j) => (
                    <p key={j} className="text-sm text-burgundy-light/90 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {moment.image && (
                <img
                  src={`${base}${moment.image}`}
                  alt=""
                  className="w-full h-40 object-cover rounded-xl mt-4"
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
