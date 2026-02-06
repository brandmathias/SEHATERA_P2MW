'use client'; 

import React, { useState } from 'react';
import type { CommunityPost } from '@/types';
import { PostCard } from '@/components/community/PostCard';
import { CreatePostForm } from '@/components/community/CreatePostForm'; 
import { Button } from '@/components/ui/button';
import { Home, Calendar, MessageSquare, Users, Sprout, Music, Activity, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialPosts: CommunityPost[] = [
  { 
    id: '1', 
    author: { id: 'u1', name: 'Budi Santoso', avatarUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=100' }, 
    content: "Selamat pagi teman-teman semua! ☀️ Hari ini saya mau berbagi sedikit tips. Jangan lupa menyiram anggrek di pagi hari dan beri pupuk organik seminggu sekali. Hasilnya di kebun saya sangat memuaskan minggu ini.", 
    timestamp: new Date(Date.now() - 7200000).toISOString(), 
    likes: 12, 
    comments: [{}, {}, {}, {}] as any, 
    group: 'Hobi Berkebun', 
    media: [
      { url: 'https://images.unsplash.com/photo-1586251214631-55099351062a?q=80&w=800', type: 'image' }
    ]
  },
  { 
    id: '2', 
    author: { id: 'u2', name: 'Siti Aminah', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100' }, 
    content: "Apakah ada yang mau ikut jalan santai besok pagi di taman kota? Saya dan suami berencana berangkat jam 6 pagi. Sekalian kita menghirup udara segar! 🌿🚶‍♀️", 
    timestamp: new Date(Date.now() - 14400000).toISOString(), 
    likes: 24, 
    comments: [{}, {}, {}, {}, {}, {}, {}, {}] as any 
  },
  { 
    id: '3', 
    author: { id: 'u3', name: 'Pak Bambang', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' }, 
    content: "Lagu \"Andaikan Kau Datang\" selalu membuat saya teringat masa muda. Mari bernyanyi bersama di acara kumpul minggu depan! 🎸", 
    timestamp: new Date(Date.now() - 86400000).toISOString(), 
    likes: 45, 
    comments: Array(15).fill({}) as any, 
    group: 'Musik Lawas', 
    media: [
      { url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800', type: 'video' }
    ]
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);

  const handlePostCreated = (newPost: CommunityPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar Komunitas */}
      <aside className="hidden lg:flex w-80 flex-col sticky top-20 h-[calc(100vh-5rem)] p-8 pr-4">
        <div className="space-y-8">
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">MENU UTAMA</h3>
            <div className="space-y-2">
              <SidebarItem icon={Home} label="Feed Umum" active />
              <SidebarItem icon={Calendar} label="Acara Saya" />
              <SidebarItem icon={MessageSquare} label="Pesan" />
              <SidebarItem icon={Users} label="Teman" />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">GRUP TEMATIK</h3>
            <div className="space-y-2">
              <SidebarItem icon={Sprout} label="Hobi Berkebun" iconColor="text-green-500" />
              <SidebarItem icon={Music} label="Musik Lawas" iconColor="text-pink-500" />
              <SidebarItem icon={Activity} label="Senam Sehat" iconColor="text-blue-500" />
            </div>
          </section>
        </div>

        {/* Help Card */}
        <div className="mt-auto bg-primary/5 border border-primary/10 rounded-[1.5rem] p-6 space-y-4">
          <p className="text-sm font-medium">Butuh bantuan?</p>
          <Button variant="outline" className="w-full bg-white border-primary text-primary hover:bg-primary/5 rounded-full h-10 font-bold">
            Hubungi Admin
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold font-headline mb-8">Pusat Komunitas</h1>
        
        <CreatePostForm onPostCreated={handlePostCreated} />

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, iconColor }: any) {
  return (
    <button className={cn(
      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-lg",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
    )}>
      <Icon className={cn("h-6 w-6", iconColor || "text-primary")} />
      <span>{label}</span>
    </button>
  );
}
