'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Loader2, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  // استفاده از نام صحیح متغیر (cart) به همراه مقدار پیش‌فرض آرایه خالی
  const { cart = [], removeFromCart, totalPrice = 0 } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // جلوگیری از خطای SSR (رندر در سمت سرور)
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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200">
            <ShoppingBag className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <h1 className="text-2xl font-black text-slate-800 mb-2">سبد خرید شما خالی است</h1>
            <p className="text-slate-500 mb-8">هنوز هیچ دوره یا محصولی به سبد خرید اضافه نکرده‌اید.</p>
            <Link href="/courses" className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition-colors">
              مشاهده دوره‌ها
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/courses" className="text-slate-400 hover:text-slate-800"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-2xl font-black text-slate-800">سبد خرید</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.type === 'course' ? 'دوره آموزشی' : 'محصول'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-slate-700">{item.price?.toLocaleString()} تومان</span>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-lg">
              <span className="text-slate-500">مبلغ کل: </span>
              <span className="font-black text-slate-800">{totalPrice?.toLocaleString()} تومان</span>
            </div>
            <Link href="/checkout" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors text-center">
              ادامه و تسویه حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}