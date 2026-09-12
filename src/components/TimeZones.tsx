import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { timeZones } from '../data/content';
import { SectionWrapper } from './SectionWrapper';

function formatTime(tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date());
}

function formatDate(tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

function getClockAngles(tz: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(new Date());

  const h = Number(parts.find(p => p.type === 'hour')?.value ?? 0);
  const m = Number(parts.find(p => p.type === 'minute')?.value ?? 0);
  const s = Number(parts.find(p => p.type === 'second')?.value ?? 0);

  return {
    hour: ((h % 12) + m / 60) * 30,
    minute: (m + s / 60) * 6,
    second: s * 6,
  };
}

function AnalogClock({ timezone, label }: { timezone: string; label: string }) {
  const [angles, setAngles] = useState(() => getClockAngles(timezone));
  const [time, setTime] = useState(() => formatTime(timezone));
  const [date, setDate] = useState(() => formatDate(timezone));

  useEffect(() => {
    const tick = () => {
      setAngles(getClockAngles(timezone));
      setTime(formatTime(timezone));
      setDate(formatDate(timezone));
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  const markers = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-blush bg-warm-white/60 backdrop-blur-sm shadow-md">
        {markers.map(i => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div
              className={`absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-rose-muted/50 ${
                i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'
              }`}
            />
          </div>
        ))}

        <div
          className="absolute bottom-1/2 left-1/2 w-[2.5px] h-[28%] -translate-x-1/2 origin-bottom rounded-full bg-burgundy"
          style={{ transform: `translateX(-50%) rotate(${angles.hour}deg)` }}
        />
        <div
          className="absolute bottom-1/2 left-1/2 w-[1.5px] h-[36%] -translate-x-1/2 origin-bottom rounded-full bg-burgundy-light"
          style={{ transform: `translateX(-50%) rotate(${angles.minute}deg)` }}
        />
        <div
          className="absolute bottom-1/2 left-1/2 w-[1px] h-[38%] -translate-x-1/2 origin-bottom rounded-full bg-rose"
          style={{ transform: `translateX(-50%) rotate(${angles.second}deg)` }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-burgundy" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-warm-gray mb-0.5 flex items-center gap-1 justify-center">
          <Clock size={12} /> {label}
        </p>
        <p className="font-mono text-sm text-burgundy-light tracking-wide">{time}</p>
        <p className="text-xs text-warm-gray">{date}</p>
      </div>
    </div>
  );
}

export function TimeZonesSection() {
  return (
    <SectionWrapper id="time-zones" className="!pt-6 md:!pt-8 !pb-6 md:!pb-8">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-row items-start justify-center gap-10 md:gap-20">
          {timeZones.zones.map((z) => (
            <AnalogClock key={z.timezone} timezone={z.timezone} label={z.label} />
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-handwritten text-lg md:text-xl text-warm-gray text-center"
        >
          {timeZones.caption}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
