/**
 * db.ts — لایه دسترسی به داده
 *
 * ترکیب:
 *   - db.json (داده‌های اولیه)
 *   - localStorage (تغییرات کاربر)
 *
 * نحوه کار:
 *   - خواندن: db.json + تغییرات localStorage
 *   - نوشتن: فقط localStorage (db.json دست‌نخورده می‌مونه)
 */

'use client';

import baseDb from '@/data/db.json';

/* ============================================================
   🔧 تایپ‌ها
   ============================================================ */

export type CollectionName =
  | 'instructors'
  | 'courses'
  | 'testimonials'
  | 'blogPosts'
  | 'branches'
  | 'exams'
  | 'products'
  | 'liveClasses'
  | 'orders'
  | 'users';

export interface DbOverrides {
  // آیتم‌های جدید (اضافه شده توسط کاربر)
  added: Record<CollectionName, any[]>;
  // آیتم‌های ویرایش شده (با id)
  updated: Record<CollectionName, Record<string, any>>;
  // آیتم‌های حذف شده (با id)
  deleted: Record<CollectionName, string[]>;
  // آخرین بروزرسانی
  lastUpdated: string;
}

const STORAGE_KEY = 'saramad_db_overrides';

const emptyOverrides: DbOverrides = {
  added: {
    instructors: [],
    courses: [],
    testimonials: [],
    blogPosts: [],
    branches: [],
    exams: [],
    products: [],
    liveClasses: [],
    orders: [],
    users: [],
  },
  updated: {
    instructors: {},
    courses: {},
    testimonials: {},
    blogPosts: {},
    branches: {},
    exams: {},
    products: {},
    liveClasses: {},
    orders: {},
    users: {},
  },
  deleted: {
    instructors: [],
    courses: [],
    testimonials: [],
    blogPosts: [],
    branches: [],
    exams: [],
    products: [],
    liveClasses: [],
    orders: [],
    users: [],
  },
  lastUpdated: new Date().toISOString(),
};

/* ============================================================
   🔧 خواندن/نوشتن localStorage
   ============================================================ */

export function getOverrides(): DbOverrides {
  if (typeof window === 'undefined') return emptyOverrides;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyOverrides;

    const parsed = JSON.parse(raw);
    // اطمینان از وجود همه کلیدها
    return {
      added: { ...emptyOverrides.added, ...parsed.added },
      updated: { ...emptyOverrides.updated, ...parsed.updated },
      deleted: { ...emptyOverrides.deleted, ...parsed.deleted },
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch {
    return emptyOverrides;
  }
}

export function saveOverrides(overrides: DbOverrides): void {
  if (typeof window === 'undefined') return;
  overrides.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function clearOverrides(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/* ============================================================
   🔧 ترکیب db.json + localStorage
   ============================================================ */

export function getCollection<T = any>(name: CollectionName): T[] {
  // ۱. از db.json
  const base: T[] = (baseDb as any)[name] || [];

  // ۲. overrides
  const overrides = getOverrides();
  const added = overrides.added[name] || [];
  const updated = overrides.updated[name] || {};
  const deleted = overrides.deleted[name] || [];

  // ۳. فیلتر حذف‌شده‌ها
  const filtered = base.filter((item: any) => !deleted.includes(item.id));

  // ۴. اعمال ویرایش‌ها
  const withUpdates = filtered.map((item: any) =>
    updated[item.id] ? { ...item, ...updated[item.id] } : item
  );

  // ۵. اضافه کردن آیتم‌های جدید
  return [...withUpdates, ...added] as T[];
}

/* ============================================================
   🔧 CRUD Operations
   ============================================================ */

/**
 * افزودن آیتم جدید
 */
export function addItem<T extends { id: string }>(
  collection: CollectionName,
  item: Omit<T, 'id'> & { id?: string }
): T {
  const overrides = getOverrides();

  const newItem = {
    ...item,
    id: item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as T;

  overrides.added[collection].push(newItem);
  saveOverrides(overrides);

  return newItem;
}

/**
 * ویرایش آیتم
 */
export function updateItem(
  collection: CollectionName,
  id: string,
  updates: Partial<any>
): boolean {
  const overrides = getOverrides();

  // اگه تو added هست، مستقیم ویرایش کن
  const addedIndex = overrides.added[collection].findIndex(
    (i: any) => i.id === id
  );
  if (addedIndex !== -1) {
    overrides.added[collection][addedIndex] = {
      ...overrides.added[collection][addedIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveOverrides(overrides);
    return true;
  }

  // وگرنه، تو updated بریز
  overrides.updated[collection][id] = {
    ...(overrides.updated[collection][id] || {}),
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveOverrides(overrides);
  return true;
}

/**
 * حذف آیتم
 */
export function deleteItem(
  collection: CollectionName,
  id: string
): boolean {
  const overrides = getOverrides();

  // اگه تو added هست، از اونجا حذف کن
  const addedIndex = overrides.added[collection].findIndex(
    (i: any) => i.id === id
  );
  if (addedIndex !== -1) {
    overrides.added[collection].splice(addedIndex, 1);
    saveOverrides(overrides);
    return true;
  }

  // وگرنه، به deleted اضافه کن
  if (!overrides.deleted[collection].includes(id)) {
    overrides.deleted[collection].push(id);
  }
  saveOverrides(overrides);
  return true;
}

/**
 * بازیابی یک آیتم حذف‌شده
 */
export function restoreItem(
  collection: CollectionName,
  id: string
): boolean {
  const overrides = getOverrides();
  overrides.deleted[collection] = overrides.deleted[collection].filter(
    (i) => i !== id
  );
  saveOverrides(overrides);
  return true;
}

/**
 * ریست کردن همه تغییرات
 */
export function resetAll(): void {
  clearOverrides();
}

/* ============================================================
   ⚙️ Settings (تنظیمات سایت)
   ============================================================ */

const SETTINGS_STORAGE_KEY = 'saramad_settings_overrides';

/**
 * خواندن تنظیمات (db.json + localStorage)
 */
export function getSettings(): any {
  const base = (baseDb as any).settings || {};

  if (typeof window === 'undefined') return base;

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return base;

    const overrides = JSON.parse(raw);
    return {
      ...base,
      ...overrides,
      // merge عمیق برای آبجکت‌های تودرتو
      socials: { ...(base.socials || {}), ...(overrides.socials || {}) },
      seo: { ...(base.seo || {}), ...(overrides.seo || {}) },
    };
  } catch {
    return base;
  }
}

/**
 * بروزرسانی تنظیمات (ذخیره در localStorage)
 */
export function updateSettings(partial: Partial<any>): any {
  if (typeof window === 'undefined') return partial;

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    const current = raw ? JSON.parse(raw) : {};

    const merged = {
      ...current,
      ...partial,
      // merge عمیق
      socials: partial.socials
        ? { ...(current.socials || {}), ...partial.socials }
        : current.socials,
      seo: partial.seo
        ? { ...(current.seo || {}), ...partial.seo }
        : current.seo,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return partial;
  }
}

/**
 * بازگشت تنظیمات به پیش‌فرض db.json
 */
export function resetSettings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
}