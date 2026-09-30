import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'accent' | 'teal' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'brand',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    brand: 'bg-brand-100 text-brand-800',
    accent: 'bg-orange-100 text-orange-700',
    teal: 'bg-teal-100 text-teal-700',
    gray: 'bg-slate-100 text-slate-700',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-bold',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}