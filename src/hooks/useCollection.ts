'use client';

import { useEffect, useState } from 'react';
import { getCollection, type CollectionName } from '@/lib/api/db';

/**
 * useCollection — Hook برای خواندن کلکسیون با پشتیبانی از localStorage
 *
 * داده‌های db.json + تغییرات پنل ادمین (localStorage) رو merge می‌کنه.
 * هر بار mount شدن کامپوننت، داده‌های تازه می‌خونه.
 *
 * @example
 * const { data: courses, loading } = useCollection<Course>('courses');
 */
export function useCollection<T = any>(
  name: CollectionName
): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const items = getCollection<T>(name);
    setData(items);
    setLoading(false);
  }, [name]);

  return { data, loading };
}