'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, PhoneOff, Volume2, LifeBuoy, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function VoiceCallPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mounted) return null;

  const handleEndCall = () => {
    toast({
      title: 'Panggilan Selesai',
      description: 'Anda telah meninggalkan panggilan suara.',
    });
    router.back();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] animate-fade-in overflow-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-150" />
      
      {/* Tombol Kembali */}
      <div className="absolute top-8 left-8 z-50">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10 rounded-full h-12 w-12">
          <ArrowLeft className="h-8 w-8" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-12 z-10">
        <div className="relative">
          {/* Animated Circles */}
          <div className="absolute -inset-8 bg-primary/20 rounded-full animate-ping opacity-20" />
          <div className="absolute -inset-16 bg-primary/10 rounded-full animate-pulse opacity-10" />
          
          <Avatar className="h-64 w-64 border-8 border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.3)] bg-muted">
              <AvatarFallback className="text-8xl font-bold text-primary">AW</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-4 right-4 bg-primary p-5 rounded-full shadow-2xl border-4 border-[#1a1a1a]">
              <Volume2 className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-white font-headline">Alice Wulandari</h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-3xl text-primary font-bold tracking-widest">{formatTime(timer)}</p>
            </div>
            <p className="text-white/40 uppercase font-bold tracking-[0.3em] text-sm">Panggilan Suara Aktif</p>
        </div>
      </div>

      {/* Controls Bar - Desain Konsisten dengan Video Call */}
      <div className="absolute bottom-12 flex items-center gap-10 bg-[#121212]/80 backdrop-blur-3xl px-12 py-8 rounded-[3.5rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
        
        {/* Mic Control */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full transition-all duration-300", 
              isMuted ? "bg-destructive text-white hover:bg-destructive/90" : "bg-white/10 text-white hover:bg-white/20"
            )}
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </Button>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Mic</span>
        </div>

        {/* End Call Control (Bigger) */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="destructive"
            size="icon"
            className="h-20 w-20 rounded-full shadow-2xl shadow-destructive/20 hover:scale-105 transition-transform"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-9 w-9" />
          </Button>
          <span className="text-[10px] font-bold text-destructive uppercase tracking-[0.15em]">Selesai</span>
        </div>

        {/* Help Control */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => toast({ title: "Bantuan dipanggil", description: "Tim SEHATERA akan segera bergabung." })}
          >
            <LifeBuoy className="h-7 w-7" />
          </Button>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Bantuan</span>
        </div>
      </div>
    </div>
  );
}
