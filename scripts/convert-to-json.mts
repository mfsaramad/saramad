/**
 * اسکریپت تبدیل data.ts به db.json
 * 
 * استفاده:
 *   npx tsx scripts/convert-to-json.mts
 */

import * as data from '../src/lib/data';
import fs from 'fs';
import path from 'path';

console.log('🔄 شروع تبدیل data.ts به db.json...\n');

// ============================================
// آماده‌سازی داده‌ها
// ============================================

// استادها — بدون تغییر
const instructors = data.instructors.map((i: any) => ({
  ...i,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// دوره‌ها — تبدیل instructor به instructorId
const courses = data.courses.map((c: any) => {
  const { instructor, ...rest } = c;
  return {
    ...rest,
    instructorId: instructor?.id || '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

// نظرات
const testimonials = data.testimonials.map((t: any) => ({
  ...t,
  isActive: true,
}));

// وبلاگ
const blogPosts = data.blogPosts.map((b: any) => ({
  ...b,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// شعبه‌ها
const branches = data.branches;

// آمار
const stats = data.stats;

// دسته‌بندی‌ها
const skillCategories = data.skillCategories;

// آزمون‌ها
const exams = data.exams.map((e: any) => ({
  ...e,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// محصولات
const products = data.products.map((p: any) => ({
  ...p,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// کلاس‌های زنده
const liveClasses = data.liveClasses.map((l: any) => ({
  ...l,
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// تنظیمات سایت (جدید)
const settings = {
  siteName: 'آموزشگاه سرآمد',
  siteDescription: 'پلتفرم آموزشی سرآمد — دوره‌ها، آزمون‌ها و اساتید',
  logo: '/logo.png',
  logoWhite: '/logo-white.png',
  favicon: '/favicon.ico',
  phone: '۰۹۳۶۲۸۴۷۹۲۲',
  email: 'info@saramad.ir',
  address: 'تبریز، خیابان بهار، روبروی تعاون روستایی',
  socials: {
    instagram: '',
    telegram: '',
    linkedin: '',
    youtube: '',
  },
  seo: {
    title: 'آموزشگاه سرآمد',
    description: 'بهترین دوره‌های آموزشی در تبریز',
    keywords: ['آموزشگاه', 'تبریز', 'دوره', 'آموزش'],
  },
  updatedAt: new Date().toISOString(),
};

// ============================================
// ساختار نهایی db.json
// ============================================

const db = {
  // متادیتا
  _meta: {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    description: 'دیتابیس موقت آموزشگاه سرآمد - آماده برای مهاجرت به Prisma',
  },

  // داده‌ها
  settings,
  instructors,
  courses,
  testimonials,
  blogPosts,
  branches,
  stats,
  skillCategories,
  exams,
  products,
  liveClasses,
};

// ============================================
// ذخیره
// ============================================

const outputPath = path.join(process.cwd(), 'src/data/db.json');
fs.writeFileSync(outputPath, JSON.stringify(db, null, 2), 'utf-8');

// ============================================
// گزارش
// ============================================

const size = (fs.statSync(outputPath).size / 1024).toFixed(2);

console.log('✅ db.json ساخته شد!\n');
console.log('📊 آمار:');
console.log(`   📁 مسیر: ${outputPath}`);
console.log(`   💾 حجم: ${size} KB`);
console.log(`   👨‍🏫 اساتید: ${instructors.length}`);
console.log(`   🎓 دوره‌ها: ${courses.length}`);
console.log(`   💬 نظرات: ${testimonials.length}`);
console.log(`   📰 مقالات: ${blogPosts.length}`);
console.log(`   🏢 شعبه‌ها: ${branches.length}`);
console.log(`   📈 آمار: ${stats.length}`);
console.log(`   🎯 دسته‌بندی: ${skillCategories.length}`);
console.log(`   📝 آزمون‌ها: ${exams.length}`);
console.log(`   🛍️ محصولات: ${products.length}`);
console.log(`   🎥 کلاس‌های زنده: ${liveClasses.length}`);
console.log('\n🎉 آماده!');