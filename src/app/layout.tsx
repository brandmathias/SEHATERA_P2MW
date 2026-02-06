
import { Alegreya, Belleza } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/layout/AppProviders';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

const belleza = Belleza({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-belleza',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-alegreya',
});

export const metadata = {
  title: 'SEHATERA - Pendampingan untuk Hari yang Lebih Cerah',
  description: 'Menghubungkan para lansia dengan pendamping yang penuh kasih dan konten yang menarik.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(
        belleza.variable, 
        alegreya.variable
      )} suppressHydrationWarning>
      <head />
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <AppProviders>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
