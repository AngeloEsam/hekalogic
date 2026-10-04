import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

/* ── Member data (static, no need in i18n since names are fixed) ── */
interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string | null;
  initials: string;
  github: string;
  linkedin: string;
}

const members: TeamMember[] = [
  {
    id: 'karim',
    nameAr: 'كريم حازم',
    nameEn: 'Karim Hazem',
    roleAr: 'مسؤول الاختبار',
    roleEn: 'Testing',
    avatar: '/avatar_karim.png',
    initials: 'KH',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'heba',
    nameAr: 'هبه عيسى',
    nameEn: 'Heba Eissa',
    roleAr: 'مطورة واجهات أمامية',
    roleEn: 'Frontend Developer',
    avatar: '/avatar_heba.png',
    initials: 'HE',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'angelo',
    nameAr: 'انجلو عصام',
    nameEn: 'Angelo Esam',
    roleAr: 'مطور واجهات أمامية',
    roleEn: 'Frontend Developer',
    avatar: '/avatar_angelo.png',
    initials: 'AE',
    github: 'https://github.com/AngeloEsam',
    linkedin: 'https://www.linkedin.com/in/angelo-esam/',
  },
  {
    id: 'abdelrahman',
    nameAr: 'عبدالرحمن علي',
    nameEn: 'Abdelrahman Ali',
    roleAr: 'مطور خلفي',
    roleEn: 'Backend Developer',
    avatar: '/avatar_abdelrahman.png',
    initials: 'AA',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'ahmed',
    nameAr: 'أحمد رمضان',
    nameEn: 'Ahmed Ramadan',
    roleAr: 'مطور خلفي',
    roleEn: 'Backend Developer',
    avatar: '/avatar_ahmed.png',
    initials: 'AR',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'mohamedtarek',
    nameAr: 'محمد طارق',
    nameEn: 'Mohammed Tarek',
    roleAr: 'معماري حلول',
    roleEn: 'Solution Architect',
    avatar: '/avatar_mohammed.png',
    initials: 'MT',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'mohamedosama',
    nameAr: 'محمد أسامة',
    nameEn: 'Mohammed Osama',
    roleAr: 'مسؤول التسويق',
    roleEn: 'Media Buyer',
    avatar: '/avatar_mohamed.png',
    initials: 'MO',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 'rehamhamdy',
    nameAr: 'ريهام حمدي',
    nameEn: 'Reham Hamdy',
    roleAr: 'قائد الفريق',
    roleEn: 'Team Leader',
    avatar: '/avatar_heba.png',
    initials: 'MO',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
];

/* ── Drop-shaped avatar card ────────────────────────────────────── */
const MemberCard: React.FC<{ member: TeamMember; isRTL: boolean }> = ({
  member,
  isRTL,
}) => {
  const [hovered, setHovered] = useState(false);
  const name = isRTL ? member.nameAr : member.nameEn;
  const role = isRTL ? member.roleAr : member.roleEn;

  return (
    <div
      className="flex flex-col items-center group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drop / Blob shape */}
      <div
        className="relative overflow-hidden transition-transform duration-500 ease-out rounded-full"
        style={{
          width: 180,
          height: 180,
          transform: hovered ? 'translateY(-8px) scale(1.04)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Avatar image or initials fallback */}
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={name}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 object-cover object-top select-none"
            style={{ height: 175 }}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            >
              {member.initials}
            </div>
          </div>
        )}

        {/* Hover shimmer overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <h3
          className="text-base font-semibold text-black transition-colors duration-300"
        >
          {name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5 font-medium">{role}</p>
        
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-3 mt-3">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-black transition-colors"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#0a66c2] transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Section ────────────────────────────────────────────────────── */
const Team: React.FC = () => {
  const { isRTL } = useLanguage();

  const sectionTitle = isRTL
    ? 'تعرّف على فريقنا المميز'
    : 'Meet Our Outstanding Team';
  const sectionBadge = isRTL ? 'فريقنا من الرائعين' : 'A Group of Excellence';
  const sectionSubtitle = isRTL
    ? 'مجموعة من الخبراء الشباب المتحمسين الذين يبنون معك كل نقرة.'
    : 'A group of passionate young experts building with you, click by click.';

  return (
    <section
      id="team"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="py-24 md:py-32 bg-[#F9F9F9] relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'linear-gradient(135deg, #a8e6f0, #c8f4e8)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'linear-gradient(135deg, #fde8c0, #fbcfe8)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {sectionBadge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4 leading-tight">
            {sectionTitle}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-xl">{sectionSubtitle}</motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center"
        >
          {members.map((m) => (
            <motion.div variants={fadeInUp} key={m.id}>
              <MemberCard member={m} isRTL={isRTL} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
