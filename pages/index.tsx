import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      gap: '1rem'
    }}>
      <h1>Welcome to My Weather App</h1>
      <Link href="/weather" style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'background-color 0.2s'
      }}>
        Go to Weather App
      </Link>
      <Link href="/news" style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'background-color 0.2s'
      }}>
        Go to News App
      </Link>
    </div>
    
  );
}