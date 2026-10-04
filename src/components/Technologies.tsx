import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

/* ── Tech Icons ───────────────────────────────────────────────────── */
const TechIcon: React.FC<{ name: string }> = ({ name }) => {
  const icons: Record<string, React.ReactNode> = {
    'React': <svg viewBox="-11.5 -10.23 23 20.46" className="w-12 h-12 text-[#61DAFB]"><circle r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>,
    'Next.js': <svg viewBox="0 0 180 180" className="w-12 h-12"><mask id="mask0"><circle cx="90" cy="90" r="90" fill="white"/></mask><g mask="url(#mask0)"><circle cx="90" cy="90" r="90" fill="black"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.628 164.845C142.959 162.458 146.145 159.875 149.508 157.52Z" fill="url(#paint0_linear)"/><rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/></g><defs><linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient></defs></svg>,
    'TypeScript': <svg viewBox="0 0 400 400" className="w-12 h-12 text-[#3178C6]"><rect width="400" height="400" rx="50" fill="currentColor"/><path d="M87.7 200.7V217h52v148h36.9V217h52v-16c0-9 0-16.3-.4-16.5-.2-.2-31.7-.3-70-.3l-69.7.2.2 16.3zm185.7 16.1c7.9 4.1 14 9.8 17.9 17.3 2 3.8 4.9 10.5 4.9 12.1 0 .5-8.7 6-14 9.1-.7.4-3.2-2.2-6.3-7.5-4.1-6.6-7.1-9.3-12-11-3.3-1.2-9.2-1.3-13-.2-5.4 1.4-9 5-10.1 9.8-.5 2.1-.5 3.8.1 5.9 1.5 5.3 5.9 8.8 18.1 14.5 20 9.5 28.3 15.8 33.9 25 3.1 5.2 4.6 11.3 4.4 18.2-.2 8.8-2.7 15.7-7.9 21.4-6.7 7.3-16.3 11.1-29.4 11.6-10.7.4-19.9-1.3-27.9-5.1-8.6-4.1-14.5-10-18.8-18.9-1.7-3.6-4.6-12.3-4.1-13 .2-.2 3.3-1.9 6.9-3.8l9.6-5.4 2 4.3c2.6 6.4 6 10.9 10.4 13.7 5.3 3.4 15.6 4.2 21.8 1.6 4.3-1.8 6.3-4.6 6.3-9.2 0-4.3-1.2-6.8-4.7-9.6-2.7-2.1-8.4-4.9-18.9-9.5-15.3-6.8-22-11.2-27.2-18.1-3.5-4.7-4.7-7.9-5.4-13.2-.7-5.7.4-13 2.6-17.6 3.5-7 10.5-12.4 19.5-15 5.5-1.6 20.3-1.2 26.8.7z" fill="white"/></svg>,
    'JavaScript': <svg viewBox="0 0 630 630" className="w-12 h-12 text-[#F7DF1E]"><rect width="630" height="630" fill="currentColor"/><path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 37.91 30.45 19.35 0 31.5-7.58 31.5-37.03V288.85h59.2v202.3c0 61-35.77 88.72-87.95 88.72-47.16 0-74.5-24.45-88.22-53.9z" fill="black"/></svg>,
    'Tailwind CSS': <svg viewBox="0 0 248 31" className="w-16 h-8 text-[#06B6D4]"><path fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.383 12.758-10.146-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432-2.502-2.524-5.398-5.445-11.722-5.445z" fill="currentColor"/></svg>,
    'HTML5': <svg viewBox="0 0 512 512" className="w-12 h-12 text-[#E34F26]"><path d="M108.4 0h23v22.8h21.2V0h23v69h-23V46h-21v23h-23.2M206 23h-20.3V0h63.7v23H229v46h-23M259.5 0h24.1l14.8 24.3L313.2 0h24.1v69h-23V34.8l-16.1 24.8-16.1-24.8v34.2h-22.6M348.7 0h23v46.2h32.6V69h-55.6" fill="black"/><path d="M107.6 471l-33-370.4h362.8l-33 370.2L255.7 512" fill="currentColor"/><path d="M256 480.5V131h148.3L376 447" fill="#EF652A"/><path d="M142 176.3h114v45.4h-64.2l4.2 46.5h60v45.3H154.4M156.4 336.3H202l3.2 36.3 50.8 13.6v47.4l-93.2-26" fill="#EBEBEB"/><path d="M369.6 176.3H255.8v45.4h109.6M361.3 268.2H255.8v45.4h56l-5.3 59-50.7 13.6v47.2l93-25.8" fill="#FFF"/></svg>,
    'PHP': <svg viewBox="0 0 100 50" className="w-16 h-8 text-[#777BB4]"><ellipse cx="50" cy="25" rx="50" ry="25" fill="currentColor"/><text x="50" y="33" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white" fontFamily="sans-serif">php</text></svg>,
    'Laravel': <svg viewBox="0 0 50 52" className="w-12 h-12 text-[#FF2D20]"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01a.823.823 0 0 1-.05.028.784.784 0 0 1-.09.033.786.786 0 0 1-.196.027.786.786 0 0 1-.196-.027.786.786 0 0 1-.09-.033.823.823 0 0 1-.05-.028L.402 39.944A.8.8 0 0 1 0 39.25V6.334a.809.809 0 0 1 .028-.209.784.784 0 0 1 .048-.143.787.787 0 0 1 .084-.124.803.803 0 0 1 .112-.1.785.785 0 0 1 .06-.044L10.29.247a.8.8 0 0 1 .8 0l9.958 5.742a.8.8 0 0 1 .4.694v20.361l8.008-4.614V11.769a.8.8 0 0 1 .4-.694L39.55.247a.8.8 0 0 1 .8 0l9.276 5.319z" fill="currentColor"/></svg>,
    'Node.js': <svg viewBox="0 0 256 289" className="w-10 h-12 text-[#339933]"><path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915L80.470 263.664c-5.3-2.98-2.716-4.02-0.97-4.633 7.686-2.65 9.244-3.25 17.46-7.82.86-.5 1.985-.312 2.857.197l27.813 16.516c1.06.572 2.55.572 3.523 0l108.35-62.522c1.06-.614 1.763-1.853 1.763-3.114V86.667c0-1.322-.703-2.497-1.808-3.178L132.152 21.08c-1.06-.614-2.497-.614-3.557 0L20.37 83.49c-1.13.68-1.832 1.92-1.832 3.178v124.956c0 1.26.703 2.497 1.832 3.07l29.703 17.153c16.11 8.055 25.97-1.43 25.97-10.892V97.99c0-1.743 1.39-3.09 3.134-3.09h13.62c1.72 0 3.134 1.347 3.134 3.09v123.008c0 21.33-11.638 33.582-31.883 33.582-6.228 0-11.13 0-24.828-6.76L9.552 232.09C3.785 228.795 0 222.77 0 216.28V91.323C0 84.795 3.785 78.77 9.552 75.5L119.957 12.76c5.633-3.178 13.093-3.178 18.683 0l110.395 62.74c5.767 3.27 9.552 9.295 9.552 15.823v124.957c0 6.528-3.785 12.553-9.552 15.823L147.34 285.55c-5.546 3.134-11.263 3.178-17.576 3.178z" fill="currentColor"/></svg>,
    'MySQL': <svg viewBox="0 0 139 103" className="w-16 h-12 text-[#4479A1]"><path d="M132 91.5c-3.5 0-6.3.8-8.4 2-1.6.9-2.7 2-2.7 3.3 0 2.6 3.6 4.7 8.4 4.7 4.8 0 8.4-2.1 8.4-4.7 0-2.2-2.4-4.1-5.7-5.3zm-88.7-64c0-3.7-2.9-6.3-7.1-6.3-1.2 0-2.2.2-3 .5v12.6c.8.2 1.8.4 2.8.4 4.2 0 7.3-2.6 7.3-7.2z" fill="currentColor"/><path d="M85.4 30.8H72.8V47h12.6c4.4 0 7.4-2.8 7.4-8.1s-3-8.1-7.4-8.1zm-47.6 0c-1.1 0-2.1.2-3 .4v16.7c.7.2 1.7.3 2.8.3 5 0 8.5-3 8.5-8.8 0-5.5-3.2-8.6-8.3-8.6z" fill="currentColor"/><path d="M0 0v103h139V0H0zm34 57.6c-2.3 1.5-5.6 2.2-9.8 2.2-1.5 0-2.8-.1-3.8-.3V71H10V21.9c3-.5 7.3-.8 12-.8 4.4 0 7.5.8 9.6 2.4 2 1.5 3.3 4 3.3 6.9 0 5.7-3.5 9.4-7.9 11V42c3.3 1.4 5.2 4.6 5.2 8.4 0 3.7-1.5 6.1-3.2 7.2zm47.3 13.5c-6.7 0-10.9-1.4-13.4-3.7-2.4-2.2-3.6-5.7-3.6-10.9V21.2H74V56c0 4 .8 6.5 2.4 7.8 1.4 1.1 3.4 1.6 6.7 1.6l-1.8 5.7zm41.4 0H113V44.2h-9.9V71h-9.4V21.2h9.4v17h9.9v-17h9.7V71zm16-30.6c5.2 0 8.9 3.9 8.9 9 0 5.1-3.7 9-8.9 9-5.2 0-8.9-4-8.9-9 0-5.1 3.7-9 8.9-9zm0 1.7c-3.8 0-6.3 3.2-6.3 7.3 0 4.1 2.5 7.3 6.3 7.3 3.8 0 6.3-3.2 6.3-7.3 0-4.1-2.5-7.3-6.3-7.3z" fill="currentColor"/></svg>,
    'PostgreSQL': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#336791]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="sans-serif">PG</text></svg>,
    'Redis': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#DC382D]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" fontFamily="sans-serif">Redis</text></svg>,
    'MongoDB': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#47A248]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="28" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="sans-serif">MONGO</text></svg>,
    'Flutter': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#02569B]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">Flutter</text></svg>,
    'Dart': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#0175C2]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" fontFamily="sans-serif">Dart</text></svg>,
    'Docker': <svg viewBox="0 0 260 175" className="w-16 h-12 text-[#2496ED]"><path d="M0 87.5c0 0 32.35 62.5 130 62.5S260 87.5 260 87.5l-130 0L0 87.5z" fill="currentColor"/><rect x="58" y="50" width="18" height="18" fill="currentColor" rx="2"/><rect x="80" y="50" width="18" height="18" fill="currentColor" rx="2"/><rect x="80" y="28" width="18" height="18" fill="currentColor" rx="2"/><rect x="102" y="50" width="18" height="18" fill="currentColor" rx="2"/><rect x="102" y="28" width="18" height="18" fill="currentColor" rx="2"/><rect x="124" y="50" width="18" height="18" fill="currentColor" rx="2"/><rect x="36" y="50" width="18" height="18" fill="currentColor" rx="2"/></svg>,
    'Kubernetes': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#326CE5]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" fontFamily="sans-serif">K8s</text></svg>,
    'AWS': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#232F3E]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="sans-serif">AWS</text></svg>,
    'Linux': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#FCC624]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="black" fontFamily="sans-serif">Linux</text></svg>,
    'Cypress': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#17202C]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">Cypress</text></svg>,
    'Jest': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#C21325]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" fontFamily="sans-serif">Jest</text></svg>,
    'PHPUnit': <svg viewBox="0 0 45 45" className="w-12 h-12 text-[#4F5B93]"><circle cx="22.5" cy="22.5" r="22.5" fill="currentColor"/><text x="22.5" y="28" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white" fontFamily="sans-serif">PHPUnit</text></svg>,
    'Terraform': <svg viewBox="0 0 256 269" className="w-12 h-12 text-[#844FBA]"><path d="M0 25.109L99.761 0v86.993L0 112.112V25.109zm109.914-25.59L209.673 24.63v86.985L109.914 86.5V-.482zm-.124 99.497l99.883 25.112v86.987l-99.883-25.11V99.015zm109.845 25.433l99.877 25.114v86.987l-99.877-25.114v-86.987z" fill="currentColor"/></svg>,
    'Azure': <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#0089D6]"><path d="M5.483 21.3H24L14.025 4.013l-3.3 5.418-5.242-9.422L0 17.518l5.483 3.782zM6.3 19.349l-3.957-2.73 3.956-6.845 3.518 6.01-3.517 3.565z" fill="currentColor"/></svg>,
    'Playwright': <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#2EAD33]"><path d="M19.18 5.76a.5.5 0 0 0-.54-.08l-5.64 2.63v1.88l6.18-2.91a.5.5 0 0 0 0-.89v-.63zm-6.18 6l-6.18-2.9a.5.5 0 0 0-.46.04L1.75 12a.5.5 0 0 0 0 .91l4.61 2.21 6.18-2.91v-1.89l.46-.22zm6.72-3.14l-6.72 3.14v1.89l6.18 2.91a.5.5 0 0 0 .46-.04l4.61-2.21a.5.5 0 0 0 0-.91l-4.53-2.16v-.62zM6.54 12a.5.5 0 0 0 0-.89L1.75 8.91 1.25 9.17A.5.5 0 0 0 1 9.61v4.78a.5.5 0 0 0 .25.44l4.61 2.21a.5.5 0 0 0 .54-.08L12 14.33v-1.88L6.54 15a.5.5 0 0 1-.46-.04L1.47 12.75A.5.5 0 0 1 1.25 12h5.29zM19 12a.5.5 0 0 0 0-.89l-4.53-2.16L14 9.17a.5.5 0 0 0-.25.44v4.78a.5.5 0 0 0 .25.44l4.61 2.21a.5.5 0 0 0 .54-.08l5.64-2.63v-1.88l-5.46 2.57a.5.5 0 0 1-.46-.04L14.25 12.75a.5.5 0 0 1-.22-.75H19z" fill="currentColor"/></svg>,
    'System Design': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    'Solution Architecture': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
    'SAST': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    'App Pentesting': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" /></svg>,
    'Manual Testing': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>,
    'Automated Testing': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    'AI Agents': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    'MLOps': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
    'Data Engineering': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    'AIOps': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    'DataOps': <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  };

  return (
    <div className="flex items-center justify-center w-16 h-16 transition-colors duration-300">
      {icons[name] ?? (
        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm uppercase border border-gray-300">
          {name.slice(0, 3)}
        </div>
      )}
    </div>
  );
};

/* ── Data ─────────────────────────────────────────────────────────── */
interface TechItem {
  name: string;
  label_en: string;
  label_ar: string;
}

interface Category {
  key: string;
  label_en: string;
  label_ar: string;
  items: TechItem[];
}

const categories: Category[] = [
  {
    key: 'frontend',
    label_en: 'Front End',
    label_ar: 'الواجهة الأمامية',
    items: [
      { name: 'React', label_en: 'React .JS', label_ar: 'React .JS' },
      { name: 'Next.js', label_en: 'Next .JS', label_ar: 'Next .JS' },
      { name: 'TypeScript', label_en: 'TypeScript', label_ar: 'TypeScript' },
      { name: 'JavaScript', label_en: 'JavaScript', label_ar: 'JavaScript' },
      { name: 'Tailwind CSS', label_en: 'Tailwind Css', label_ar: 'Tailwind Css' },
      { name: 'HTML5', label_en: 'HTML5', label_ar: 'HTML5' },
    ],
  },
  {
    key: 'backend',
    label_en: 'Back End',
    label_ar: 'الخادم الخلفي',
    items: [
      { name: 'PHP', label_en: 'PHP', label_ar: 'PHP' },
      { name: 'Laravel', label_en: 'Laravel', label_ar: 'Laravel' },
      { name: 'Node.js', label_en: 'Node.JS', label_ar: 'Node.JS' },
    ],
  },
  {
    key: 'database',
    label_en: 'Database',
    label_ar: 'قواعد البيانات',
    items: [
      { name: 'MySQL', label_en: 'MySQL', label_ar: 'MySQL' },
      { name: 'PostgreSQL', label_en: 'PostgreSQL', label_ar: 'PostgreSQL' },
      { name: 'Redis', label_en: 'Redis', label_ar: 'Redis' },
      { name: 'MongoDB', label_en: 'MongoDB', label_ar: 'MongoDB' },
    ],
  },
  {
    key: 'mobile',
    label_en: 'Mobile',
    label_ar: 'تطبيقات الجوال',
    items: [
      { name: 'Flutter', label_en: 'Flutter', label_ar: 'Flutter' },
      { name: 'Dart', label_en: 'Dart', label_ar: 'Dart' },
    ],
  },
  {
    key: 'devops',
    label_en: 'Infra & DevOps',
    label_ar: 'البنية التحتية و DevOps',
    items: [
      { name: 'Docker', label_en: 'Docker', label_ar: 'Docker' },
      { name: 'Kubernetes', label_en: 'Kubernetes', label_ar: 'Kubernetes' },
      { name: 'AWS', label_en: 'AWS', label_ar: 'AWS' },
      { name: 'Azure', label_en: 'Azure', label_ar: 'Azure' },
      { name: 'Linux', label_en: 'Linux', label_ar: 'Linux' },
      { name: 'Terraform', label_en: 'Terraform', label_ar: 'Terraform' },
      { name: 'System Design', label_en: 'System Design', label_ar: 'تصميم النظم' },
      { name: 'Solution Architecture', label_en: 'Solution Architecture', label_ar: 'هندسة الحلول' },
    ],
  },
  {
    key: 'security',
    label_en: 'Security',
    label_ar: 'الأمن السيبراني',
    items: [
      { name: 'SAST', label_en: 'SAST', label_ar: 'SAST' },
      { name: 'App Pentesting', label_en: 'App Pentesting', label_ar: 'اختبار الاختراق' },
    ],
  },
  {
    key: 'testing',
    label_en: 'Testing',
    label_ar: 'الاختبار',
    items: [
      { name: 'Playwright', label_en: 'Playwright', label_ar: 'Playwright' },
      { name: 'Jest', label_en: 'Jest', label_ar: 'Jest' },
      { name: 'PHPUnit', label_en: 'PHPUnit', label_ar: 'PHPUnit' },
      { name: 'Manual Testing', label_en: 'Manual Testing', label_ar: 'اختبار يدوي' },
      { name: 'Automated Testing', label_en: 'Automated Testing', label_ar: 'اختبار مؤتمت' },
    ],
  },
  {
    key: 'data-ai',
    label_en: 'Data & AI',
    label_ar: 'البيانات والذكاء الاصطناعي',
    items: [
      { name: 'AI Agents', label_en: 'AI Agents', label_ar: 'وكلاء الذكاء الاصطناعي' },
      { name: 'MLOps', label_en: 'MLOps', label_ar: 'MLOps' },
      { name: 'Data Engineering', label_en: 'Data Engineering', label_ar: 'هندسة البيانات' },
      { name: 'AIOps', label_en: 'AIOps', label_ar: 'AIOps' },
      { name: 'DataOps', label_en: 'DataOps', label_ar: 'DataOps' },
    ],
  },
];

/* ── Component ─────────────────────────────────────────────────────── */
const Technologies: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeKey, setActiveKey] = useState('frontend');
  const [displayKey, setDisplayKey] = useState('frontend');

  const handleCategoryChange = (key: string) => {
    if (key === activeKey) return;
    setDisplayKey(key);
    setActiveKey(key);
  };

  const activeCategory = categories.find((c) => c.key === displayKey)!;
  const displayCategories = isRTL ? categories.slice().reverse() : categories;

  return (
    <section
      id="tech"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="py-24 md:py-32 bg-[#F9F9F9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 font-arabic">
            {t.tech.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-black mb-4 font-arabic leading-tight">
            {t.tech.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base md:text-lg max-w-2xl font-arabic">
            {t.tech.subtitle}
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap gap-6 md:gap-10 border-b border-gray-200 mb-12`}>
          {displayCategories.map((cat) => {
            const isActive = cat.key === activeKey;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`relative pb-4 text-sm font-bold whitespace-nowrap transition-all duration-200 focus:outline-none font-arabic
                  ${isActive
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {isRTL ? cat.label_ar : cat.label_en}
                {/* Active underline */}
                <span
                  className={`absolute bottom-[-1px] left-0 right-0 h-[2px] transition-all duration-300
                    ${isActive ? 'bg-black opacity-100' : 'opacity-0'}`}
                />
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            style={{ minHeight: '180px' }}
          >
            {activeCategory.items.map((tech) => (
              <motion.div
                variants={fadeInUp}
                key={tech.name}
                className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 h-40 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-grow flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <TechIcon name={tech.name} />
                </div>
                <span className="mt-4 text-gray-700 group-hover:text-black font-medium text-sm text-center transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Technologies;
