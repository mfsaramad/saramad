# ۱. ساخت پروژه Next.js
npx create-next-app@latest saramed --typescript --tailwind --app --src-dir --import-alias "@/*"

# ۲. ورود به پوشه
cd saramed

# ۳. نصب پکیج‌های ضروری
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install react-hook-form zod @hookform/resolvers
npm install zustand
npm install framer-motion

# ۴. نصب shadcn/ui (اختیاری ولی توصیه می‌شود)
npx shadcn@latest init

# ۵. نصب کامپوننت‌های پرکاربرد shadcn
npx shadcn@latest add button card input label badge avatar dropdown-menu sheet tabs dialog