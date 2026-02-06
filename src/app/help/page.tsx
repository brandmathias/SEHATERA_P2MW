
import { Accordion } from '@/components/ui/accordion';
import { FaqItem as FaqItemComponent } from '@/components/help/FaqItem';
import { ContactSupportForm } from '@/components/help/ContactSupportForm';
import type { FaqItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Phone, ShieldCheck } from 'lucide-react';

const faqItems: FaqItem[] = [
  { id: 'faq1', question: 'Bagaimana cara membuat akun?', answer: 'Anda dapat membuat akun dengan mengeklik tombol "Daftar" di beranda atau bilah navigasi. Anda akan diminta untuk memberikan nama, email, kata sandi, dan memilih peran Anda (Pengguna Lansia, Administrator, atau Relawan).' },
  { id: 'faq2', question: 'Bagaimana cara bergabung dalam sesi pendampingan?', answer: 'Sesi yang akan datang ditampilkan di layar beranda Anda. Cukup klik tombol "Gabung Sesi" untuk sesi yang ingin Anda hadiri. Pastikan Anda sudah masuk ke akun.' },
  { id: 'faq3', question: 'Apa itu grup tematik?', answer: 'Grup tematik adalah ruang komunitas tempat pengguna dengan minat yang sama (seperti berkebun, buku, atau musik) dapat terhubung, berbagi cerita, dan mendiskusikan topik. Anda dapat menemukan dan bergabung dengan grup dari halaman Komunitas.' },
  { id: 'faq4', question: 'Bagaimana cara kerja kurasi konten AI?', answer: 'AI kami menyarankan artikel harian dan kutipan positif berdasarkan suasana hati dan minat yang Anda tunjukkan. Ini dirancang untuk menyediakan konten yang membangkitkan semangat dan menarik yang disesuaikan untuk Anda. Anda dapat memperbarui suasana hati dan minat Anda di halaman beranda.' },
  { id: 'faq5', question: 'Paket langganan apa saja yang tersedia?', answer: 'Kami menawarkan paket Gratis Dasar, serta paket premium Pendamping Mingguan dan Sahabat Bulanan dengan lebih banyak fitur. Kami juga memiliki sesi Sesuai Permintaan. Anda dapat melihat semua paket dan meningkatkannya di halaman Langganan.' },
  { id: 'faq6', question: 'Bagaimana cara menjadi relawan?', answer: 'Daftar sebagai Relawan selama proses pembuatan akun. Setelah orientasi, Anda akan dapat melihat peluang untuk memberikan pendampingan dan dukungan kepada pengguna lansia.' },
  { id: 'faq7', question: 'Apakah informasi pribadi saya aman?', answer: 'Ya, kami menjaga privasi dan keamanan Anda dengan sangat serius. Semua informasi pribadi ditangani sesuai dengan kebijakan privasi kami dan praktik terbaik industri.' },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-headline text-primary">Pusat Bantuan</h1>
        <p className="text-xl text-muted-foreground mt-3">
          Temukan jawaban atau hubungi kami untuk mendapatkan bantuan.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2">
          <h2 className="text-3xl font-headline mb-6">Pertanyaan Umum (FAQ)</h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item) => (
              <FaqItemComponent key={item.id} item={item} />
            ))}
          </Accordion>
        </section>

        <aside className="lg:col-span-1 space-y-8">
           <section>
             <h2 className="text-3xl font-headline mb-6">Butuh Bantuan Cepat?</h2>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Hubungi Kami Langsung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild className="w-full text-lg py-7" size="lg">
                        <Link href="https://wa.me/6281234567890" target="_blank">
                           <Phone className="mr-3 h-6 w-6"/> Chat via WhatsApp
                        </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full text-lg py-7" size="lg">
                        <Link href="/help/chat">
                           <MessageSquare className="mr-3 h-6 w-6"/> Live Chat dengan Admin
                        </Link>
                    </Button>
                </CardContent>
             </Card>
           </section>
           
           <section>
             <h2 className="text-3xl font-headline mb-6">Atau Kirimkan Laporan</h2>
             <ContactSupportForm />
           </section>
        </aside>
      </div>
    </div>
  );
}
