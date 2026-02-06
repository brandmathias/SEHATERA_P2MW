'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { UserNav } from './UserNav';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { CustomThemeToggle } from './CustomThemeToggle';

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  // Sembunyikan header pada halaman komunikasi dan dashboard agar sesuai desain
  if (
    pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/video-call') || 
    pathname?.startsWith('/voice-call') ||
    pathname?.startsWith('/chat')
  ) {
    return null;
  }

  // Tampilkan menu Layanan & Komunitas hanya untuk pengguna lansia yang login
  const navLinks = (isAuthenticated && user?.role === 'elderly') 
    ? [
        { href: '/', label: 'Beranda' },
        { href: '/sessions/book', label: 'Layanan' },
        { href: '/community', label: 'Komunitas' },
      ]
    : [
        { href: '/', label: 'Beranda' },
        { href: '/help', label: 'Tentang Kami' },
        { href: '/help/chat', label: 'Hubungi Kami' },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex h-32 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Logo />
          
          <div className="hidden lg:flex relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input 
              placeholder="Cari layanan dan Komunitas..." 
              className="pl-12 h-14 bg-muted/40 border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 text-lg shadow-inner"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xl font-medium transition-all hover:text-primary hover:scale-105",
                  pathname === link.href ? "text-primary font-bold" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="ml-4">
              <CustomThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-4">
             <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
