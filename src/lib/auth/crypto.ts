export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// ─────────────────────────────────────────────
// Token
// ─────────────────────────────────────────────

const TOKEN_SECRET = 'saramad-secret-2025-change-me';

/**
 * ساخت توکن امضاشده با userId
 */
export function generateToken(userId: string): string {
  const payload = `${userId}.${Date.now()}.${Math.random()
    .toString(36)
    .slice(2)}`;
  const signature = simpleHash(payload + TOKEN_SECRET);
  return `${payload}.${signature}`;
}

/**
 * تأیید توکن
 */
export function verifyToken(token: string, userId: string): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length < 4) return false;

  const signature = parts[parts.length - 1];
  const payload = parts.slice(0, -1).join('.');

  if (!payload.startsWith(userId + '.')) return false;

  const expected = simpleHash(payload + TOKEN_SECRET);
  return signature === expected;
}

/**
 * hash ساده (همگام) برای امضای توکن
 */
function simpleHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}