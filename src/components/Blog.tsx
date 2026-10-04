import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

const Blog: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="blog" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {t.blog.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.blog.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-2xl">{t.blog.subtitle}</motion.p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {t.blog.posts.map((post, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="group bg-white border border-gray-200 p-8 hover:border-black transition-colors duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between text-xs text-gray-400 mb-6 font-medium uppercase tracking-wider">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-medium text-black mb-3 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-black text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t.blog.readMore}
                  <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
