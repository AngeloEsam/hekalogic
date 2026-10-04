import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { scaleIn } from '../lib/animations';

const CTA: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="bg-[#F9F9F9] border border-gray-200 p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.cta.title}
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-10 max-w-xl mx-auto">{t.cta.subtitle}</p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            {t.cta.button}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
