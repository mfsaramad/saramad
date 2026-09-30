import { cn } from '@/lib/utils';

interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'center' | 'right' | 'left';
  titleClassName?: string;
  className?: string;
}

export default function SectionTitle({
  badge,
  title,
  description,
  align = 'center',
  titleClassName,
  className,
}: SectionTitleProps) {
  const alignClass = {
    center: 'text-center mx-auto',
    right: 'text-right',
    left: 'text-left',
  }[align];

  return (
    <div className={cn('mb-12 lg:mb-16', alignClass, className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-800 rounded-full text-sm font-bold mb-4">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl lg:text-4xl font-black text-slate-800 mb-3',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}