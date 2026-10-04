import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, slideInRight } from '../lib/animations';

const Contact: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              {t.contact.badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-medium text-black mb-6 leading-tight">
              {t.contact.title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg mb-12 max-w-md">
              {t.contact.subtitle}
            </motion.p>

            <div className="space-y-8">
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-[#F9F9F9] shrink-0 hover:bg-black hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 text-inherit" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black mb-1">Email</h4>
                  <p className="text-gray-500 text-sm">{t.contact.info.email}</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-[#F9F9F9] shrink-0 hover:bg-black hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 text-inherit" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black mb-1">Phone</h4>
                  <p className="text-gray-500 text-sm" dir="ltr">{t.contact.info.phone}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-[#F9F9F9] shrink-0 hover:bg-black hover:text-white transition-colors duration-300">
                  <svg className="w-5 h-5 text-inherit" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black mb-1">Office</h4>
                  <p className="text-gray-500 text-sm">{t.contact.info.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInRight}
          >
            <form onSubmit={handleSubmit} className="bg-[#F9F9F9] p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.namePlaceholder}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.emailPlaceholder}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.projectPlaceholder}</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none appearance-none"
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                >
                  <option value="">Select an option</option>
                  <option value="web">Web Development</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="mobile">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                  <option value="digital-transformation">Digital Transformation</option>
                  <option value="ai-solutions">AI Solutions</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.messagePlaceholder}</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none resize-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                {t.contact.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
