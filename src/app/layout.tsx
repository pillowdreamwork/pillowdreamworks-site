import './globals.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PillowDreamWorks Foundation',
  description: 'Premium editorial psychology platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-background text-text antialiased'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

