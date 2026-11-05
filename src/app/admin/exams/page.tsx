'use client';

import { Loader2, Award } from 'lucide-react';

export default function AdminExamsPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800">مدیریت آزمون‌ها</h1>
          <p className="text-sm text-slate-500">به زودی در این بخش می‌توانید آزمون‌های جدید بسازید.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center">
        <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">این بخش در حال ساخت است</h2>
        <p className="text-slate-500">تیم فنی ما در حال آماده‌سازی فرم‌های ساخت آزمون و سوالات است.</p>
      </div>
    </div>
  );
}