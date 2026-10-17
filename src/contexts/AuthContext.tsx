'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';

export type UserRole = 'user' | 'admin' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapSupabaseUser = (sbUser: any): User => {
    return {
      id: sbUser.id,
      name: sbUser.user_metadata?.name || 'کاربر سرآمد',
      email: sbUser.email || '',
      role: (sbUser.user_metadata?.role as UserRole) || 'user',
    };
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            phone: phone,
          },
        },
      });

      if (error) return { success: false, error: error.message };

      if (data.user) setUser(mapSupabaseUser(data.user));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'خطای غیرمنتظره رخ داد' };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { success: false, error: 'ایمیل یا رمز عبور اشتباه است' };

      let userData = null;
      if (data.user) {
        userData = mapSupabaseUser(data.user);
        setUser(userData);
      }

      return { success: true, user: userData || undefined };
    } catch (err: any) {
      return { success: false, error: err.message || 'خطای غیرمنتظره رخ داد' };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) return { success: false, error: error.message };

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'خطای غیرمنتظره رخ داد' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('خطا در خروج از Supabase:', error);
    } finally {
      setUser(null);

      if (typeof window !== 'undefined') {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('sb-')) {
            localStorage.removeItem(key);
          }
        });
        window.location.href = '/';
      }
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isLoading, 
        isAuthenticated, 
        isAdmin, 
        login, 
        signUp, 
        resetPassword, 
        logout 
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