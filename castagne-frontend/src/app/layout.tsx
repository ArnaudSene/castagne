import type { Metadata } from 'next';
import AppWalletProvider from './components/AppWalletProvider';
import { AppProvider } from './contexts/appContext';
import { BattleProvider } from './contexts/battleContext';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <AppProvider>
            <BattleProvider>{children}</BattleProvider>
          </AppProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
