'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth/crypto';
import {
  USERS,
  SESSION_DURATION,
  STORAGE_KEYS,
  type AuthUser,
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
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Session رو از هر دو storage می‌خونه
 * (چون Remember Me ممکنه توی localStorage باشه)
 */
function readSession(): Session | null {
  if (typeof window === 'undefined') return null;

  try {
    // اول localStorage (Remember Me)
    const raw =
      localStorage.getItem(STORAGE_KEYS.SESSION) ||
      sessionStorage.getItem(STORAGE_KEYS.SESSION);

    if (!raw) return null;

    const session: Session = JSON.parse(raw);

    // چک انقضا
    if (session.expiresAt <= Date.now()) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // بارگذاری اولیه session
  useEffect(() => {
    const session = readSession();
    if (session) setUser(session.user);
    setIsLoading(false);
  }, []);

  // چک خودکار انقضا (هر ۱ دقیقه)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const session = readSession();
      if (!session) {
        setUser(null);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    // شبیه‌سازی تأخیر شبکه
    await new Promise((r) => setTimeout(r, 400));

    // پیدا کردن کاربر
    const found = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
    }

    // تأیید رمز عبور
    const isValid = await verifyPassword(password, found.passwordHash);
    if (!isValid) {
      return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };
    }

    // ساخت session
    const userData: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    const session: Session = {
      user: userData,
      token: generateToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    };

    // انتخاب storage بر اساس Remember Me
    // - Remember Me: localStorage (با بستن مرورگر پاک نمیشه)
    // - بدون Remember Me: sessionStorage (با بستن مرورگر پاک میشه)
    const storage = rememberMe ? localStorage : sessionStorage;

    // پاک کردن storage دیگه برای جلوگیری از تداخل
    const otherStorage = rememberMe ? sessionStorage : localStorage;
    otherStorage.removeItem(STORAGE_KEYS.SESSION);

    storage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    setUser(userData);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, isAdmin, login, logout }}
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