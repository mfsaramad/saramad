import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color?: 'brand' | 'teal' | 'accent' | 'purple';
  trend?: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  color = 'brand',
  trend,
}: StatsCardProps) {
  const colorMap = {
    brand: {
      bg: 'bg-blue-100 dark:bg-blue-950/50',
      icon: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-900',
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-950/50',
      icon: 'text-teal-600 dark:text-teal-300',
      border: 'border-teal-200 dark:border-teal-900',
    },
    accent: {
      bg: 'bg-orange-100 dark:bg-orange-950/50',
      icon: 'text-orange-600 dark:text-orange-300',
      border: 'border-orange-200 dark:border-orange-900',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-950/50',
      icon: 'text-purple-600 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-900',
    },
  };

  const colors = colorMap[color];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center`}
        >
          <Icon className={`w-7 h-7 ${colors.icon}`} />
        </div>

        {trend && (
          <span className="px-2.5 py-1 bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-bold">
            {trend}
          </span>
        )}
      </div>

      <div className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}