'use client';

import { useEffect, useState } from 'react';
import {
  Settings as SettingsIcon,
  Globe,
  Phone,
  Share2,
  Search,
  Save,
  RotateCcw,
  Check,
  Instagram,
  Send,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';
import {
  getSettings,
  updateSettings,
  resetSettings,
} from '@/lib/api/db';

/* ============================================================
   📦 تایپ‌ها
   ============================================================ */

interface SettingsData {
  siteName: string;
  siteDescription: string;
  logo: string;
  logoWhite: string;
  favicon: string;
  phone: string;
  email: string;
  address: string;
  socials: {
    instagram: string;
    telegram: string;
    linkedin: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  updatedAt?: string;
}

type TabId = 'general' | 'contact' | 'socials' | 'seo';

/* ============================================================
   🎯 کامپوننت اصلی
   ============================================================ */

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [originalSettings, setOriginalSettings] = useState<SettingsData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // بارگذاری تنظیمات
  useEffect(() => {
    setMounted(true);
    const data = getSettings() as SettingsData;
    setSettings(data);
    setOriginalSettings(JSON.parse(JSON.stringify(data)));
  }, []);

  // بررسی تغییرات
  const hasChanges =
    settings && originalSettings
      ? JSON.stringify(settings) !== JSON.stringify(originalSettings)
      : false;

  // ذخیره
  const handleSave = () => {
    if (!settings) return;
    updateSettings(settings);
    setOriginalSettings(JSON.parse(JSON.stringify(settings)));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // بازگشت به پیش‌فرض
  const handleReset = () => {
    if (!confirm('آیا از بازگشت به تنظیمات پیش‌فرض مطمئن هستید؟')) return;
    resetSettings();
    const fresh = getSettings() as SettingsData;
    setSettings(fresh);
    setOriginalSettings(JSON.parse(JSON.stringify(fresh)));
  };

  // آپدیت فیلد
  const updateField = (path: string, value: any) => {
    if (!settings) return;
    const keys = path.split('.');
    const newSettings = JSON.parse(JSON.stringify(settings));

    let obj: any = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;

    setSettings(newSettings);
  };

  if (!mounted || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* هدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-7 h-7 text-brand" />
            تنظیمات سایت
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            پیکربندی اطلاعات عمومی، تماس و SEO سایت
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* بازگشت به پیش‌فرض */}
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            پیش‌فرض
          </button>

          {/* ذخیره */}
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
              saved
                ? 'bg-green-600 text-white'
                : hasChanges
                ? 'bg-brand text-white hover:bg-brand/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                ذخیره شد
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                ذخیره تغییرات
              </>
            )}
          </button>
        </div>
      </div>

      {/* هشدار تغییرات ذخیره‌نشده */}
      {hasChanges && (
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>تغییرات ذخیره‌نشده دارید. فراموش نکنید ذخیره کنید.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* تب‌ها */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-2 space-y-1 sticky top-4">
            <TabItem
              icon={<Globe className="w-4 h-4" />}
              label="عمومی"
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
            <TabItem
              icon={<Phone className="w-4 h-4" />}
              label="تماس"
              active={activeTab === 'contact'}
              onClick={() => setActiveTab('contact')}
            />
            <TabItem
              icon={<Share2 className="w-4 h-4" />}
              label="شبکه‌های اجتماعی"
              active={activeTab === 'socials'}
              onClick={() => setActiveTab('socials')}
            />
            <TabItem
              icon={<Search className="w-4 h-4" />}
              label="SEO"
              active={activeTab === 'seo'}
              onClick={() => setActiveTab('seo')}
            />

            {/* آخرین بروزرسانی */}
            {settings.updatedAt && (
              <div className="pt-3 mt-3 border-t border-border px-3 pb-2">
                <p className="text-xs text-muted-foreground">
                  آخرین بروزرسانی:
                </p>
                <p className="text-xs font-medium mt-1" dir="ltr">
                  {new Date(settings.updatedAt).toLocaleString('fa-IR')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* محتوا */}
        <div className="lg:col-span-3 space-y-6">
          {/* تب عمومی */}
          {activeTab === 'general' && (
            <Card title="اطلاعات عمومی" icon={<Globe className="w-5 h-5" />}>
              <Field label="نام سایت" hint="نام کامل آموزشگاه">
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => updateField('siteName', e.target.value)}
                  className="input-field"
                  placeholder="مثلاً: آموزشگاه سرآمد"
                />
              </Field>

              <Field
                label="توضیحات سایت"
                hint="توضیح کوتاه که در هدر/فوتر نمایش داده می‌شود"
              >
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) =>
                    updateField('siteDescription', e.target.value)
                  }
                  rows={3}
                  className="input-field resize-none"
                  placeholder="پلتفرم آموزشی سرآمد — دوره‌ها، آزمون‌ها و اساتید"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="لوگو" hint="مسیر فایل لوگو (روشن)">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      {settings.logo ? (
                        <img
                          src={settings.logo}
                          alt="logo"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={settings.logo}
                      onChange={(e) => updateField('logo', e.target.value)}
                      className="input-field flex-1"
                      placeholder="/logo.png"
                      dir="ltr"
                    />
                  </div>
                </Field>

                <Field
                  label="لوگو (تیره)"
                  hint="مسیر لوگوی مناسب دارک مود"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      {settings.logoWhite ? (
                        <img
                          src={settings.logoWhite}
                          alt="logoWhite"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={settings.logoWhite}
                      onChange={(e) =>
                        updateField('logoWhite', e.target.value)
                      }
                      className="input-field flex-1"
                      placeholder="/logo-white.png"
                      dir="ltr"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Favicon" hint="آیکون کوچک سایت">
                <input
                  type="text"
                  value={settings.favicon}
                  onChange={(e) => updateField('favicon', e.target.value)}
                  className="input-field"
                  placeholder="/favicon.ico"
                  dir="ltr"
                />
              </Field>
            </Card>
          )}

          {/* تب تماس */}
          {activeTab === 'contact' && (
            <Card title="اطلاعات تماس" icon={<Phone className="w-5 h-5" />}>
              <Field label="شماره تماس" hint="شماره اصلی آموزشگاه">
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="input-field pr-10"
                    placeholder="۰۹۳۶۲۸۴۷۹۲۲"
                  />
                </div>
              </Field>

              <Field label="ایمیل" hint="ایمیل رسمی آموزشگاه">
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="input-field pr-10"
                    placeholder="info@saramad.ir"
                    dir="ltr"
                  />
                </div>
              </Field>

              <Field label="آدرس" hint="آدرس فیزیکی شعبه اصلی">
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                  <textarea
                    value={settings.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    rows={3}
                    className="input-field pr-10 resize-none"
                    placeholder="تبریز، خیابان بهار، ..."
                  />
                </div>
              </Field>
            </Card>
          )}

          {/* تب شبکه‌های اجتماعی */}
          {activeTab === 'socials' && (
            <Card
              title="شبکه‌های اجتماعی"
              icon={<Share2 className="w-5 h-5" />}
            >
              <p className="text-sm text-muted-foreground mb-4">
                آدرس صفحات رسمی آموزشگاه در شبکه‌های اجتماعی. خالی بگذارید
                تا نمایش داده نشود.
              </p>

              <SocialField
                icon={<Instagram className="w-4 h-4" />}
                label="اینستاگرام"
                value={settings.socials?.instagram || ''}
                onChange={(v) => updateField('socials.instagram', v)}
                placeholder="https://instagram.com/saramad"
              />

              <SocialField
                icon={<Send className="w-4 h-4" />}
                label="تلگرام"
                value={settings.socials?.telegram || ''}
                onChange={(v) => updateField('socials.telegram', v)}
                placeholder="https://t.me/saramad"
              />

              <SocialField
                icon={<Linkedin className="w-4 h-4" />}
                label="لینکدین"
                value={settings.socials?.linkedin || ''}
                onChange={(v) => updateField('socials.linkedin', v)}
                placeholder="https://linkedin.com/company/saramad"
              />

              <SocialField
                icon={<Youtube className="w-4 h-4" />}
                label="یوتیوب"
                value={settings.socials?.youtube || ''}
                onChange={(v) => updateField('socials.youtube', v)}
                placeholder="https://youtube.com/@saramad"
              />
            </Card>
          )}

          {/* تب SEO */}
          {activeTab === 'seo' && (
            <Card title="تنظیمات SEO" icon={<Search className="w-5 h-5" />}>
              <p className="text-sm text-muted-foreground mb-4">
                این اطلاعات در نتایج جستجوی گوگل و پیش‌نمایش شبکه‌های
                اجتماعی نمایش داده می‌شود.
              </p>

              <Field label="عنوان SEO" hint="بهترین طول: ۵۰-۶۰ کاراکتر">
                <input
                  type="text"
                  value={settings.seo?.title || ''}
                  onChange={(e) => updateField('seo.title', e.target.value)}
                  className="input-field"
                  placeholder="آموزشگاه سرآمد"
                />
                <CharacterCount
                  value={settings.seo?.title || ''}
                  max={60}
                />
              </Field>

              <Field
                label="توضیحات SEO"
                hint="بهترین طول: ۱۲۰-۱۶۰ کاراکتر"
              >
                <textarea
                  value={settings.seo?.description || ''}
                  onChange={(e) =>
                    updateField('seo.description', e.target.value)
                  }
                  rows={3}
                  className="input-field resize-none"
                  placeholder="بهترین دوره‌های آموزشی در تبریز"
                />
                <CharacterCount
                  value={settings.seo?.description || ''}
                  max={160}
                />
              </Field>

              <Field
                label="کلمات کلیدی"
                hint="با کاما (,) جدا کنید"
              >
                <input
                  type="text"
                  value={(settings.seo?.keywords || []).join(', ')}
                  onChange={(e) =>
                    updateField(
                      'seo.keywords',
                      e.target.value
                        .split(',')
                        .map((k) => k.trim())
                        .filter(Boolean)
                    )
                  }
                  className="input-field"
                  placeholder="آموزشگاه, تبریز, دوره, آموزش"
                />
                {(settings.seo?.keywords || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(settings.seo?.keywords || []).map((k, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-brand/10 text-brand"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </Field>
            </Card>
          )}
        </div>
      </div>

      {/* استایل input-field */}
      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          font-size: 0.875rem;
          transition: all 0.15s;
          outline: none;
        }
        .input-field:focus {
          border-color: hsl(var(--brand, 220 90% 56%));
          box-shadow: 0 0 0 3px hsl(var(--brand, 220 90% 56%) / 0.15);
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   🧩 کامپوننت‌های فرعی
   ============================================================ */

function TabItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-brand text-white'
          : 'text-muted-foreground hover:bg-muted'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <div className="p-2 rounded-lg bg-brand/10 text-brand">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {hint && (
        <p className="text-xs text-muted-foreground mb-2">{hint}</p>
      )}
      {children}
    </div>
  );
}

function SocialField({
  icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
        {icon}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        placeholder={placeholder}
        dir="ltr"
      />
    </div>
  );
}

function CharacterCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const isOver = len > max;
  const isWarning = len > max * 0.9 && !isOver;

  return (
    <div className="flex justify-end mt-1">
      <span
        className={`text-xs ${
          isOver
            ? 'text-red-600'
            : isWarning
            ? 'text-amber-600'
            : 'text-muted-foreground'
        }`}
      >
        {len.toLocaleString('fa-IR')} / {max.toLocaleString('fa-IR')}
      </span>
    </div>
  );
}