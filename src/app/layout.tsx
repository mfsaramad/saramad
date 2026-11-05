import type { Metadata } from 'next';
import  ThemeProvider  from '@/components/theme/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

// ًں‘ˆ ظپظ‚ط· غŒع© ط¨ط§ط± metadata طھط¹ط±غŒظپ ط´ط¯ظ‡ ط§ط³طھ
export const metadata: Metadata = {
  title: 'ط¢ظ…ظˆط²ط´ع¯ط§ظ‡ ط³ط±ط¢ظ…ط¯',
  description: 'ظ…ط¬طھظ…ط¹ ط¢ظ…ظˆط²ط´ ظپظ†غŒ ظˆ ط­ط±ظپظ‡â€Œط§غŒ ط³ط±ط¢ظ…ط¯',
  icons: {
    icon: '/logo.png', // ط¢غŒع©ظˆظ† طھط¨ ظ…ط±ظˆط±ع¯ط±
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="fa" dir="rtl" data-scroll-behavior="smooth" suppressHydrationWarning>
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
