'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, Trophy, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function PuzzlePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [score, setScore] = useState(0);

  const handleComplete = () => {
    setScore(score + 10);
    toast({
      title: "Luar Biasa!",
      description: "Anda berhasil menjawab satu teka-teki. Skor Anda: " + (score + 10),
    });
  };

  return (
    <div className="container mx-auto py-12 px-6 animate-fade-in max-w-4xl">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-4xl font-headline text-primary">Teka-Teki Harian</h1>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-full flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Skor: {score}</span>
        </div>
      </header>

      <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden p-10">
        <CardHeader className="text-center space-y-4">
          <div className="bg-secondary/50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Flora & Fauna Indonesia</CardTitle>
          <CardDescription className="text-xl">"Aku adalah bunga raksasa yang tidak memiliki daun dan mengeluarkan bau yang sangat kuat. Siapakah aku?"</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="text-xl py-8 rounded-2xl border-2 hover:bg-primary/5 hover:border-primary transition-all" onClick={handleComplete}>
              A. Bunga Bangkai
            </Button>
            <Button variant="outline" className="text-xl py-8 rounded-2xl border-2 hover:bg-primary/5 hover:border-primary transition-all" onClick={() => toast({ title: "Ayo Coba Lagi!", variant: "destructive" })}>
              B. Bunga Melati
            </Button>
            <Button variant="outline" className="text-xl py-8 rounded-2xl border-2 hover:bg-primary/5 hover:border-primary transition-all" onClick={() => toast({ title: "Ayo Coba Lagi!", variant: "destructive" })}>
              C. Bunga Mawar
            </Button>
            <Button variant="outline" className="text-xl py-8 rounded-2xl border-2 hover:bg-primary/5 hover:border-primary transition-all" onClick={() => toast({ title: "Ayo Coba Lagi!", variant: "destructive" })}>
              D. Bunga Anggrek
            </Button>
          </div>
          
          <div className="flex justify-center pt-8">
            <Button variant="ghost" className="text-lg text-muted-foreground flex items-center gap-2">
              <RefreshCw className="h-5 w-5" /> Ganti Teka-Teki
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
