import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

const Process: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="process" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {t.process.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.process.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-2xl">{t.process.subtitle}</motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {t.process.steps.map((step, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="p-6 bg-white border border-gray-200"
            >
              <div className="text-xs font-semibold text-gray-400 mb-4 tracking-widest">
                {step.number}
              </div>
              <h3 className="text-lg font-medium text-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
