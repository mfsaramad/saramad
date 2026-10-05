\# 📋 آموزشگاه سرآمد — PROJECT.md



> آخرین بروزرسانی: ۱۴۰۴/۰۷/۱۵



\## 🌐 آنلاین

\- دامنه: https://mfsaramad.ir

\- GitHub: https://github.com/mfsaramad/saramad

\- Host: Cloudflare Pages

\- Output: static export (`out/`)



\## 🏗️ استک

\- Next.js 16.3.6 (App Router + Turbopack)

\- TypeScript

\- Tailwind CSS v4

\- Framer Motion

\- next-themes

\- Lucide Icons

\- Cloudflare Pages



\## ✅ تکمیل شده (۷۵ صفحه)

\- صفحات اصلی: /, /about, /blog, /courses, /exams, /instructors, /shop, /live, ...

\- کاربر: /login, /register, /cart, /checkout

\- داشبورد کاربر (۹ صفحه): /dashboard, orders, wishlist, notifications, courses, exams, certificates, profile, settings

\- پنل مدیریت (۷ صفحه): /admin, courses, users, orders, blog, instructors, settings



\## ❌ باقی‌مانده

\- \[ ] Auth (NextAuth) + محافظت از /admin و /dashboard

\- \[ ] Prisma + Database

\- \[ ] API Routes

\- \[ ] فرم افزودن دوره (/admin/courses/new)

\- \[ ] صفحه جزئیات سفارش (/dashboard/orders/\[id])

\- \[ ] رفع خطاهای TypeScript (برداشتن ignoreBuildErrors)



\## 🐛 نکات مهم

\- پوشه contexts با s هست: `@/contexts/...` (نه `@/context/`)

\- ThemeProvider و ThemeToggle: \*\*default export\*\* (بدون {})

\- CartContext, WishlistContext, NotificationsContext: \*\*named export\*\* (با {})

\- build با `output: 'export'` (static) — API Routes کار نمی‌کنن

\- Cloudflare Build output directory = `out`

\- `next.config.ts` شامل: output: 'export', typescript.ignoreBuildErrors: true



\## 🚀 Deploy

هر `git push` → Cloudflare خودکار build و deploy



\## 📂 ساختار

\- `src/app/` — صفحات (App Router)

\- `src/components/` — کامپوننت‌ها

\- `src/contexts/` — Context API

\- `src/data/` — داده‌های mock

\- `src/types/` — TypeScript types

\- `src/lib/` — توابع کمکی

\- `out/` — خروجی build (auto-generated)

