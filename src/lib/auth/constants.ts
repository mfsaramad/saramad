export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'instructor';
  passwordHash: string;
}

export const USERS: AuthUser[] = [
  {
    id: 'u1',
    name: 'مدیر سیستم',
    email: 'admin@saramad.ir',
    role: 'admin',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  },
  {
    id: 'u2',
    name: 'علی رضایی',
    email: 'user@saramad.ir',
    role: 'user',
    passwordHash: 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446',
  },
];

export const SESSION_DURATION = 2 * 60 * 60 * 1000; // ۲ ساعت
export const ACTIVITY_REFRESH_THRESHOLD = 5 * 60 * 1000; // ۵ دقیقه
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 5 * 60 * 1000; // ۵ دقیقه

export const STORAGE_KEYS = {
  SESSION: 'saramad_session',
  LOGIN_ATTEMPTS: 'saramad_login_attempts',
} as const;