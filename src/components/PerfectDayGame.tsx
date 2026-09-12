import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarHeart, Bed, Sunrise, Coffee, Waves, Mountain, Building2, Home,
  Flame, Utensils, Wine, Cake, Footprints, Film, MessageCircle, Music,
  Star, Car, Moon, Sparkles, ChevronLeft, Check, Copy,
} from 'lucide-react';
import { perfectDay } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { useReducedMotion } from '../hooks/useReducedMotion';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  bed: Bed, sunrise: Sunrise, coffee: Coffee, waves: Waves, mountain: Mountain,
  building: Building2, home: Home, flame: Flame, utensils: Utensils, wine: Wine,
  cake: Cake, footprints: Footprints, film: Film, messageCircle: MessageCircle,
  music: Music, star: Star, car: Car, moon: Moon, sparkles: Sparkles,
};

const STORAGE_KEY = 'perfect-day-plan';
const AUTO_ADVANCE_MS = 350;

function loadSaved(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === perfectDay.questions.length) return parsed;
  } catch { /* ignore */ }
  return null;
}

export function PerfectDaySection() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>(
    () => Array(perfectDay.questions.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(() => !!loadSaved());
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState(1);
  const advancing = useRef(false);

  const totalSteps = perfectDay.questions.length;
  const current = perfectDay.questions[step];
  const selected = selections[step];

  const select = useCallback((label: string) => {
    if (advancing.current) return;

    setSelections(prev => {
      const next = [...prev];
      next[step] = label;
      return next;
    });
    setSaved(false);

    advancing.current = true;
    setTimeout(() => {
      setDirection(1);
      if (step < totalSteps - 1) {
        setStep(s => s + 1);
      } else {
        setShowResult(true);
      }
      advancing.current = false;
    }, AUTO_ADVANCE_MS);
  }, [step, totalSteps]);

  const goBack = useCallback(() => {
    if (advancing.current) return;
    if (showResult) {
      setDirection(-1);
      setShowResult(false);
    } else if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  }, [step, showResult]);

  const savePlan = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
    setSaved(true);
  }, [selections]);

  const copyPlan = useCallback(async () => {
    const lines = perfectDay.questions.map((q, i) =>
      `${q.question}\n→ ${selections[i]}`
    );
    const text = `Our perfect day\n\n${lines.join('\n\n')}\n\n${perfectDay.resultMessage}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard not available */ }
  }, [selections]);

  const reset = useCallback(() => {
    setSelections(Array(totalSteps).fill(null));
    setStep(0);
    setShowResult(false);
    setSaved(false);
    setDirection(-1);
  }, [totalSteps]);

  const variants = {
    enter: (d: number) => reduced ? {} : { opacity: 0, x: d > 0 ? 60 : -60 },
    center: { opacity: 1, x: 0 },
    exit: (d: number) => reduced ? {} : { opacity: 0, x: d > 0 ? -60 : 60 },
  };

  return (
    <SectionWrapper id="perfect-day">
      <div className="flex items-center justify-center gap-2 mb-2">
        <CalendarHeart size={18} className="text-rose-muted" />
        <h2 className="font-serif text-2xl md:text-3xl text-burgundy">
          {perfectDay.heading}
        </h2>
      </div>
      <p className="text-sm text-warm-gray text-center mb-8">
        {perfectDay.caption}
      </p>

      <div className="max-w-[720px] mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {!showResult ? (
            <motion.div
              key={`step-${step}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeInOut' }}
              className="rounded-2xl bg-warm-white/70 backdrop-blur-sm border border-blush/40 shadow-sm p-6 md:p-8"
            >
              <p className="text-xs text-warm-gray text-center mb-4">
                {step + 1} of {totalSteps}
              </p>

              <h3 className="font-serif text-xl md:text-2xl text-burgundy text-center mb-6">
                {current.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.options.map((opt) => {
                  const Icon = iconMap[opt.icon];
                  const isSelected = selected === opt.label;
                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => select(opt.label)}
                      whileTap={reduced ? undefined : { scale: 0.97 }}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose/60 bg-blush-light/50 shadow-sm'
                          : 'border-blush/30 bg-warm-white/50 hover:border-blush/50 hover:bg-blush-light/20'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-rose-muted/20' : 'bg-blush-light/60'
                      }`}>
                        {Icon && <Icon size={16} className={isSelected ? 'text-rose' : 'text-rose-muted'} />}
                      </div>
                      <span className="text-sm text-burgundy leading-snug">{opt.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={reduced ? undefined : { scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto flex-shrink-0"
                        >
                          <Check size={16} className="text-rose" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {step > 0 && (
                <div className="flex items-center mt-6">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1 text-sm px-4 min-h-[44px] rounded-full text-burgundy-light hover:bg-blush-light/50 transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
              className="rounded-2xl bg-warm-white/70 backdrop-blur-sm border border-blush/40 shadow-sm p-6 md:p-8"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <motion.div
                  initial={reduced ? undefined : { rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <Sparkles size={18} className="text-rose-muted" />
                </motion.div>
                <h3 className="font-serif text-xl md:text-2xl text-burgundy">
                  {perfectDay.resultTitle}
                </h3>
              </div>

              <div className="relative pl-8 space-y-4 mb-6">
                <div className="absolute left-3 top-1 bottom-1 w-[2px] bg-blush/50" />
                {perfectDay.questions.map((q, i) => {
                  const opt = q.options.find(o => o.label === selections[i]);
                  const Icon = opt ? iconMap[opt.icon] : null;
                  return (
                    <motion.div
                      key={i}
                      initial={reduced ? undefined : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                      className="relative"
                    >
                      <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-rose-muted/40 border-2 border-cream" />
                      <p className="text-xs text-warm-gray mb-0.5">{q.question}</p>
                      <div className="flex items-center gap-2">
                        {Icon && <Icon size={14} className="text-rose-muted flex-shrink-0" />}
                        <p className="text-sm text-burgundy font-medium">{selections[i]}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mb-6">
                <p className="font-serif text-lg text-burgundy leading-relaxed">
                  {perfectDay.resultMessage}
                </p>
                <p className="font-handwritten text-base text-warm-gray mt-2">
                  {perfectDay.resultNote}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={savePlan}
                  className={`flex items-center gap-2 px-5 min-h-[44px] rounded-full text-sm transition-all cursor-pointer ${
                    saved
                      ? 'bg-rose-muted/20 text-burgundy'
                      : 'bg-blush-light border border-blush/40 text-burgundy hover:bg-blush/40'
                  }`}
                >
                  {saved ? (
                    <><Check size={14} /> Saved for us ♡</>
                  ) : (
                    'Save this plan for us'
                  )}
                </button>
                <button
                  onClick={copyPlan}
                  className="flex items-center gap-2 px-4 min-h-[44px] rounded-full text-sm text-burgundy-light hover:bg-blush-light/50 transition-all cursor-pointer"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy our plan'}
                </button>
              </div>

              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={reset}
                  className="text-xs text-warm-gray hover:text-burgundy-light transition-colors cursor-pointer min-h-[44px] px-4"
                >
                  Plan another one
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
