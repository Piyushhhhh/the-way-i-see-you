import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { musicPath } from '../data/content';

const TARGET_VOLUME = 0.18;
const FADE_IN_MS = 1500;
const FADE_OUT_MS = 600;
const FADE_STEP_MS = 30;

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [musicPref, setMusicPref] = useLocalStorage('music-enabled', true);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const hasInteracted = useRef(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeTo = useCallback((audio: HTMLAudioElement, target: number, durationMs: number, onDone?: () => void) => {
    clearFade();
    const start = audio.volume;
    const diff = target - start;
    if (Math.abs(diff) < 0.005) {
      audio.volume = target;
      onDone?.();
      return;
    }
    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    let step = 0;
    fadeRef.current = setInterval(() => {
      step++;
      if (step >= steps) {
        audio.volume = target;
        clearFade();
        onDone?.();
      } else {
        audio.volume = start + diff * (step / steps);
      }
    }, FADE_STEP_MS);
  }, [clearFade]);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const audio = new Audio(`${base}${musicPath}`);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const onCanPlay = () => setAvailable(true);
    const onError = () => setAvailable(false);
    audio.addEventListener('canplaythrough', onCanPlay);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('error', onError);
      clearFade();
      audio.pause();
      audio.src = '';
    };
  }, [clearFade]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (musicPref && !playing && hasInteracted.current) {
      audio.volume = 0;
      audio.play()
        .then(() => {
          setPlaying(true);
          fadeTo(audio, TARGET_VOLUME, FADE_IN_MS);
        })
        .catch(() => setPlaying(false));
    } else if (!musicPref && playing) {
      fadeTo(audio, 0, FADE_OUT_MS, () => {
        audio.pause();
        setPlaying(false);
      });
    }
  }, [musicPref, available, playing, fadeTo]);

  const toggle = useCallback(() => {
    hasInteracted.current = true;
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
