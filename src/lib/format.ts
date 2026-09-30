export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  return toPersianNumber(price.toLocaleString('en-US')) + ' تومان';
}

export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    const millions = price / 1000000;
    return (
      toPersianNumber(
        millions.toLocaleString('fa-IR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        })
      ) + ' م'
    );
  }
  return toPersianNumber(price.toLocaleString('en-US')) + ' ت';
}

export function formatCount(num: number): string {
  return toPersianNumber(num.toLocaleString('en-US'));
}

export function formatCountShort(num: number): string {
  if (num >= 1000) {
    const thousands = num / 1000;
    return (
      toPersianNumber(
        thousands.toLocaleString('fa-IR', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 1,
        })
      ) + ' هزار'
    );
  }
  return toPersianNumber(num);
}

export function formatDuration(hours: number): string {
  return toPersianNumber(hours) + ' ساعت';
}

export function getModeLabel(mode: 'online' | 'in-person' | 'hybrid'): string {
  const labels = {
    online: 'آنلاین',
    'in-person': 'حضوری',
    hybrid: 'ترکیبی',
  };
  return labels[mode];
}

export function getModeIcon(mode: 'online' | 'in-person' | 'hybrid'): string {
  const icons = {
    online: '💻',
    'in-person': '🏢',
    hybrid: '🔄',
  };
  return icons[mode];
}

export function getModeColor(
  mode: 'online' | 'in-person' | 'hybrid'
): 'brand' | 'accent' | 'teal' {
  const colors = {
    online: 'teal' as const,
    'in-person': 'brand' as const,
    hybrid: 'accent' as const,
  };
  return colors[mode];
}

export function getLevelLabel(
  level: 'beginner' | 'intermediate' | 'advanced'
): string {
  const labels = {
    beginner: 'مقدماتی',
    intermediate: 'متوسط',
    advanced: 'پیشرفته',
  };
  return labels[level];
}