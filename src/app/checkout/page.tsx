'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Loader2, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const handlePayment = async () => {
    if (!user) {
      alert('لطفاً ابتدا وارد شوید.');
      router.push('/login');
      return;
    }

    if (cart.length === 0) {
      alert('سبد خرید شما خالی است.');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
      
      // استخراج ID دوره و حذف پیشوند "course-"
      const rawCartId = cart.find(item => item.type === 'course' || item.type === undefined)?.id || null;
      const firstCourseId = rawCartId ? rawCartId.replace('course-', '') : null;

      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        order_number: orderNumber,
        total_amount: totalAmount,
        status: 'paid',
        payment_method: 'online',
        course_id: firstCourseId, // ذخیره UUID خالص
        items: cart 
      });

      if (error) throw error;

      clearCart();
      setIsSuccess(true);
      
    } catch (error: any) {
      alert('خطا در ثبت سفارش: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4" dir="rtl">
        <div className="bg-white p-8 rounded-3xl shadow-lg border max-w-md w-full text-center">
          <ShieldCheck className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">پرداخت موفق!</h2>
          <p className="text-slate-500 mb-6">سفارش شما با موفقیت ثبت شد و دوره به دوره‌های شما اضافه گردید.</p>
          <Link href="/dashboard" className="w-full block py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
            رفتن به داشبورد و مشاهده دوره
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-lg border max-w-md w-full text-center">
        <h1 className="text-2xl font-black mb-2">پرداخت آنلاین</h1>
        <p className="text-slate-500 mb-6">شما در حال خرید {cart.length} دوره هستید.</p>
        
        <div className="bg-slate-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-slate-600 mb-1">مبلغ قابل پرداخت:</p>
          <p className="text-2xl font-black text-blue-700">{totalAmount.toLocaleString()} تومان</p>
        </div>

        <button 
          onClick={handlePayment} 
          disabled={isProcessing} 
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {isProcessing ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> در حال پردازش...</>
          ) : (
            <><CreditCard className="w-5 h-5" /> پرداخت نهایی</>
          )}
        </button>
      </div>
    </div>
  );
}