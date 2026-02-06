'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Home, Calendar } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-20 px-4 animate-fade-in flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-lg shadow-2xl border-2 border-primary/20 text-center p-8">
        <CardHeader>
            <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-4xl font-headline text-primary">Pembayaran Berhasil!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl text-muted-foreground">
            Terima kasih! Langganan Anda kini telah aktif. Anda sudah bisa mulai menjadwalkan sesi pendampingan.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <Button size="lg" className="text-lg py-7" onClick={() => router.push('/')}>
              <Home className="mr-2 h-5 w-5" /> Kembali Beranda
            </Button>
            <Button size="lg" variant="outline" className="text-lg py-7" onClick={() => router.push('/sessions/book')}>
              <Calendar className="mr-2 h-5 w-5" /> Jadwalkan Sesi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
