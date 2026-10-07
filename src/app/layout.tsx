import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/theme/ThemeProvider';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

export const metadata: Metadata = {
  title: 'آموزشگاه سرآمد',
  description: 'پلتفرم آموزشی سرآمد — دوره‌ها، آزمون‌ها و اساتید',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <NotificationsProvider>
                  <ConditionalLayout>{children}</ConditionalLayout>
                </NotificationsProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}