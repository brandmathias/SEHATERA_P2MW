'use client';

import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Sembunyikan footer pada halaman dashboard dan komunikasi
  if (
    pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/video-call') || 
    pathname?.startsWith('/voice-call') ||
    pathname?.startsWith('/chat')
  ) {
    return null;
  }

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SEHATERA. Hak cipta dilindungi.
        </p>
        <p className="text-xs mt-2">
          Dibuat dengan sepenuh hati untuk para lansia tercinta.
        </p>
      </div>
    </footer>
  );
}
