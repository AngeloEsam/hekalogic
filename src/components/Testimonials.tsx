import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

const Testimonials: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="testimonials" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {t.testimonials.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.testimonials.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-2xl">{t.testimonials.subtitle}</motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.testimonials.items.map((item, i) => (
            <motion.div variants={fadeInUp} key={i} className="bg-white border border-gray-200 p-8 flex flex-col justify-between hover:border-black transition-colors duration-300">
              <div>
                <svg className="w-8 h-8 text-gray-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">"{item.quote}"</p>
              </div>
              <div>
                <h4 className="text-black font-medium text-base">{item.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{item.role}, {item.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
