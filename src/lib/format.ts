export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  const safePrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  return toPersianNumber(safePrice.toLocaleString('en-US')) + ' تومان';
}

export function formatPriceShort(price: number): string {
  const safePrice = typeof price === 'number' && !isNaN(price) ? price : 0;
  if (safePrice >= 1000000) {
    const millions = safePrice / 1000000;
    return toPersianNumber(millions.toLocaleString('fa-IR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })) + ' م';
  }
  return toPersianNumber(safePrice.toLocaleString('en-US')) + ' ت';
}

export function formatCount(num: number): string {
  const safeNum = typeof num === 'number' && !isNaN(num) ? num : 0;
  return toPersianNumber(safeNum.toLocaleString('en-US'));
}

export function formatCountShort(num: number): string {
  const safeNum = typeof num === 'number' && !isNaN(num) ? num : 0;
  if (safeNum >= 1000) {
    const thousands = safeNum / 1000;
    return toPersianNumber(thousands.toLocaleString('fa-IR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })) + ' هزار';
  }
  return toPersianNumber(safeNum);
}

export function formatDuration(hours: number): string {
  const safeHours = typeof hours === 'number' && !isNaN(hours) ? hours : 0;
  return toPersianNumber(safeHours) + ' ساعت';
}

export function getModeLabel(mode: 'online' | 'in-person' | 'hybrid'): string {
  const labels = { online: 'آنلاین', 'in-person': 'حضوری', hybrid: 'ترکیبی' };
  return labels[mode] || 'نامشخص';
}

export function getModeIcon(mode: 'online' | 'in-person' | 'hybrid'): string {
  const icons = { online: '💻', 'in-person': '🏢', hybrid: '🔄' };
  return icons[mode] || '📚';
}

export function getModeColor(mode: 'online' | 'in-person' | 'hybrid'): 'brand' | 'accent' | 'teal' {
  const colors = { online: 'teal' as const, 'in-person': 'brand' as const, hybrid: 'accent' as const };
  return colors[mode] || 'brand';
}

export function getLevelLabel(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const labels = { beginner: 'مقدماتی', intermediate: 'متوسط', advanced: 'پیشرفته' };
  return labels[level] || 'نامشخص';
}
