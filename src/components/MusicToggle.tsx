import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { musicPath } from '../data/content';

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPref, setMusicPref] = useLocalStorage('music-enabled', true);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const audio = new Audio(`${base}${musicPath}`);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const onCanPlay = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (musicPref && !playing) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else if (!musicPref && playing) {
      audio.pause();
      setPlaying(false);
    }
  }, [musicPref, available, playing]);

  const toggle = useCallback(() => {
    setMusicPref(!musicPref);
  }, [musicPref, setMusicPref]);

  if (!available) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        className="fixed z-50 w-11 h-11 rounded-full bg-warm-white/80 backdrop-blur-sm border border-blush shadow-lg flex items-center justify-center text-burgundy-light hover:bg-blush-light transition-colors cursor-pointer"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))', right: '1.5rem' }}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </motion.button>
    </AnimatePresence>
  );
}
