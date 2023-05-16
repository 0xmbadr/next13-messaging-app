import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Messanger App',
  description: 'A Real-time Messaging App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
