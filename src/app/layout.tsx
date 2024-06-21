import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ThemeProvider, CssBaseline, Box} from '@mui/material';
import theme from '@/theme/theme';
import {Navbar} from '@/components/navbar';
import {Sidebar} from '@/components/sidebar';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Providers} from './Providers';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Baul Privado',
  description: 'Creado por samd3v',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </head>

      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
