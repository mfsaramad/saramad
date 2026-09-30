'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          fontFamily: 'Vazirmatn, Arial, sans-serif',
          background:
            'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0d9488 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          margin: 0,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px' }}>
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              margin: '0 0 20px',
              background:
                'linear-gradient(135deg, #ffffff 0%, #2dd4bf 50%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ۵۰۰
          </h1>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 900,
              marginBottom: '16px',
            }}
          >
            خطای غیرمنتظره‌ای رخ داد
          </h2>
          <p
            style={{
              color: '#dbeafe',
              marginBottom: '32px',
              lineHeight: 1.8,
            }}
          >
            متأسفانه مشکلی پیش اومده. لطفاً دوباره تلاش کن.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '14px 32px',
              background: 'white',
              color: '#1e3a8a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            تلاش مجدد
          </button>
        </div>
      </body>
    </html>
  );
}