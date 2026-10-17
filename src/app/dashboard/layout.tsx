import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* سایدبار داشبورد */}
          <aside className="lg:col-span-1">
            <DashboardSidebar />
          </aside>
          
          {/* محتوای اصلی که محافظت شده است */}
          <main className="lg:col-span-3">
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </main>

        </div>
      </div>
    </div>
  );
}