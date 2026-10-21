import type { Metadata } from 'next';
import  ThemeProvider  from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

// 👈 فقط یک بار metadata تعریف شده است
export const metadata: Metadata = {
  title: 'آموزشگاه سرآمد',
  description: 'مجتمع آموزش فنی و حرفه‌ای سرآمد',
  icons: {
    icon: '/logo.png', // آیکون تب مرورگر
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}