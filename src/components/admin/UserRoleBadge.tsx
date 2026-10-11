'use client';

import {
  Shield,
  GraduationCap,
  User as UserIcon,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================
   🎨 انواع نقش کاربر
   ============================================================ */

export type UserRole = 'admin' | 'instructor' | 'user';

interface RoleConfig {
  label: string;
  icon: LucideIcon;
  className: string;
}

const ROLE_CONFIG: Record<UserRole, RoleConfig> = {
  admin: {
    label: 'مدیر',
    icon: Shield,
    className:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  instructor: {
    label: 'استاد',
    icon: GraduationCap,
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  user: {
    label: 'دانشجو',
    icon: UserIcon,
    className:
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  },
};

/* ============================================================
   🏷️ کامپوننت Badge
   ============================================================ */

interface UserRoleBadgeProps {
  role: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export function UserRoleBadge({
  role,
  size = 'md',
  showIcon = true,
}: UserRoleBadgeProps) {
  const config = ROLE_CONFIG[role as UserRole] || ROLE_CONFIG.user;
  const Icon = config.icon;

  const sizeClasses =
    size === 'sm'
      ? 'text-xs px-2 py-0.5 gap-1'
      : 'text-sm px-2.5 py-1 gap-1.5';

  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full whitespace-nowrap ${sizeClasses} ${config.className}`}
    >
      {showIcon && <Icon size={iconSize} />}
      {config.label}
    </span>
  );
}

/* ============================================================
   📋 لیست نقش‌ها برای استفاده در dropdown
   ============================================================ */

export const USER_ROLE_OPTIONS: {
  value: UserRole;
  label: string;
}[] = [
  { value: 'admin', label: 'مدیر' },
  { value: 'instructor', label: 'استاد' },
  { value: 'user', label: 'دانشجو' },
];