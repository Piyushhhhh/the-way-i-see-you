import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { places } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';

const statusColors: Record<string, string> = {
  Someday: 'bg-blush-light text-rose-muted',
  Planning: 'bg-blush text-burgundy',
  'We went': 'bg-rose-muted/20 text-burgundy',
};

function PlacePlaceholder() {
  return (
    <div className="w-full h-24 rounded-lg bg-blush-light/30 border border-dashed border-blush/30 flex items-center justify-center">
      <MapPin size={18} className="text-rose-muted/40" />
    </div>
  );
}

export function PlacesToGoSection() {
  const reduced = useReducedMotion();
  const base = import.meta.env.BASE_URL;

  return (
    <SectionWrapper id="places">
      <h2 className="font-serif text-2xl md:text-3xl text-burgundy text-center mb-3">
        Places we should go
      </h2>
      <p className="text-sm text-warm-gray text-center mb-8">
        Promises to keep, someday
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {places.map((place, i) => (
          <motion.div
            key={i}
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-warm-white/70 backdrop-blur-sm border border-blush/40 shadow-sm"
          >
            {place.photo ? (
              <img
                src={`${base}${place.photo}`}
                alt={place.name}
                className="w-full h-36 object-cover"
                loading="lazy"
              />
            ) : (
              <PlacePlaceholder />
            )}

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg text-burgundy">{place.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[place.status] ?? 'bg-blush-light text-warm-gray'}`}
                >
                  {place.status}
                </span>
              </div>
              <p className="text-sm text-burgundy-light leading-relaxed">
                {place.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
