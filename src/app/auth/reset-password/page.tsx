'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import Image from 'next/image';

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Alamat email tidak valid." }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    startTransition(async () => {
      // Simulate API call for password reset
      console.log('Meminta atur ulang kata sandi untuk:', data.email);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      toast({ 
        title: "Email Atur Ulang Kata Sandi Terkirim", 
        description: "Jika akun untuk email ini ada, Anda akan menerima instruksi untuk mengatur ulang kata sandi Anda." 
      });
      form.reset();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 animate-fade-in">
      <div className="mb-8 text-center">
        <Image 
            src="https://images.unsplash.com/photo-1554744512-d6c603f27c54?q=80&w=200&auto=format&fit=crop" 
            alt="Logo SEHATERA" 
            width={100} 
            height={100} 
            className="mx-auto rounded-full shadow-md object-cover"
        />
      </div>
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">Atur Ulang Kata Sandi Anda</CardTitle>
          <CardDescription className="text-lg">Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.</CardDescription>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-xl py-6 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
                <Mail className="mr-2 h-6 w-6"/>
                {isPending ? 'Mengirim...' : 'Kirim Tautan Atur Ulang'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-md text-muted-foreground">
            Sudah ingat kata sandi Anda?{' '}
            <Button variant="link" asChild className="text-primary p-0 text-md">
              <Link href="/auth/signin">Masuk</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
