import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProtectedRoute requireAdmin={true}>
          {children}
        </ProtectedRoute>
      </div>
    </div>
  );
}