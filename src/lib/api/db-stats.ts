'use client';

import { getOverrides } from './db';

export interface DbStats {
  added: number;
  updated: number;
  deleted: number;
  lastUpdated: string | null;
}

export function getDbStats(): DbStats {
  const overrides = getOverrides();

  let added = 0;
  let updated = 0;
  let deleted = 0;

  Object.keys(overrides.added).forEach((key) => {
    added += (overrides.added as any)[key].length;
    updated += Object.keys((overrides.updated as any)[key]).length;
    deleted += (overrides.deleted as any)[key].length;
  });

  return {
    added,
    updated,
    deleted,
    lastUpdated: overrides.lastUpdated,
  };
}