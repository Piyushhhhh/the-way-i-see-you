import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OpeningScreen } from './components/OpeningScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { MusicToggle } from './components/MusicToggle';
import { FloatingParticles } from './components/FloatingParticles';
import { TimeZonesSection } from './components/TimeZones';
import { ThingsINoticeSection } from './components/ThingsINotice';
import { TimelineSection } from './components/Timeline';
import { OpenWhenLettersSection } from './components/OpenWhenLetters';
import { PlaylistSection } from './components/Playlist';
import { PlacesToGoSection } from './components/PlacesToGo';
import { ReasonToSmileSection } from './components/ReasonToSmile';
import { FinalSection } from './components/FinalSection';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();

  return (
    <>
      <OpeningScreen visible={!entered} onEnter={() => setEntered(true)} />

      <AnimatePresence>
        {entered && (
          <motion.div
            key="main"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ScrollProgress />
            <FloatingParticles />
            <MusicToggle />

            <main className="relative z-10">
              <TimeZonesSection />

              <SectionDivider />

              <ThingsINoticeSection />

              <SectionDivider />

              <TimelineSection />

              <SectionDivider />

              <OpenWhenLettersSection />

              <SectionDivider />

              <PlaylistSection />

              <SectionDivider />

              <PlacesToGoSection />

              <SectionDivider />

              <ReasonToSmileSection />

              <SectionDivider />

              <FinalSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionDivider() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[1px] bg-blush/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-blush/60" />
        <div className="w-8 h-[1px] bg-blush/60" />
      </div>
    </div>
  );
}
