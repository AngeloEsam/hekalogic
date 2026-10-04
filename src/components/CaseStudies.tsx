import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

const CaseStudies: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ['/taheiya.png', '/lamar.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.caseStudies.items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [t.caseStudies.items.length]);

  const currentItem = t.caseStudies.items[currentIndex];
  const currentImage = images[currentIndex];

  return (
    <section id="case-studies" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-white">
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
            {t.caseStudies.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.caseStudies.title}
          </motion.h2>
        </motion.div>

        {/* Case Studies Slider */}
        <motion.div 
          variants={fadeInUp}
          className="relative overflow-hidden bg-zinc-900 border border-zinc-800"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 min-h-[400px]"
            >
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <img 
                  src={currentImage} 
                  alt={currentItem?.title} 
                  className="max-h-48 object-contain drop-shadow-sm"
                  draggable={false}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium border border-zinc-700 text-zinc-300 bg-zinc-800">
                    {currentItem?.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">
                  {currentItem?.title}
                </h3>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                  {currentItem?.description}
                </p>
                <div className="group flex items-center gap-2 text-white text-sm font-medium cursor-pointer w-fit hover:opacity-70 transition-opacity">
                  <span className="border-b border-white pb-0.5">{isRTL ? 'اقرأ المزيد' : 'Read more'}</span>
                  <svg className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {t.caseStudies.items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-white' : 'bg-zinc-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
