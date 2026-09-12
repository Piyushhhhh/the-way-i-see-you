import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { playlist } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';

function SongCoverPlaceholder() {
  return (
    <div className="w-14 h-14 rounded-lg bg-blush-light/70 border border-blush/30 flex items-center justify-center flex-shrink-0">
      <Music size={20} className="text-rose-muted" />
    </div>
  );
}

export function PlaylistSection() {
  const reduced = useReducedMotion();
  const base = import.meta.env.BASE_URL;

  return (
    <SectionWrapper id="playlist">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Music size={18} className="text-rose-muted" />
        <h2 className="font-serif text-2xl md:text-3xl text-burgundy">
          Songs that remind me of you
        </h2>
      </div>
      <p className="text-sm text-warm-gray text-center mb-8">
        Every one of these made me think of you
      </p>

      <div className="space-y-3">
        {playlist.map((song, i) => (
          <motion.div
            key={i}
            initial={reduced ? undefined : { opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-warm-white/70 backdrop-blur-sm border border-blush/40 shadow-sm"
          >
            {song.coverImage ? (
              <img
                src={`${base}${song.coverImage}`}
                alt={`${song.title} cover`}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <SongCoverPlaceholder />
            )}

            <div className="flex-1 min-w-0 text-left">
              <p className="font-sans text-sm font-medium text-burgundy truncate">
                {song.title}
              </p>
              <p className="text-xs text-warm-gray truncate">{song.artist}</p>
              <p className="text-burgundy-light mt-1 line-clamp-2 font-handwritten text-base leading-snug">
                {song.note}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              {song.spotifyUrl && (
                <a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Listen to ${song.title} on Spotify`}
                  className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center text-burgundy-light hover:bg-blush transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              {song.youtubeUrl && (
                <a
                  href={song.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${song.title} on YouTube`}
                  className="w-8 h-8 rounded-full bg-blush-light flex items-center justify-center text-burgundy-light hover:bg-blush transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
