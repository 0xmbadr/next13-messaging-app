import './globals.css';
import ToasterContext from './context/ToastContext';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';

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
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
