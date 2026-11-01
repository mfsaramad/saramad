'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasPermission: (permission: string) => boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapSupabaseUser = async (sbUser: any): Promise<User> => {
    try {
      const { data: userRoleData } = await supabase
        .from('user_roles')
        .select(`role_id, roles (name)`)
        .eq('user_id', sbUser.id)
        .maybeSingle();

      const roleName = userRoleData?.roles?.name || 'student';
      const roleId = userRoleData?.role_id;

      let permissionsList: string[] = [];
      if (roleId) {
        const { data: permData } = await supabase
          .from('role_permissions')
          .select(`permissions (name)`)
          .eq('role_id', roleId);

        if (permData) {
          permissionsList = permData.map((p: any) => p.permissions.name);
        }
      }

      return {
        id: sbUser.id,
        name: sbUser.user_metadata?.name || 'کاربر سرآمد',
        email: sbUser.email || '',
        role: roleName,
        permissions: permissionsList,
      };
    } catch (err) {
      console.error('خطا در خواندن نقش:', err);
      return {
        id: sbUser.id,
        name: 'کاربر سرآمد',
        email: sbUser.email || '',
        role: 'student',
        permissions: [],
      };
    }
  };

  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const mappedUser = await mapSupabaseUser(session.user);
      setUser(mappedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const mappedUser = await mapSupabaseUser(session.user);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const mappedUser = await mapSupabaseUser(session.user);
          setUser(mappedUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

    const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) return { success: false, error: error.message };

      if (data?.user) {
        const userData = await mapSupabaseUser(data.user);
        setUser(userData);

        // 🚀 استثنا: اگر ایمیل ادمین بود، حتماً به پنل ادمین برو
        if (email === 'admin@saramad.ir') {
          window.location.href = '/admin';
          return { success: true, user: userData };
        }

        // در غیر این صورت بر اساس دسترسی‌ها هدایت کن
        if (userData.permissions.includes('view_admin_panel')) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'کاربر یافت نشد' };
    } catch (err: any) {
      return { success: false, error: err.message || 'خطای غیرمنتظره در ورود' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('خطا در خروج:', error);
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('sb-')) localStorage.removeItem(key);
        });
        window.location.href = '/login';
      }
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.permissions.includes('view_admin_panel') || false;
  const hasPermission = (permission: string) => user?.permissions.includes(permission) || false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAdmin, hasPermission, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

