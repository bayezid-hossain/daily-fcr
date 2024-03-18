import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Daily FCR Calculator',
  description: 'Created and Maintained by ShadowIT Inc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster position="top-center" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
