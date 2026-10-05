import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorMap = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
}: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg transition">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              isPositive
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change).toLocaleString('fa-IR')}٪
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {typeof value === 'number' ? value.toLocaleString('fa-IR') : value}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {title}
        </div>
      </div>
    </div>
  );
}