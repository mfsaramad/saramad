'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, PlayCircle, Megaphone, Building2, Monitor, RefreshCw } from 'lucide-react';
import { stats } from '@/lib/data';
import { toPersianNumber } from '@/lib/format';

export default function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
      {/* پس‌زمینه گرادیانت */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0d9488 100%)',
        }}
      />

      {/* افکت‌های تزئینی */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #14b8a6 0%, transparent 40%), radial-gradient(circle at 80% 70%, #f97316 0%, transparent 40%)',
        }}
      />

      {/* الگوی نقطه‌ای */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* متن هیرو */}
          <div className="text-white">
            {/* برچسب */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-6 text-sm font-bold cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg, rgba(20, 184, 166, 0.25) 0%, rgba(13, 148, 136, 0.35) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(94, 234, 212, 0.4)',
                boxShadow:
                  '0 12px 24px -8px rgba(20, 184, 166, 0.5), 0 6px 12px -4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-br from-teal-300 to-teal-500" />
              </span>

              <span className="font-black text-white">
                ثبت‌نام ترم جدید آغاز شد
              </span>

              <motion.span
                className="flex items-center justify-center w-7 h-7 rounded-full relative"
                style={{
                  background:
                    'linear-gradient(135deg, #fb923c 0%, #f97316 40%, #ea580c 100%)',
                  boxShadow: '0 4px 0 #c2410c, 0 6px 12px rgba(249, 115, 22, 0.6)',
                }}
                animate={{ rotate: [0, -12, 12, -12, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              >
                <Megaphone className="w-4 h-4 text-white" strokeWidth={2.5} />
              </motion.span>
            </motion.div>

            {/* تیتر */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black leading-tight mb-6"
            >
              <span
                style={{
                  color: '#ffffff',
                  textShadow:
                    '0 2px 0 #94a3b8, 0 4px 0 #64748b, 0 6px 12px rgba(0,0,0,0.5)',
                }}
              >
                مسیر
              </span>{' '}
              <span
                style={{
                  background:
                    'linear-gradient(180deg, #5eead4 0%, #14b8a6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                }}
              >
                حرفه‌ای
              </span>{' '}
              <span
                style={{
                  color: '#ffffff',
                  textShadow:
                    '0 2px 0 #94a3b8, 0 4px 0 #64748b, 0 6px 12px rgba(0,0,0,0.5)',
                }}
              >
                شدن
              </span>
              <br />
              <span
                style={{
                  color: '#ffffff',
                  textShadow:
                    '0 2px 0 #94a3b8, 0 4px 0 #64748b, 0 6px 12px rgba(0,0,0,0.5)',
                }}
              >
                از
              </span>{' '}
              <span
                style={{
                  background:
                    'linear-gradient(180deg, #fdba74 0%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                }}
              >
                سرآمد
              </span>{' '}
              <span
                style={{
                  color: '#ffffff',
                  textShadow:
                    '0 2px 0 #94a3b8, 0 4px 0 #64748b, 0 6px 12px rgba(0,0,0,0.5)',
                }}
              >
                شروع می‌شود
              </span>
            </motion.h1>

            {/* توضیح — کلمات «حضوری، آنلاین، ترکیبی» بزرگ‌تر، ضخیم‌تر و سه‌بعدی */}
{/* توضیح — کامل سفید و واضح */}
<motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="text-lg lg:text-xl leading-loose mb-8 max-w-xl font-bold"
  style={{
    color: '#ffffff',
    textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)',
  }}
>
  مجتمع آموزش فنی و حرفه‌ای سرآمد با برگزاری دوره‌های{' '}
  <span
    className="font-black inline-block text-2xl lg:text-3xl leading-none align-middle"
    style={{
      color: '#ffffff',
      textShadow: `
        0 1px 0 #f1f5f9,
        0 2px 0 #cbd5e1,
        0 3px 0 #94a3b8,
        0 4px 0 #64748b,
        0 5px 0 #475569,
        0 6px 12px rgba(0,0,0,0.7),
        0 8px 20px rgba(0,0,0,0.5)
      `,
      padding: '0 6px',
    }}
  >
    حضوری
  </span>
  ،{' '}
  <span
    className="font-black inline-block text-2xl lg:text-3xl leading-none align-middle"
    style={{
      color: '#ffffff',
      textShadow: `
        0 1px 0 #f1f5f9,
        0 2px 0 #cbd5e1,
        0 3px 0 #94a3b8,
        0 4px 0 #64748b,
        0 5px 0 #475569,
        0 6px 12px rgba(0,0,0,0.7),
        0 8px 20px rgba(0,0,0,0.5)
      `,
      padding: '0 6px',
    }}
  >
    آنلاین
  </span>{' '}
  و{' '}
  <span
    className="font-black inline-block text-2xl lg:text-3xl leading-none align-middle"
    style={{
      color: '#ffffff',
      textShadow: `
        0 1px 0 #f1f5f9,
        0 2px 0 #cbd5e1,
        0 3px 0 #94a3b8,
        0 4px 0 #64748b,
        0 5px 0 #475569,
        0 6px 12px rgba(0,0,0,0.7),
        0 8px 20px rgba(0,0,0,0.5)
      `,
      padding: '0 6px',
    }}
  >
    ترکیبی
  </span>
  ،{' '}
  <span
    className="font-black"
    style={{
      color: '#ffffff',
      textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)',
    }}
  >
    شما را برای ورود به بازار کار آماده می‌کند.
  </span>
</motion.p>
            {/* دکمه‌ها */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  boxShadow:
                    '0 10px 20px rgba(249,115,22,0.4), inset 0 -3px 0 rgba(0,0,0,0.15)',
                }}
              >
                مشاهده دوره‌ها
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold transition hover:scale-105 border border-white/30"
                style={{ background: 'rgba(255, 255, 255, 0.12)' }}
              >
                <PlayCircle className="w-5 h-5" />
                کلاس‌های آنلاین
              </Link>
            </motion.div>

            {/* آمار */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-right">
                  <div
                    className="text-2xl lg:text-3xl font-black text-white"
                    style={{
                      textShadow:
                        '0 2px 0 #1e3a8a, 0 4px 8px rgba(0,0,0,0.5)',
                    }}
                  >
                    {toPersianNumber(stat.value)}
                    <span className="text-teal-400">{stat.suffix}</span>
                  </div>
                  <div
                    className="text-xs text-blue-200 mt-1"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ============ کارت‌ها ============ */}
          <div
            className="relative hidden lg:block h-[760px] -mt-22"
            style={{ perspective: '1500px' }}
          >

            {/* ✨ کارت ۱: کلاس حضوری — آبی */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -25 }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: -8,
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                type: 'spring',
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              whileHover={{
                rotateY: 0,
                rotateX: -5,
                translateZ: 50,
                scale: 1.05,
                zIndex: 30,
              }}
              className="absolute top-12 right-4 w-[320px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
            >
              <Link href="/courses/in-person" className="block">
                <div
                  className="absolute -inset-3 rounded-[36px] blur-2xl opacity-60 -z-10"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, transparent 70%)',
                  }}
                />

                <div
                  className="relative rounded-3xl p-5 overflow-hidden text-center"
                  style={{
                    background:
                      'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
                    boxShadow: `
                      0 30px 60px -15px rgba(30, 58, 138, 0.75),
                      0 15px 30px -10px rgba(30, 58, 138, 0.5),
                      0 8px 16px -5px rgba(0,0,0,0.3),
                      inset 0 2px 0 rgba(255,255,255,0.35),
                      inset 0 -4px 12px rgba(0,0,0,0.25)
                    `,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="absolute -top-10 -right-20 w-40 h-40 rounded-full blur-3xl"
                    style={{ background: 'rgba(96, 165, 250, 0.6)' }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotateY: 15, rotateX: -10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #ffffff 0%, #dbeafe 100%)',
                          boxShadow:
                            '0 6px 0 #1e40af, 0 10px 20px rgba(0,0,0,0.4), inset 0 3px 3px rgba(255,255,255,1)',
                        }}
                      >
                        <Building2
                          className="w-7 h-7 text-blue-700"
                          strokeWidth={2.5}
                        />
                      </motion.div>

                      <h3
                        className="text-2xl font-black text-white"
                        style={{
                          textShadow:
                            '0 3px 6px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.6)',
                        }}
                      >
                        کلاس حضوری
                      </h3>
                    </div>

                    <p
                      className="text-base font-black mb-2"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      تجربه واقعی یادگیری
                    </p>

                    <p
                      className="text-[15px] leading-relaxed px-2 font-bold"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      تعامل چهره‌به‌چهره با استاد و هم‌کلاسی‌ها در محیط آموزشی مجهز
                    </p>

                    <div
                      className="mt-4 h-1 w-20 mx-auto rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(96, 165, 250, 0) 0%, #93c5fd 50%, rgba(96, 165, 250, 0) 100%)',
                        boxShadow: '0 0 12px rgba(147, 197, 253, 0.9)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ✨ کارت ۲: کلاس آنلاین — فیروزه‌ای */}
            <motion.div
              initial={{ opacity: 0, x: -60, rotateY: 25 }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 8,
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                type: 'spring',
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                },
              }}
              whileHover={{
                rotateY: 0,
                rotateX: -5,
                translateZ: 50,
                scale: 1.05,
                zIndex: 30,
              }}
              className="absolute top-[280px] left-0 w-[320px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d', zIndex: 20 }}
            >
              <Link href="/courses/online" className="block">
                <div
                  className="absolute -inset-3 rounded-[36px] blur-2xl opacity-60 -z-10"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(20, 184, 166, 0.7) 0%, transparent 70%)',
                  }}
                />

                <div
                  className="relative rounded-3xl p-5 overflow-hidden text-center"
                  style={{
                    background:
                      'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)',
                    boxShadow: `
                      0 30px 60px -15px rgba(13, 148, 136, 0.75),
                      0 15px 30px -10px rgba(13, 148, 136, 0.5),
                      0 8px 16px -5px rgba(0,0,0,0.3),
                      inset 0 2px 0 rgba(255,255,255,0.35),
                      inset 0 -4px 12px rgba(0,0,0,0.25)
                    `,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                    style={{ background: 'rgba(94, 234, 212, 0.6)' }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotateY: 15, rotateX: -10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #ffffff 0%, #ccfbf1 100%)',
                          boxShadow:
                            '0 6px 0 #0f766e, 0 10px 20px rgba(0,0,0,0.4), inset 0 3px 3px rgba(255,255,255,1)',
                        }}
                      >
                        <Monitor
                          className="w-7 h-7 text-teal-700"
                          strokeWidth={2.5}
                        />
                      </motion.div>

                      <h3
                        className="text-2xl font-black text-white"
                        style={{
                          textShadow:
                            '0 3px 6px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.6)',
                        }}
                      >
                        کلاس آنلاین
                      </h3>
                    </div>

                    <p
                      className="text-base font-black mb-2"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      از هر جای ایران
                    </p>

                    <p
                      className="text-[15px] leading-relaxed px-2 font-bold"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      کلاس‌های زنده با کیفیت HD، ضبط جلسات و پشتیبانی آنلاین
                    </p>

                    <div
                      className="mt-4 h-1 w-20 mx-auto rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(94, 234, 212, 0) 0%, #99f6e4 50%, rgba(94, 234, 212, 0) 100%)',
                        boxShadow: '0 0 12px rgba(153, 246, 228, 0.9)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ✨ کارت ۳: دوره ترکیبی — نارنجی */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -25 }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: -8,
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.9,
                delay: 0.7,
                type: 'spring',
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.6,
                },
              }}
              whileHover={{
                rotateY: 0,
                rotateX: -5,
                translateZ: 50,
                scale: 1.05,
                zIndex: 30,
              }}
             className="absolute bottom-12 right-10 w-[320px] cursor-pointer"
              style={{ transformStyle: 'preserve-3d', zIndex: 15 }}
            >
              <Link href="/courses/hybrid" className="block">
                <div
                  className="absolute -inset-3 rounded-[36px] blur-2xl opacity-60 -z-10"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, transparent 70%)',
                  }}
                />

                <div
                  className="relative rounded-3xl p-5 overflow-hidden text-center"
                  style={{
                    background:
                      'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
                    boxShadow: `
                      0 30px 60px -15px rgba(234, 88, 12, 0.75),
                      0 15px 30px -10px rgba(234, 88, 12, 0.5),
                      0 8px 16px -5px rgba(0,0,0,0.3),
                      inset 0 2px 0 rgba(255,255,255,0.35),
                      inset 0 -4px 12px rgba(0,0,0,0.25)
                    `,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl"
                    style={{ background: 'rgba(254, 215, 170, 0.6)' }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotateY: 15, rotateX: -10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            'linear-gradient(135deg, #ffffff 0%, #fed7aa 100%)',
                          boxShadow:
                            '0 6px 0 #c2410c, 0 10px 20px rgba(0,0,0,0.4), inset 0 3px 3px rgba(255,255,255,1)',
                        }}
                      >
                        <RefreshCw
                          className="w-7 h-7 text-orange-700"
                          strokeWidth={2.5}
                        />
                      </motion.div>

                      <h3
                        className="text-2xl font-black text-white"
                        style={{
                          textShadow:
                            '0 3px 6px rgba(0,0,0,0.9), 0 6px 12px rgba(0,0,0,0.6)',
                        }}
                      >
                        دوره ترکیبی
                      </h3>
                    </div>

                    <p
                      className="text-base font-black mb-2"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)',
                      }}
                    >
                      بهترین هر دو دنیا
                    </p>

                    <p
                      className="text-[15px] leading-relaxed px-2 font-bold"
                      style={{
                        color: '#ffffff',
                        textShadow:
                          '0 2px 4px rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.6)',
                      }}
                    >
                      ترکیبی از مزایای حضوری و آنلاین برای یادگیری بهتر
                    </p>

                    <div
                      className="mt-4 h-1 w-20 mx-auto rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(253, 186, 116, 0) 0%, #fed7aa 50%, rgba(253, 186, 116, 0) 100%)',
                        boxShadow: '0 0 12px rgba(254, 215, 170, 0.9)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* درخشش پس‌زمینه */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl -z-20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* موج پایین */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 45C840 60 960 90 1080 97.5C1200 105 1320 90 1380 82.5L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}