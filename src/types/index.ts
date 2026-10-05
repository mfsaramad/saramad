export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled' | 'refunded';

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