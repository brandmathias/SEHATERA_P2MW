'use client';

import { useState } from 'react';
import { curateContent } from '@/ai/flows/curate-content';
import type { CurateContentOutput } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import images from '@/app/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CuratedContent() {
  const [content, setContent] = useState<CurateContentOutput | null>({
    articleTitle: '"Hati yang gembira adalah obat yang manjur."',
    articleSummary: 'Kebahagiaan sederhana bisa ditemukan di mana saja: secangkir teh hangat, sapaan cucu, atau mekarnya bunga di halaman. Mari syukuri hal kecil hari ini.',
    positiveQuote: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const result = await curateContent({ userMood: 'neutral', interests: 'alam, kebahagiaan' });
      setContent(result);
    } catch (error) {
      toast({ title: "Error", description: "Tidak dapat memuat konten.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold text-foreground">Inspirasi Harian</h2>
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isLoading} className="text-muted-foreground">
          <RefreshCw className={cn("h-5 w-5", isLoading && "animate-spin")} />
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-card rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-md border-none">
                  RENUNGAN
                </Badge>
                <span className="text-sm text-muted-foreground font-medium">Kamis, 24 Oktober</span>
              </div>
              
              <h3 className="text-3xl font-bold font-headline leading-snug text-foreground">
                {content?.articleTitle}
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.articleSummary}
              </p>
              
              <Button asChild className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-8 py-7 text-lg font-bold flex items-center gap-2 group border-none">
                <Link href="/articles/1">
                  Baca Artikel Lengkap <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="relative w-full md:w-[320px] aspect-square rounded-[2rem] overflow-hidden shadow-sm">
              <Image
                src={images.curated_article.url}
                alt={images.curated_article.alt}
                width={images.curated_article.width}
                height={images.curated_article.height}
                className="object-cover"
                data-ai-hint="orange flowers"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
