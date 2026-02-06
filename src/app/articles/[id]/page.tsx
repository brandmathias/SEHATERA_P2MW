'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Share2, Heart } from 'lucide-react';
import Image from 'next/image';
import images from '@/app/lib/placeholder-images.json';

export default function ArticlePage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-12 px-6 animate-fade-in max-w-4xl">
      <header className="mb-10 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" className="rounded-full"><Heart className="h-5 w-5" /></Button>
        </div>
      </header>

      <article className="space-y-8">
        <div className="relative w-full h-[400px] rounded-[3rem] overflow-hidden shadow-xl">
          <Image src={images.curated_article.url} alt="Article Banner" fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary font-bold tracking-widest uppercase">
            <BookOpen className="h-5 w-5" />
            <span>Inspirasi Harian</span>
          </div>
          <h1 className="text-5xl font-headline text-[#1a1a1a] leading-tight">"Hati yang gembira adalah obat yang manjur."</h1>
          <p className="text-muted-foreground text-lg">Ditulis oleh Tim SEHATERA • 24 Oktober 2024</p>
        </div>

        <div className="prose prose-xl max-w-none text-foreground/80 leading-relaxed space-y-6">
          <p>
            Kebahagiaan sederhana bisa ditemukan di mana saja: secangkir teh hangat di pagi hari, sapaan tulus dari cucu tersayang, atau sekadar melihat mekarnya bunga di halaman rumah. Mari kita belajar untuk selalu mensyukuri hal-hal kecil hari ini.
          </p>
          <p>
            Seringkali kita terlalu fokus pada hal-hal besar yang belum tercapai, sehingga lupa bahwa kesehatan yang kita miliki saat ini adalah anugerah yang luar biasa. Dengan menjaga hati tetap gembira, sistem kekebalan tubuh kita pun akan meningkat secara alami.
          </p>
          <p>
            Cobalah untuk melakukan hobi yang Anda sukai hari ini, baik itu merajut, berkebun, atau sekadar mendengarkan musik favorit masa muda. Kebahagiaan adalah pilihan, dan mari kita pilih untuk bahagia hari ini.
          </p>
        </div>
      </article>
    </div>
  );
}
