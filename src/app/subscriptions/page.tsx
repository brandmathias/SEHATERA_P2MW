import { SubscriptionPlanCard } from '@/components/subscriptions/SubscriptionPlanCard';
import type { SubscriptionPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, CreditCard, QrCode, Building2 } from 'lucide-react';
import Image from 'next/image';

const plans: SubscriptionPlan[] = [
  { id: 'free', name: 'Gratis Dasar', price: 'Gratis', frequency: 'per bulan', features: ['Akses ke forum komunitas', 'Konten kurasi terbatas', 'Bergabung dengan 1 grup tematik'], cta: 'Paket Saat Ini' },
  { id: 'weekly', name: 'Pendamping Mingguan', price: 'Rp 150.000', frequency: 'per minggu', features: ['Semua fitur Dasar', '2 sesi pendampingan terjadwal/minggu (chat/suara)', 'Akses penuh ke konten kurasi', 'Bergabung dengan 3 grup tematik', 'Dukungan prioritas'], cta: 'Pilih Mingguan', isPopular: true },
  { id: 'monthly', name: 'Sahabat Bulanan', price: 'Rp 500.000', frequency: 'per bulan', features: ['Semua fitur Mingguan', '10 sesi pendampingan terjadwal/bulan (chat/suara/video)', 'Grup tematik tanpa batas', 'Akses & kontrol administrator'], cta: 'Pilih Bulanan' },
  { id: 'ondemand', name: 'Sesi Sesuai Permintaan', price: 'Rp 80.000', frequency: 'per sesi', features: ['1 sesi pendampingan (chat/suara)', 'Berlaku selama 7 hari'], cta: 'Pesan Sesi' },
];

export default function SubscriptionsPage() {
  const currentPlanId = 'free';

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-headline text-primary">Paket Langganan</h1>
        <p className="text-xl text-muted-foreground mt-3">
          Pilih paket yang paling sesuai dengan kebutuhan pendampingan dan interaksi Anda.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch mb-20">
        {plans.map((plan) => (
          <SubscriptionPlanCard 
            key={plan.id} 
            plan={plan} 
            isCurrentPlan={plan.id === currentPlanId}
            isPopular={(plan as any).isPopular}
          />
        ))}
      </div>

      <section className="p-12 bg-secondary/20 rounded-2xl shadow-inner text-center">
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-headline">Pembayaran Aman & Mudah</h2>
            <p className="text-xl text-muted-foreground">
                Kami menyediakan berbagai metode pembayaran modern melalui gateway yang aman untuk memastikan setiap transaksi Anda terlindungi.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 pt-4">
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-4 rounded-full shadow-md">
                        <QrCode className="h-10 w-10 text-primary" />
                    </div>
                    <span className="font-bold">QRIS Instan</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-4 rounded-full shadow-md">
                        <CreditCard className="h-10 w-10 text-primary" />
                    </div>
                    <span className="font-bold">Kartu Kredit</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-4 rounded-full shadow-md">
                        <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <span className="font-bold">Virtual Account</span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary font-medium pt-8">
                <ShieldCheck className="h-6 w-6" />
                Semua data Anda dienkripsi dengan standar keamanan tinggi.
            </div>
        </div>
      </section>

       <section className="mt-20 text-center">
        <h2 className="text-3xl font-headline mb-4">Butuh Bantuan?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Jika Anda mengalami kendala saat melakukan pembayaran, tim kami siap membantu.
        </p>
        <Button asChild size="lg" variant="outline" className="text-xl py-4 px-8 border-primary text-primary hover:bg-primary/5">
          <a href="/help">Hubungi Dukungan</a>
        </Button>
      </section>
    </div>
  );
}
