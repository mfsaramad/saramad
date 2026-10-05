// ============================================
// Cart
// ============================================
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  type?: 'course' | 'exam' | 'product';
}

// ============================================
// Orders
// ============================================
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  title: string;
  type: 'course' | 'exam' | 'product';
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod?: 'zarinpal' | 'idpay' | 'wallet';
  trackingCode?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Wishlist
// ============================================
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

// ============================================
// Notifications
// ============================================
export type NotificationType =
  | 'order'
  | 'course'
  | 'exam'
  | 'system'
  | 'promo'
  | 'certificate';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  priority?: 'low' | 'normal' | 'high';
}