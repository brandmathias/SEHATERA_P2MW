'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Video, VideoOff, PhoneOff, LifeBuoy, ArrowLeft } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function VideoCallPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Izin Kamera Diperlukan',
            description: 'Mohon aktifkan kamera di pengaturan browser Anda.',
          });
        }
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  if (!mounted) return null;

  const toggleMute = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleEndCall = () => {
    toast({ title: 'Sesi Selesai', description: 'Panggilan video telah berakhir.' });
    router.back();
  };

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] animate-fade-in overflow-hidden">
      {/* Tombol Kembali */}
      <div className="absolute top-8 left-8 z-50">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10 rounded-full h-12 w-12">
          <ArrowLeft className="h-8 w-8" />
        </Button>
      </div>

      {/* Main View (Partner) */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="flex flex-col items-center">
            <Avatar className="h-64 w-64 bg-primary/20 border-4 border-primary/30 shadow-2xl">
                <AvatarFallback className="text-8xl font-bold text-primary">AW</AvatarFallback>
            </Avatar>
            <div className="mt-8 text-center">
                <h2 className="text-4xl font-bold text-white font-headline">Alice Wulandari</h2>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-sm">Terhubung - 04:15</p>
                </div>
            </div>
         </div>
      </div>

      {/* Local Preview (Small Window) */}
      <div className="absolute top-8 right-8 w-52 h-72 rounded-[2.5rem] border-4 border-white/10 shadow-2xl overflow-hidden bg-[#1a1a1a] z-30">
        <video 
          ref={videoRef} 
          className={cn("w-full h-full object-cover scale-x-[-1]", isCameraOff && "hidden")} 
          autoPlay 
          muted 
          playsInline
        />
        {isCameraOff && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a]">
            <Avatar className="h-16 w-16 bg-white/5 border border-white/10 text-white">
              <AvatarFallback className="font-bold">S</AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-white/40 font-bold mt-3 uppercase tracking-widest">Kamera Mati</span>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-10 z-40 bg-[#121212]/80 backdrop-blur-3xl px-12 py-8 rounded-[3.5rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
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

        {/* Camera Control */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-16 w-16 rounded-full transition-all duration-300", 
              isCameraOff ? "bg-destructive text-white hover:bg-destructive/90" : "bg-white/10 text-white hover:bg-white/20"
            )}
            onClick={toggleCamera}
          >
            {isCameraOff ? <VideoOff className="h-7 w-7" /> : <Video className="h-7 w-7" />}
          </Button>
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">Kamera</span>
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

      {/* Permission Overlay */}
      {hasCameraPermission === false && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 p-8 text-center">
          <Alert variant="destructive" className="max-w-md rounded-[3rem] p-8 border-none bg-destructive/10 backdrop-blur-md">
            <AlertTitle className="text-2xl font-bold font-headline text-white mb-2">Izin Kamera Diblokir</AlertTitle>
            <AlertDescription className="text-lg text-white/80 leading-relaxed">
              Mohon izinkan akses kamera di pengaturan browser Anda agar pendamping dapat melihat Anda.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
