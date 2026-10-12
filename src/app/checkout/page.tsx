'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Shield,
  Trash2,
  Loader2,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useDb } from '@/hooks/useDb';
import { toPersianNumber, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3;

interface OrderItem {
  id: string;
  type: string;
  title: string;
  price: number;
  quantity: number;
  mode?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  paymentMethod: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { add: addOrder } = useDb<Order>('orders');

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');

  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('zarinpal');

  const formatDate = () => {
    const now = new Date();
    const year = now.getFullYear() - 621;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleNext = () => {
    setError('');

    if (step === 1) {
      if (!personalInfo.name.trim()) return setError('نام الزامی است');
      if (!personalInfo.email.trim()) return setError('ایمیل الزامی است');
      if (!personalInfo.phone.trim()) return setError('شماره تماس الزامی است');
    }

    setStep((s) => Math.min(3, s + 1) as Step);
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1) as Step);
  };

  const handleSubmit = async () => {
    setError('');

    if (items.length === 0) {
      return setError('سبد خرید خالی است');
    }

    setLoading(true);

    try {
      // ساخت شماره سفارش
      const orderNum = `SRM-${Date.now().toString().slice(-8)}`;

      // ساخت آیتم‌های سفارش
      const orderItems: OrderItem[] = items.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        mode: item.mode,
      }));

      const date = formatDate();

      // ساخت سفارش
      const newOrder: Omit<Order, 'id'> & { id?: string } = {
        orderNumber: orderNum,
        userId: user?.id || 'guest',
        userName: personalInfo.name,
        userEmail: personalInfo.email,
        userPhone: personalInfo.phone,
        items: orderItems,
        subtotal: totalPrice,
        discount: 0,
        total: totalPrice,
        status: 'pending',
        paymentMethod,
        trackingCode: `TRK-${Date.now().toString().slice(-10)}`,
        createdAt: date,
        updatedAt: date,
      };

      // ثبت سفارش
      addOrder(newOrder as any);

      // پاک کردن سبد
      clearCart();

      // نمایش موفقیت
      setOrderNumber(orderNum);
      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      console.error('خطا در ثبت سفارش:', err);
      setError('خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.');
      setLoading(false);
    }
  };

  // ==================== صفحه خالی ====================
  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-950 dark:to-gray-900 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
            سبد خرید خالی است
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            برای ادامه، ابتدا محصولی به سبد اضافه کنید
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            <ArrowRight className="w-5 h-5" />
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    );
  }

  // ==================== صفحه موفقیت ====================
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
          </div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
            سفارش با موفقیت ثبت شد!
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            از خرید شما سپاسگزاریم. اطلاعات سفارش:
          </p>

          <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-2xl mb-6">
            <div className="text-sm text-teal-600 dark:text-teal-400 mb-1">
              شماره سفارش
            </div>
            <div className="text-lg font-black text-teal-800 dark:text-teal-300" dir="ltr">
              {orderNumber}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-l from-blue-600 to-teal-600 text-white rounded-xl font-black hover:shadow-xl transition-all"
            >
              مشاهده سفارشات
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-blue-800 dark:border-blue-600 text-blue-800 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-800 hover:text-white transition-all"
            >
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==================== مراحل ====================
  const steps = [
    { id: 1, label: 'اطلاعات' },
    { id: 2, label: 'پرداخت' },
    { id: 3, label: 'تأیید' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-bold mb-4">
            <Shield className="w-4 h-4" />
            پرداخت امن
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            تکمیل خرید
          </h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {steps.map((s, idx) => {
            const isDone = step > s.id;
            const isActive = step === s.id;

            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all',
                      isDone && 'bg-teal-500 text-white shadow-lg',
                      isActive &&
                        'bg-gradient-to-br from-blue-600 to-teal-600 text-white shadow-lg',
                      !isDone && !isActive && 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                    )}
                  >
                    {isDone ? <CheckCircle2 className="w-6 h-6" /> : s.id}
                  </div>
                  <div
                    className={cn(
                      'text-xs font-bold',
                      isActive ? 'text-blue-800 dark:text-blue-400' : 'text-gray-500'
                    )}
                  >
                    {s.label}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 md:w-24 h-1 mx-2 rounded',
                      isDone ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-800'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8">
              {/* ============ مرحله ۱: اطلاعات ============ */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                    </div>
                    اطلاعات شخصی
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        نام و نام خانوادگی *
                      </label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, name: e.target.value })
                        }
                        placeholder="مثلاً: علی رضایی"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        ایمیل *
                      </label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, email: e.target.value })
                        }
                        placeholder="example@email.com"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        شماره تماس *
                      </label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, phone: e.target.value })
                        }
                        placeholder="09123456789"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        آدرس (اختیاری)
                      </label>
                      <input
                        type="text"
                        value={personalInfo.address}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, address: e.target.value })
                        }
                        placeholder="آدرس شما"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ============ مرحله ۲: پرداخت ============ */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    روش پرداخت
                  </h2>

                  <div className="space-y-3">
                    {[
                      { id: 'zarinpal', label: 'زرین‌پال', desc: 'پرداخت آنلاین با کارت بانکی' },
                      { id: 'idpay', label: 'آیدی‌پی', desc: 'درگاه پرداخت امن' },
                      { id: 'wallet', label: 'کیف پول', desc: 'پرداخت از موجودی کیف پول' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          'w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right',
                          paymentMethod === method.id
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        )}
                      >
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                            paymentMethod === method.id
                              ? 'border-teal-500 bg-teal-500'
                              : 'border-gray-300'
                          )}
                        >
                          {paymentMethod === method.id && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 dark:text-white mb-1">
                            {method.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {method.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 border-r-4 border-teal-500 rounded-xl flex items-start gap-2">
                    <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-teal-800 dark:text-teal-300">
                      پرداخت شما در محیطی امن انجام می‌شود.
                    </p>
                  </div>
                </div>
              )}

              {/* ============ مرحله ۳: تأیید ============ */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                    </div>
                    تأیید نهایی
                  </h2>

                  <div className="space-y-4">
                    <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <h3 className="font-black text-gray-800 dark:text-white mb-3">
                        اطلاعات شما
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <div>نام: {personalInfo.name || '—'}</div>
                        <div dir="ltr">ایمیل: {personalInfo.email || '—'}</div>
                        <div dir="ltr">تلفن: {personalInfo.phone || '—'}</div>
                      </div>
                    </div>

                    <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <h3 className="font-black text-gray-800 dark:text-white mb-3">
                        روش پرداخت
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {paymentMethod === 'zarinpal' && 'زرین‌پال'}
                        {paymentMethod === 'idpay' && 'آیدی‌پی'}
                        {paymentMethod === 'wallet' && 'کیف پول'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* دکمه‌ها */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={cn(
                    'flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition',
                    step === 1
                      ? 'opacity-0 cursor-default'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <ArrowRight className="w-4 h-4" />
                  مرحله قبل
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-teal-600 text-white rounded-xl font-black hover:shadow-xl transition-all hover:gap-3"
                  >
                    مرحله بعد
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-white bg-gradient-to-l from-teal-500 to-teal-700 hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        در حال ثبت...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        ثبت و پرداخت
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - خلاصه سفارش */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 lg:sticky lg:top-24 space-y-4">
              <h3 className="text-lg font-black text-gray-800 dark:text-white mb-5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-800 dark:text-blue-400" />
                خلاصه سفارش
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-5 pb-5 border-b border-gray-100 dark:border-gray-800">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 pb-3 border-b border-gray-50 dark:border-gray-800 last:border-0"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center text-xl flex-shrink-0">
                      {item.type === 'course' ? '📚' : '📦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-800 dark:text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.quantity ? `${toPersianNumber(item.quantity)} عدد` : '۱ عدد'}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-800 dark:text-white whitespace-nowrap">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-5 pb-5 border-b border-gray-100 dark:border-gray-800 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">جمع کل</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">تخفیف</span>
                  <span className="font-bold text-gray-800 dark:text-white">۰ تومان</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-gray-800 dark:text-white">
                  مبلغ قابل پرداخت
                </span>
                <span className="font-black text-lg text-teal-600 dark:text-teal-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Trust badges */}
              <div className="space-y-2.5 pt-5 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  پرداخت امن و مطمئن
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  پشتیبانی ۲۴/۷
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  ضمانت بازگشت وجه
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}