import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';
import HeroGlyphField from './HeroGlyphField';

/* ── Hero Section ─────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="home"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen flex items-center bg-[#fbfbfa] overflow-hidden pt-20"
    >
      {/* Abstract technical manuscript — a modern, geometric echo of hieroglyphic language. */}
      <HeroGlyphField />

      {/* Content sits above the glyph system */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full pointer-events-none"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.22em]">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-black leading-[1.06] mb-6 tracking-[-0.025em]"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs — re-enable pointer events for links */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors text-center"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-10 py-4 bg-white/85 border border-gray-200 text-black text-sm font-medium hover:border-black transition-colors text-center backdrop-blur-[2px]"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { value: t.hero.stat1Value, label: t.hero.stat1Label },
            { value: t.hero.stat2Value, label: t.hero.stat2Label },
            { value: t.hero.stat3Value, label: t.hero.stat3Label },
          ].map((stat, i) => (
            <motion.div
              variants={fadeInUp}
              key={i}
              className="text-center py-8 border-t border-b border-gray-200/90 bg-white/20"
            >
              <div className="text-3xl md:text-4xl font-medium text-black mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-[0.18em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
