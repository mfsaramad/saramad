'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { verifyPassword, generateToken, verifyToken } from '@/lib/auth/crypto';
import {
  USERS,
  SESSION_DURATION,
  ACTIVITY_REFRESH_THRESHOLD,
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_DURATION,
  STORAGE_KEYS,
} from '@/lib/auth/constants';

export type UserRole = 'user' | 'admin' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface Session {
  user: User;
  token: string;
  expiresAt: number;
  createdAt: number;
}

interface LoginAttempts {
  count: number;
  lockedUntil: number | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  login: (
    email: string,
    password: string,
    remember?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = STORAGE_KEYS.SESSION;
const ATTEMPTS_KEY = STORAGE_KEYS.LOGIN_ATTEMPTS;

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── بارگذاری session ──
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(SESSION_KEY) ??
        sessionStorage.getItem(SESSION_KEY);

      const session = safeParse<Session>(raw);

      if (session && session.expiresAt > Date.now()) {
        const tokenValid = verifyToken(session.token, session.user.id);
        if (tokenValid) {
          setUser(session.user);
        } else {
          localStorage.removeItem(SESSION_KEY);
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  // ── تمدید session ──
  const refreshSession = useCallback(() => {
    const raw =
      localStorage.getItem(SESSION_KEY) ??
      sessionStorage.getItem(SESSION_KEY);

    const session = safeParse<Session>(raw);
    if (!session || !user) return;

    const timeLeft = session.expiresAt - Date.now();

    if (timeLeft < ACTIVITY_REFRESH_THRESHOLD && timeLeft > 0) {
      const updated: Session = {
        ...session,
        expiresAt: Date.now() + SESSION_DURATION,
      };

      const storage = localStorage.getItem(SESSION_KEY)
        ? localStorage
        : sessionStorage;

      storage.setItem(SESSION_KEY, JSON.stringify(updated));
    }
  }, [user]);

  // ── چک خودکار انقضا (هر ۳۰ ثانیه) ──
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const raw =
        localStorage.getItem(SESSION_KEY) ??
        sessionStorage.getItem(SESSION_KEY);

      const session = safeParse<Session>(raw);

      if (!session || session.expiresAt <= Date.now()) {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  // ── همگام‌سازی بین تب‌ها ──
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== SESSION_KEY) return;

      if (!e.newValue) {
        setUser(null);
      } else {
        const session = safeParse<Session>(e.newValue);
        if (session && session.expiresAt > Date.now()) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // ── Login ──
  const login = async (
    email: string,
    password: string,
    remember = false
  ): Promise<{ success: boolean; error?: string }> => {
    // چک lockout
    const attempts = safeParse<LoginAttempts>(
      localStorage.getItem(ATTEMPTS_KEY)
    );

    if (attempts?.lockedUntil && attempts.lockedUntil > Date.now()) {
      const remaining = Math.ceil(
        (attempts.lockedUntil - Date.now()) / 1000 / 60
      );
      return {
        success: false,
        error: `حساب موقتاً قفل شده. ${remaining} دقیقه دیگه تلاش کن.`,
      };
    }

    await new Promise((r) => setTimeout(r, 400));

    const found = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      registerFailedAttempt();
      return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
    }

    const isValid = await verifyPassword(password, found.passwordHash);
    if (!isValid) {
      registerFailedAttempt();
      return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
    }

    // پاک کردن تلاش‌های ناموفق
    localStorage.removeItem(ATTEMPTS_KEY);

    const userData: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    const session: Session = {
      user: userData,
      token: generateToken(found.id),
      expiresAt: Date.now() + SESSION_DURATION,
      createdAt: Date.now(),
    };

    const storage = remember ? localStorage : sessionStorage;

    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);

    storage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(userData);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isAdmin,
        isInstructor,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

function registerFailedAttempt() {
  const attempts = safeParse<LoginAttempts>(
    localStorage.getItem(ATTEMPTS_KEY)
  ) ?? { count: 0, lockedUntil: null };

  const newCount = attempts.count + 1;

  if (newCount >= MAX_LOGIN_ATTEMPTS) {
    localStorage.setItem(
      ATTEMPTS_KEY,
      JSON.stringify({
        count: newCount,
        lockedUntil: Date.now() + LOCKOUT_DURATION,
      })
    );
  } else {
    localStorage.setItem(
      ATTEMPTS_KEY,
      JSON.stringify({ count: newCount, lockedUntil: null })
    );
  }
}