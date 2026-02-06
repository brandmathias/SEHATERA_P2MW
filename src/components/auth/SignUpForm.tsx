
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/types';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal harus 2 karakter." }),
  email: z.string().email({ message: "Alamat email tidak valid." }),
  password: z.string().min(6, { message: "Kata sandi minimal harus 6 karakter." }),
  confirmPassword: z.string().min(6, { message: "Kata sandi minimal harus 6 karakter." }),
  role: z.enum(['elderly', 'admin', 'volunteer'], { required_error: 'Silakan pilih peran.' }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Anda harus menyetujui Kebijakan Privasi & Ketentuan Penggunaan." }),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Kata sandi tidak cocok",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    startTransition(() => {
      console.log('Mendaftar dengan:', data);
      login(data.name, data.role);
      toast({ title: "Akun Berhasil Dibuat!", description: "Selamat datang di SEHATERA. Silakan lengkapi profil Anda." });
      router.push(data.role === 'volunteer' ? '/dashboard/volunteer' : '/onboarding');
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-headline">Buat Akun Anda</CardTitle>
        <CardDescription className="text-lg">Bergabunglah dengan SEHATERA untuk terhubung dan berkembang.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Anda" {...field} className="text-lg p-4 h-auto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Alamat Email</FormLabel>
                    <FormControl>
                      <Input placeholder="anda@contoh.com" {...field} className="text-lg p-4 h-auto" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Konfirmasi Kata Sandi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} className="text-lg p-4 h-auto pr-12" />
                           <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Saya bergabung sebagai...</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                           <SelectTrigger className="w-full text-lg p-4 h-auto">
                              <SelectValue placeholder="Pilih peran Anda" />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="elderly">Pengguna Lansia</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="volunteer">Relawan</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 items-center pt-2">
                      <FormControl>
                      <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="acceptTerms"
                      />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                          <label
                          htmlFor="acceptTerms"
                          className="text-sm font-medium leading-none"
                          >
                          Saya menyetujui <Button variant="link" asChild className="p-0 h-auto"><a href="#">Ketentuan Penggunaan</a></Button> & <Button variant="link" asChild className="p-0 h-auto"><a href="#">Kebijakan Privasi</a></Button>.
                          </label>
                      </div>
                    <FormMessage className="!ml-0" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-xl py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
              <UserPlus className="mr-2 h-6 w-6"/>
              {isPending ? 'Membuat Akun...' : 'Buat Akun'}
            </Button>
             <p className="mt-6 text-center text-md text-muted-foreground">
                Sudah punya akun?{' '}
                <Button variant="link" asChild className="text-primary p-0 text-md">
                <Link href="/auth/signin">Masuk</Link>
                </Button>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
