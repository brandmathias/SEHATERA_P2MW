
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, HelpCircleIcon, LayoutDashboard, ShieldCheck } from 'lucide-react';
import type { UserRole } from '@/types';

const roleDisplay: Record<UserRole, string> = {
  elderly: 'Pengguna Lansia',
  admin: 'Super Admin',
  volunteer: 'Relawan',
  guest: 'Tamu',
};

export function UserNav() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-20 h-10 bg-muted rounded-md animate-pulse"></div>;
  }

  return (
    <div>
      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={user.avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none font-headline">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground capitalize pt-1">Peran: {roleDisplay[user.role]}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profil
              </Link>
            </DropdownMenuItem>
             {user.role === 'volunteer' && (
              <DropdownMenuItem asChild>
                <Link href="/dashboard/volunteer" className="cursor-pointer flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dasbor Relawan
                </Link>
              </DropdownMenuItem>
            )}
            {user.role === 'admin' && (
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin" className="cursor-pointer flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Panel Super Admin
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Pengaturan
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/help" className="cursor-pointer flex items-center">
                <HelpCircleIcon className="mr-2 h-4 w-4" />
                Bantuan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-2">
          <Button asChild variant="ghost" className="text-lg px-6 py-3">
            <Link href="/auth/signin">Masuk</Link>
          </Button>
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-6 py-3">
            <Link href="/auth/signup">Daftar</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
