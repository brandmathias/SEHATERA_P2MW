'use client';
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, History, MessageSquare, Phone, Video, ListOrdered, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateUserAvatar } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
          toast({
              variant: 'destructive',
              title: 'Ukuran File Terlalu Besar',
              description: 'Ukuran gambar maksimal adalah 2MB.',
          });
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (updateUserAvatar) {
          updateUserAvatar(base64String);
          toast({
              title: 'Foto Profil Diperbarui',
              description: 'Foto profil Anda telah berhasil diganti.',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-headline text-primary">Profil Pengguna</h1>
        <p className="text-xl text-muted-foreground mt-2">Kelola informasi dan lihat aktivitas Anda.</p>
      </header>
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="items-center text-center p-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=128&auto=format&fit=crop'} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button 
                onClick={handleAvatarClick} 
                variant="outline"
                size="icon"
                className="absolute bottom-2 right-2 rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm"
              >
              <Camera className="h-5 w-5" />
              <span className="sr-only">Ganti foto profil</span>
            </Button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <CardTitle className="text-4xl font-headline mt-4">{user.name}</CardTitle>
          <CardDescription className="text-lg">{user.email}</CardDescription>
          <Badge variant="outline" className="mt-2 text-md capitalize py-1 px-3 bg-accent text-accent-foreground">{user.role}</Badge>
        </CardHeader>
        <CardContent className="text-lg space-y-8 p-8">
          
          <div>
            <h3 className="font-bold text-xl mb-4">Preferensi Sesi</h3>
            <div className="flex items-center justify-around p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <span className="text-md font-medium">Chat</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Phone className="h-8 w-8 text-primary" />
                  <span className="text-md font-medium">Telepon</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Video className="h-8 w-8 text-primary" />
                  <span className="text-md font-medium">Video</span>
              </div>
            </div>
             <p className="text-sm text-muted-foreground text-center mt-2">Dapat diubah di halaman Pengaturan.</p>
          </div>

          <Separator className="my-6"/>

          <div>
             <h3 className="font-bold text-xl mb-4">Aktivitas & Riwayat</h3>
             <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full text-lg py-7 justify-start" onClick={() => router.push('/settings')}>
                  <Edit3 className="mr-4 h-6 w-6"/> Edit Profil & Pengaturan
                </Button>
                <Button size="lg" className="w-full text-lg py-7 justify-start" variant="secondary" onClick={() => router.push('/')}>
                  <ListOrdered className="mr-4 h-6 w-6"/> Riwayat Sesi
                </Button>
                <Button size="lg" className="w-full text-lg py-7 justify-start" variant="secondary" onClick={() => router.push('/profile/transactions')}>
                  <History className="mr-4 h-6 w-6"/> Riwayat Transaksi
                </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
