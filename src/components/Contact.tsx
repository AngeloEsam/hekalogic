import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, slideInRight } from '../lib/animations';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
import { contactSchema } from '../lib/validation';
import type { FormData } from '../lib/validation';

const Contact: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('sending');

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS credentials are not set in the environment variables.");
        setStatus('error');
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: 'hekalogic@gmail.com',
          title: data.subject,
          message: data.message,
        },
        publicKey
      );

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F9F9F9] p-8 border border-gray-200">
              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.namePlaceholder}</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.projectPlaceholder}</label>
                <input
                  type="text"
                  {...register('subject')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="mb-8">
                <label className="block text-xs font-medium text-gray-700 mb-2">{t.contact.messagePlaceholder}</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:border-black focus:ring-0 transition-colors outline-none resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              {status === 'success' && (
                <p className="mb-4 text-sm text-green-600 font-medium">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="mb-4 text-sm text-red-500 font-medium">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : t.contact.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

