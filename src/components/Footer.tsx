import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#F9F9F9] pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <img
                src="/hekalogic-lockup-black.png"
                alt="Hekalogic"
                className="w-[168px] h-auto"
              />
            </a>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className='max-w-sm flex items-center justify-center mt-4'>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#0a66c2] transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#E1306C] transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-black font-medium mb-6">{t.footer.links}</h4>
            <ul className="space-y-4">
              {t.footer.pages.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-black transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-black font-medium mb-6">{t.footer.services}</h4>
            <ul className="space-y-4">
              {t.footer.serviceLinks.map((s, i) => (
                <li key={i}>
                  <span className="text-gray-500 text-sm hover:text-black transition-colors cursor-pointer">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className={`mt-20 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-xs text-gray-500">{t.footer.copyright}</p>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500">{isRTL ? 'صنع بواسطة ' : 'Made by'}</span>
            <a href="#home" className="flex items-center gap-2 group">
               <img
                src="/hekalogic-lockup-clean.png"
                alt="Hekalogic"
                className="hidden md:block hekalogic-lockup-clean h-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
