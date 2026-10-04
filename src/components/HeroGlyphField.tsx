import React from 'react';
import { motion } from 'framer-motion';

type Glyph = {
  src: string;
  x: string;
  y: string;
  size: string;
  rotate?: number;
  delay?: number;
  duration?: number;
};

/**
 * Real Egyptian glyph artwork cropped from the reference symbol sheet supplied
 * for the Hekalogic concept. The symbols are decorative, low-contrast and
 * interactive: hovering a glyph gently lifts/enlarges it and reveals its name.
 */
const glyphs: Glyph[] = [
  { src: '/egyptian-glyphs/eye-of-horus.png', x: '7%', y: '21%', size: 'clamp(42px, 4vw, 68px)', rotate: -4, duration: 13, delay: 0 },
  { src: '/egyptian-glyphs/lotus.png', x: '25%', y: '13%', size: 'clamp(38px, 3.5vw, 62px)', rotate: 3, duration: 17, delay: -4 },
  { src: '/egyptian-glyphs/winged-scarab.png', x: '87%', y: '16%', size: 'clamp(48px, 4.4vw, 74px)', rotate: 2, duration: 18, delay: -5 },
  { src: '/egyptian-glyphs/ankh.png', x: '18%', y: '41%', size: 'clamp(44px, 4vw, 67px)', rotate: -2, duration: 15, delay: -2 },
  { src: '/egyptian-glyphs/snake-left.png', x: '8%', y: '57%', size: 'clamp(38px, 3.2vw, 55px)', rotate: 2, duration: 14, delay: -8 },
  { src: '/egyptian-glyphs/falcon.png', x: '87%', y: '49%', size: 'clamp(48px, 4.3vw, 71px)', rotate: -3, duration: 16, delay: -6 },
  { src: '/egyptian-glyphs/jackal.png', x: '18%', y: '72%', size: 'clamp(48px, 4.3vw, 72px)', rotate: 1, duration: 19, delay: -10 },
  { src: '/egyptian-glyphs/scarab.png', x: '76%', y: '75%', size: 'clamp(47px, 4.1vw, 68px)', rotate: 2, duration: 17, delay: -3 },
  { src: '/egyptian-glyphs/seated-figure.png', x: '39%', y: '79%', size: 'clamp(44px, 3.8vw, 63px)', rotate: -2, duration: 20, delay: -11 },
  { src: '/egyptian-glyphs/standing-figure.png', x: '94%', y: '65%', size: 'clamp(37px, 3.3vw, 55px)', rotate: 3, duration: 18, delay: -1 },
];

const HeroGlyphField: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
    {/* Soft central veil keeps the wordmark/headline crisp while leaving the edges alive. */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,251,250,0.96)_0%,rgba(251,251,250,0.82)_46%,rgba(251,251,250,0.34)_78%,rgba(251,251,250,0.10)_100%)]" />

    {glyphs.map((glyph, index) => (
      <motion.div
        key={index}
        className="hero-glyph absolute flex flex-col items-center"
        style={{ left: glyph.x, top: glyph.y, rotate: glyph.rotate, zIndex: 1 }}
        initial={{ opacity: 0.22, y: 0, scale: 1 }}
        animate={{
          opacity: [0.16, 0.25, 0.16],
          y: [0, 50, 3, 0],
          x: [0, 50, -30, 0],
          rotate: [glyph.rotate ?? 0, (glyph.rotate ?? 0) + 2, (glyph.rotate ?? 0) - 1, glyph.rotate ?? 0],
        }}
        whileHover={{
          opacity: 0.62,
          y: -10,
          scale: 1.14,
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
        }}
        transition={{
          duration: glyph.duration ?? 16,
          delay: glyph.delay ?? 0,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="hero-glyph-image-wrap" style={{ width: glyph.size }}>
          <img
            src={glyph.src}
            alt=""
            draggable={false}
            className="hero-glyph-image h-auto w-full select-none"
          />
        </div>
      </motion.div>
    ))}
  </div>
);

export default HeroGlyphField;
