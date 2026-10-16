'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'center' | 'right' | 'left';
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  const alignClasses = {
    center: 'text-center items-center',
    right: 'text-right items-start',
    left: 'text-left items-start',
  };

  // تقسیم متن به حروف
  const letters = badge ? Array.from(badge) : [];

  return (
    <div
      className={cn(
        'flex flex-col mb-12 lg:mb-16',
        alignClasses[align],
        className
      )}
    >
      {/* Badge با متن کاملاً متحرک */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative inline-flex mb-7"
        >
          {/* هاله رنگی پشت */}
          <motion.div
            className="absolute -inset-4 rounded-full blur-3xl -z-10"
            style={{
              background:
                'radial-gradient(ellipse, rgba(59, 130, 246, 0.6) 0%, rgba(13, 148, 136, 0.5) 40%, rgba(249, 115, 22, 0.3) 70%, transparent 100%)',
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
            }}
          />

          {/* Badge اصلی */}
          <motion.div
            className="relative inline-flex items-center justify-center px-10 py-4 rounded-full overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.8),
                0 15px 30px -8px rgba(13, 148, 136, 0.5),
                inset 0 0 30px rgba(94, 234, 212, 0.15)
              `,
            }}
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* حاشیه گرادیانت چرخان */}
            <motion.div
              className="absolute inset-0 rounded-full -z-[1]"
              style={{
                background:
                  'conic-gradient(from 0deg, #3b82f6, #2dd4bf, #f97316, #a855f7, #3b82f6)',
                padding: '2px',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Shimmer براق */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
              }}
              animate={{ x: ['-200%', '200%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            />

            {/* 📝 متن با انیمیشن کامل */}
            <span
              className="relative z-10 text-xl lg:text-2xl font-black whitespace-nowrap flex"
              style={{
                letterSpacing: '0.04em',
                perspective: '1000px',
              }}
              dir="rtl"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{
                    opacity: 0,
                    y: 30,
                    rotateX: -90,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    // موج عمودی
                    y: [0, -6, 0, 6, 0],
                    // درخشش
                    textShadow: [
                      '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(94,234,212,0.4)',
                      '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(94,234,212,1), 0 0 40px rgba(94,234,212,0.5)',
                      '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(94,234,212,0.4)',
                      '0 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(94,234,212,1), 0 0 40px rgba(94,234,212,0.5)',
                      '0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(94,234,212,0.4)',
                    ],
                    // تغییر رنگ
                    color: [
                      '#ffffff',
                      '#5eead4',
                      '#ffffff',
                      '#fbbf24',
                      '#ffffff',
                    ],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.12,
                    },
                    textShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.12,
                    },
                    color: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.12,
                    },
                    opacity: {
                      duration: 0.5,
                      delay: 0.3 + index * 0.05,
                    },
                    rotateX: {
                      duration: 0.6,
                      delay: 0.3 + index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                    },
                    scale: {
                      duration: 0.6,
                      delay: 0.3 + index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                    },
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    display: 'inline-block',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white mb-5 leading-tight max-w-3xl"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-semibold"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}