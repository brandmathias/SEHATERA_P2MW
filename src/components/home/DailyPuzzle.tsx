'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';
import images from '@/app/lib/placeholder-images.json';
import Link from 'next/link';

export function DailyPuzzle() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-headline font-bold text-foreground">Asah Otak</h2>
      
      <Card className="border-none shadow-sm bg-primary/5 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-8 space-y-8 flex flex-col items-center text-center">
          <div className="relative w-48 h-48">
             <Image 
                src={images.puzzle_icon.url} 
                alt={images.puzzle_icon.alt} 
                width={images.puzzle_icon.width}
                height={images.puzzle_icon.height}
                className="object-contain opacity-90"
                data-ai-hint="colorful puzzle pieces"
             />
          </div>

          <Card className="w-full border-none shadow-sm bg-card rounded-[2rem] p-8 space-y-4">
            <div className="bg-destructive/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2">
               <div className="w-6 h-6 bg-destructive rounded-sm rotate-45" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground">Teka-Teki Silang</h3>
            <p className="text-muted-foreground font-medium">Tema: "Flora & Fauna Indonesia"</p>
          </Card>

          <p className="text-muted-foreground text-lg leading-relaxed px-4">
            Melatih ingatan dan konsentrasi dengan cara yang menyenangkan setiap hari.
          </p>

          <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-2xl py-8 text-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
            <Link href="/puzzle">
              <Play className="h-6 w-6 fill-current" /> Mulai Main
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
