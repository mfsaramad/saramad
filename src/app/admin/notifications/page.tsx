'use client';

import { Bell } from 'lucide-react';

export default function AdminNotificationsPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
          <Bell className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800">مدیریت اعلانات</h1>
          <p className="text-sm text-slate-500">در این بخش می‌توانید اعلانات سایت را مدیریت کنید.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm text-center">
        <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">این بخش در حال ساخت است</h2>
        <p className="text-slate-500">تیم فنی ما در حال آماده‌سازی این بخش است.</p>
      </div>
    </div>
  );
}