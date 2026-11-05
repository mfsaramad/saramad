'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Loader2, ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  // استفاده از نام صحیح متغیر (cart) و مقدار پیش‌فرض آرایه خالی
  const { cart = [], totalPrice = 0, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // این هوک فقط در سمت کلاینت اجرا می‌شود و از خطای SSR جلوگیری می‌کند
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    // شبیه‌سازی پرداخت
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    clearCart();
    setIsProcessing(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <ShieldCheck className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-800 mb-2">پرداخت موفق!</h1>
          <p className="text-slate-500 mb-6">سفارش شما با موفقیت ثبت شد و به دوره‌ها اضافه شد.</p>
          <Link href="/dashboard" className="inline-block bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">
            رفتن به داشبورد
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">سبد خرید شما خالی است</h1>
          <p className="text-slate-500 mb-6">هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید.</p>
          <Link href="/courses" className="inline-block bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/cart" className="text-slate-400 hover:text-slate-800"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-black text-slate-800">تسویه حساب</h1>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold mb-4">خلاصه سفارش</h2>
          <div className="space-y-3">
            {cart.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="font-bold text-slate-700">{item.title}</span>
                <span className="text-slate-500">{item.price?.toLocaleString()} تومان</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200">
            <span className="font-black text-slate-800">مبلغ قابل پرداخت</span>
            <span className="text-xl font-black text-blue-700">{totalPrice?.toLocaleString()} تومان</span>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          disabled={isProcessing}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <CreditCard className="w-6 h-6" />}
          {isProcessing ? 'در حال اتصال به درگاه...' : 'پرداخت نهایی'}
        </button>
      </div>
    </div>
  );
}