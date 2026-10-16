'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'center' | 'right' | 'left';
  titleClassName?: string;
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = 'center',
  titleClassName,
  className,
}: SectionTitleProps) {
  const alignClass = {
    center: 'text-center mx-auto',
    right: 'text-right',
    left: 'text-left',
  }[align];

  return (
    <div className={cn('mb-12 lg:mb-16', alignClass, className)}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="inline-block mb-6"
        >
          <motion.span
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.05,
              rotateX: 10,
              rotateY: -5,
            }}
            className="relative inline-flex items-center gap-3 px-8 py-4 lg:px-10 lg:py-5 rounded-full font-black text-lg lg:text-xl cursor-default"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #bfdbfe 100%)',
              color: '#1e3a8a',
              border: '2px solid rgba(30, 58, 138, 0.25)',
              boxShadow: `
                0 8px 0 #1e40af,
                0 10px 0 #1e3a8a,
                0 16px 32px rgba(30, 58, 138, 0.4),
                0 20px 40px rgba(0, 0, 0, 0.15),
                inset 0 3px 6px rgba(255, 255, 255, 1),
                inset 0 -3px 8px rgba(30, 58, 138, 0.1)
              `,
              textShadow:
                '0 1px 0 #ffffff, 0 2px 0 #93c5fd, 0 3px 6px rgba(30, 58, 138, 0.3)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* لوگوی آموزشگاه */}
            <motion.span
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(30, 58, 138, 0.4))',
              }}
            >
              <Image
                src="/logo.png"
                alt="لوگوی آموزشگاه سرآمد"
                width={48}
                height={48}
                className="w-9 h-9 lg:w-11 lg:h-11 object-contain dark:hidden"
              />
              <Image
                src="/logo-white.png"
                alt="لوگوی آموزشگاه سرآمد"
                width={48}
                height={48}
                className="w-9 h-9 lg:w-11 lg:h-11 object-contain hidden dark:block"
              />
            </motion.span>

            <span className="relative z-10">{badge}</span>

            {/* درخشش متحرک */}
            <motion.span
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1,
              }}
              className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                mixBlendMode: 'overlay',
              }}
            />
          </motion.span>
        </motion.div>
      )}

      <h2
        className={cn(
          'text-3xl lg:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3',
          titleClassName
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}