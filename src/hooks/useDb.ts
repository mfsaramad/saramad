'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  resetAll,
  type CollectionName,
} from '@/lib/api/db';

/**
 * Hook برای مدیریت داده‌ها
 * 
 * استفاده:
 *   const { items, add, update, remove, refresh } = useDb('courses');
 */
export function useDb<T extends { id: string }>(collection: CollectionName) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setItems(getCollection<T>(collection));
  }, [collection]);

  useEffect(() => {
    refresh();
    setIsLoading(false);
  }, [refresh]);

  const add = useCallback(
    (item: Omit<T, 'id'> & { id?: string }) => {
      const created = addItem<T>(collection, item);
      refresh();
      return created;
    },
    [collection, refresh]
  );

  const update = useCallback(
    (id: string, updates: Partial<T>) => {
      const result = updateItem(collection, id, updates);
      refresh();
      return result;
    },
    [collection, refresh]
  );

  const remove = useCallback(
    (id: string) => {
      const result = deleteItem(collection, id);
      refresh();
      return result;
    },
    [collection, refresh]
  );

  const reset = useCallback(() => {
    resetAll();
    refresh();
  }, [refresh]);

  return {
    items,
    isLoading,
    add,
    update,
    remove,
    reset,
    refresh,
  };
}