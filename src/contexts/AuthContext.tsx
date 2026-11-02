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

        if (permData) permissionsList = permData.map((p: any) => p.permissions.name);
      }

      const { data: directPermsData } = await supabase
        .from('user_permissions')
        .select(`permissions (name)`)
        .eq('user_id', sbUser.id);

      if (directPermsData) {
        const directPerms = directPermsData.map((p: any) => p.permissions.name);
        permissionsList = Array.from(new Set([...permissionsList, ...directPerms]));
      }

      return {
        id: sbUser.id,
        name: sbUser.user_metadata?.name || 'ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ± ط·آ³ط·آ±ط·آ¢ط¸â€¦ط·آ¯',
        email: sbUser.email || '',
        role: roleName,
        permissions: permissionsList,
      };
    } catch (err) {
      return { id: sbUser.id, name: 'ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ±', email: sbUser.email || '', role: 'student', permissions: [] };
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser(await mapSupabaseUser(session.user));
      setIsLoading(false);
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) setUser(await mapSupabaseUser(session.user));
      else setUser(null);
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };

      if (data?.user) {
        const userData = await mapSupabaseUser(data.user);
        setUser(userData);

        // ط¸â€،ط·آ¯ط·آ§ط؛إ’ط·ع¾ ط¸â€،ط¸ث†ط·آ´ط¸â€¦ط¸â€ ط·آ¯ ط·آ¨ط·آ± ط·آ§ط·آ³ط·آ§ط·آ³ ط¸â€ ط¸â€ڑط·آ´
        if (userData.permissions.includes('view_admin_panel')) {
          window.location.href = '/admin';
        } else if (userData.role === 'instructor') {
          window.location.href = '/instructor'; // ط¸â€،ط·آ¯ط·آ§ط؛إ’ط·ع¾ ط·آ§ط·آ³ط·ع¾ط·آ§ط·آ¯ ط·آ¨ط¸â€، ط¸آ¾ط¸â€ ط¸â€‍ ط·آ§ط·آ®ط·ع¾ط·آµط·آ§ط·آµط؛إ’
        } else {
          window.location.href = '/dashboard';
        }
        return { success: true, user: userData };
      }
      return { success: false, error: 'ط¹آ©ط·آ§ط·آ±ط·آ¨ط·آ± ط؛إ’ط·آ§ط¸ظ¾ط·ع¾ ط¸â€ ط·آ´ط·آ¯' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('sb-')) localStorage.removeItem(key);
      });
      window.location.href = '/login';
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.permissions.includes('view_admin_panel') || false;
  const hasPermission = (permission: string) => user?.permissions.includes(permission) || false;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAdmin, hasPermission, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}