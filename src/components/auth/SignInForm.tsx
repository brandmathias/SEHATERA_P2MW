'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import type { UserRole } from '@/types';

const signInSchema = z.object({
  email: z.string().email({ message: "Alamat email tidak valid." }),
  password: z.string().min(6, { message: "Kata sandi minimal harus 6 karakter." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    startTransition(() => {
      // Simulasi autentikasi
      console.log('Masuk dengan:', data);
      
      const emailLower = data.email.toLowerCase();
      const name = data.email.split('@')[0];
      
      // Deteksi peran berdasarkan email untuk memudahkan pengujian prototipe
      let role: UserRole = 'elderly';
      if (emailLower.includes('admin')) {
        role = 'admin';
      } else if (emailLower.includes('volunteer') || emailLower.includes('relawan')) {
        role = 'volunteer';
      }

      login(name, role); 
      
      toast({ 
        title: "Berhasil Masuk", 
        description: `Selamat datang kembali sebagai ${role === 'admin' ? 'Administrator' : role === 'volunteer' ? 'Relawan' : 'Pengguna Lansia'}!` 
      });
      
      // Arahkan ke dashboard yang sesuai
      if (role === 'admin') {
        router.push('/dashboard/admin');
      } else if (role === 'volunteer') {
        router.push('/dashboard/volunteer');
      } else {
        router.push('/');
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-headline">Selamat Datang Kembali!</CardTitle>
        <CardDescription className="text-lg">Masuk untuk melanjutkan ke SEHATERA.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Alamat Email</FormLabel>
                  <FormControl>
                    <Input placeholder="anda@contoh.com" {...field} className="text-lg p-4 h-auto" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Gunakan email mengandung kata &quot;admin&quot; untuk masuk sebagai Super Admin.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Kata Sandi</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} className="text-lg p-4 h-auto pr-12" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-xl py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
              <LogIn className="mr-2 h-6 w-6"/>
              {isPending ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-md text-muted-foreground">
          Belum punya akun?{' '}
          <Button variant="link" asChild className="text-primary p-0 text-md">
            <Link href="/auth/signup">Daftar</Link>
          </Button>
        </p>
         <p className="mt-2 text-center text-sm text-muted-foreground">
          Lupa kata sandi Anda?{' '}
          <Button variant="link" asChild className="text-primary p-0 text-sm">
            <Link href="/auth/reset-password">Atur Ulang Kata Sandi</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}