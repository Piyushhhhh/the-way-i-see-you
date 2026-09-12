import { motion } from 'framer-motion';
import { closing } from '../data/content';
import { SectionWrapper } from './SectionWrapper';
import { HiddenSurprise } from './HiddenSurprise';

export function FinalSection() {
  return (
    <>
      <SectionWrapper id="closing" className="text-center !pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-serif text-xl md:text-2xl text-burgundy leading-relaxed max-w-md mx-auto mb-10">
            {closing.message}
          </p>

          <div className="w-12 h-[1px] bg-blush mx-auto mb-8" />

          <p className="font-handwritten text-xl text-warm-gray whitespace-pre-line">
            {closing.signature}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-sm text-warm-gray mt-8"
          >
            {closing.returnMessage}
          </motion.p>
        </motion.div>
      </SectionWrapper>

      <footer className="pb-8">
        <HiddenSurprise />
      </footer>
    </>
  );
}
