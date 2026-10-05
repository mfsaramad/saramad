'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Shield,
  Lock,
} from 'lucide-react';
import { courses } from '@/lib/data';
import {
  toPersianNumber,
  formatPrice,
  getModeLabel,
  getModeIcon,
} from '@/lib/format';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3 | 4;
type PaymentMethod = 'online' | 'installment' | 'wallet';
type CourseMode = 'in-person' | 'online' | 'hybrid';

export default function CheckoutPage() {
  const course = courses[0];
  const [step, setStep] = useState<Step>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const availableModes = Object.keys(course.price).filter(
    (key) => course.price[key as CourseMode] !== undefined
  ) as CourseMode[];

  const [selectedMode, setSelectedMode] = useState<CourseMode>(
    availableModes[0] || 'online'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');

  const currentPrice = course.price[selectedMode] || 0;
  const taxAmount = Math.round(currentPrice * 0.09);
  const finalPrice = currentPrice + taxAmount;

  const steps = [
    { id: 1, label: 'اطلاعات شخصی', icon: User },
    { id: 2, label: 'نوع دوره', icon: ShoppingBag },
    { id: 3, label: 'روش پرداخت', icon: CreditCard },
    { id: 4, label: 'تأیید نهایی', icon: CheckCircle2 },
  ];

  const paymentMethods = [
    {
      id: 'online' as PaymentMethod,
      title: 'پرداخت آنلاین',
      icon: CreditCard,
      desc: 'کارت بانکی',
    },
    {
      id: 'installment' as PaymentMethod,
      title: 'پرداخت اقساطی',
      icon: Building2,
      desc: 'تا ۳ قسط',
    },
    {
      id: 'wallet' as PaymentMethod,
      title: 'کیف پول',
      icon: Wallet,
      desc: 'موجودی کیف پول',
    },
  ];

  // ===== صفحه موفقیت =====
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 shadow-2xl shadow-teal-500/30 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-4">
              🎉 ثبت‌نام با موفقیت انجام شد!
            </h1>
            <p className="text-slate-600 mb-8">
              شما در دوره «{course.title}» ثبت‌نام کردید.
            </p>
            <div className="bg-slate-50 rounded-2xl p-5 mb-8">
              <div className="text-xs text-slate-500 mb-2">
                کد پیگیری سفارش
              </div>
              <div className="text-2xl font-black text-blue-800 tracking-wider">
                SRM-{toPersianNumber(new Date().getFullYear())}-
                {toPersianNumber(Math.floor(Math.random() * 9000) + 1000)}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:gap-3"
              >
                <User className="w-5 h-5" />
                ورود به پنل کاربری
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-blue-800 text-blue-800 rounded-xl font-bold hover:bg-blue-800 hover:text-white transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                دوره‌های دیگر
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== فرم اصلی =====
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-4">
            <ShoppingBag className="w-4 h-4" />
            <span>تکمیل خرید</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-800 mb-3">
            نهایی‌سازی ثبت‌نام
          </h1>
          <p className="text-slate-600">
            در چند مرحله ساده، ثبت‌نام خود را تکمیل کنید
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all',
                      isDone && 'bg-teal-500 text-white shadow-lg',
                      isActive &&
                        'bg-gradient-to-br from-[#1e3a8a] to-[#0d9488] text-white shadow-lg scale-110',
                      !isActive && !isDone && 'bg-slate-200 text-slate-500'
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold whitespace-nowrap',
                      isActive ? 'text-blue-800' : 'text-slate-500'
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 sm:w-20 h-1 rounded-full mx-2 mb-6',
                      step > s.id ? 'bg-teal-500' : 'bg-slate-200'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* فرم */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
              {/* مرحله ۱ */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-800" />
                    </div>
                    اطلاعات شخصی
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        نام و نام خانوادگی *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={personalInfo.name}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              name: e.target.value,
                            })
                          }
                          placeholder="مثلاً: علی محمدی"
                          className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                        />
                        <User className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          ایمیل *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                email: e.target.value,
                              })
                            }
                            placeholder="example@email.com"
                            className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                          />
                          <Mail className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          شماره تماس *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) =>
                              setPersonalInfo({
                                ...personalInfo,
                                phone: e.target.value,
                              })
                            }
                            placeholder="۰۹۳۶۲۸۴۷۹۲۲"
                            className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
                          />
                          <Phone className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        آدرس
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={personalInfo.address}
                          onChange={(e) =>
                            setPersonalInfo({
                              ...personalInfo,
                              address: e.target.value,
                            })
                          }
                          placeholder="آدرس خود را وارد کنید..."
                          className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition resize-none"
                        />
                        <MapPin className="w-5 h-5 text-slate-400 absolute top-4 right-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* مرحله ۲ */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-teal-600" />
                    </div>
                    انتخاب نوع دوره
                  </h2>
                  <div className="mb-6 p-5 bg-slate-50 rounded-2xl">
                    <div className="font-black text-slate-800 mb-2">
                      {course.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      {toPersianNumber(course.duration)} ساعت •{' '}
                      {toPersianNumber(course.sessions)} جلسه
                    </div>
                  </div>
                  <div className="space-y-3">
                    {availableModes.map((mode) => {
                      const isSelected = selectedMode === mode;
                      const price = course.price[mode] || 0;
                      const label =
                        mode === 'in-person'
                          ? 'حضوری'
                          : mode === 'online'
                          ? 'آنلاین'
                          : 'ترکیبی';
                      const icon =
                        mode === 'in-person'
                          ? '🏢'
                          : mode === 'online'
                          ? '💻'
                          : '🔄';
                      return (
                        <button
                          key={mode}
                          onClick={() => setSelectedMode(mode)}
                          className={cn(
                            'w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right',
                            isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                          )}
                        >
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl flex-shrink-0">
                            {icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-slate-800">
                              {label}
                            </div>
                          </div>
                          <div className="font-black text-blue-800">
                            {formatPrice(price)}
                          </div>
                          <div
                            className={cn(
                              'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                              isSelected
                                ? 'bg-blue-800 border-blue-800'
                                : 'border-slate-300'
                            )}
                          >
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* مرحله ۳ */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-orange-600" />
                    </div>
                    روش پرداخت
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={cn(
                            'w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right',
                            isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                          )}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-blue-800" />
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-slate-800">
                              {method.title}
                            </div>
                            <div className="text-xs text-slate-500">
                              {method.desc}
                            </div>
                          </div>
                          <div
                            className={cn(
                              'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                              isSelected
                                ? 'bg-blue-800 border-blue-800'
                                : 'border-slate-300'
                            )}
                          >
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 p-4 bg-teal-50 border-r-4 border-teal-500 rounded-xl flex items-start gap-2">
                    <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-teal-800">
                      پرداخت شما در بستر امن انجام می‌شود.
                    </p>
                  </div>
                </div>
              )}

              {/* مرحله ۴ */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-800" />
                    </div>
                    تأیید نهایی
                  </h2>
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-50 rounded-2xl">
                      <h3 className="font-black text-slate-800 mb-3">
                        اطلاعات شخصی
                      </h3>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div>👤 {personalInfo.name || '—'}</div>
                        <div>📧 {personalInfo.email || '—'}</div>
                        <div>📱 {personalInfo.phone || '—'}</div>
                      </div>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl">
                      <h3 className="font-black text-slate-800 mb-3">دوره</h3>
                      <div className="font-bold text-slate-800 text-sm mb-1">
                        {course.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {getModeIcon(selectedMode)}{' '}
                        {getModeLabel(selectedMode)}
                      </div>
                    </div>
                    <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 mt-0.5"
                      />
                      <span className="text-sm text-slate-600">
                        قوانین و مقررات سرآمد را می‌پذیرم.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* دکمه‌ها */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                  disabled={step === 1}
                  className={cn(
                    'flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition',
                    step === 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <ArrowRight className="w-4 h-4" />
                  مرحله قبل
                </button>

                {step < 4 ? (
                  <button
                    onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#1e3a8a] to-[#0d9488] text-white rounded-xl font-black hover:shadow-xl transition-all hover:gap-3"
                  >
                    مرحله بعد
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSuccess(true)}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-white bg-gradient-to-l from-teal-500 to-teal-700 hover:shadow-xl transition-all"
                  >
                    <Lock className="w-5 h-5" />
                    پرداخت و تکمیل
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ستون راست */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-24 space-y-4">
              <h3 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-800" />
                خلاصه سفارش
              </h3>
              <div className="flex gap-3 mb-5 pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center text-3xl flex-shrink-0">
                  🎓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-800 line-clamp-2 mb-1">
                    {course.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    {getModeIcon(selectedMode)} {getModeLabel(selectedMode)}
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-5 pb-5 border-b border-slate-100 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">قیمت دوره</span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(currentPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">مالیات (۹٪)</span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(taxAmount)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-slate-800">
                  مبلغ قابل پرداخت
                </span>
                <div className="text-left">
                  <div className="text-2xl font-black text-blue-800">
                    {formatPrice(finalPrice)}
                  </div>
                  <div className="text-xs text-slate-500">تومان</div>
                </div>
              </div>
              <div className="space-y-2.5 pt-5 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  ضمانت بازگشت وجه تا ۷ روز
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  پشتیبانی ۲۴/۷
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  صدور مدرک معتبر
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}