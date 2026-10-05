export type WishlistItemType = 'course' | 'exam' | 'product';

export interface WishlistItem {
  id: string;
  type: WishlistItemType;
  title: string;
  slug: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  instructor?: string;
  duration?: string;
  addedAt: string;
}