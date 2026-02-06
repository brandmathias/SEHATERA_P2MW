
import type { CommunityPost } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PostCard } from '@/components/community/PostCard';
import { Leaf, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { JoinGroupButton } from '@/components/groups/JoinGroupButton'; // Import the new client component

// Mock data for this specific group page
const groupInfo = {
  id: 'g1',
  name: 'Klub Berkebun',
  description: 'Bagikan tips, keberhasilan, dan pertanyaan berkebun Anda. Semua tingkatan diterima! Dari bunga yang semarak hingga sayuran lezat, mari kita tumbuh bersama.',
  memberCount: 120,
  icon: Leaf,
  coverImageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
};

const mockMembers = [
    { id: 'u1', name: 'Eleanor V.', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop' },
    { id: 'u4', name: 'Ben C.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
    { id: 'u5', name: 'Sarah L.', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' },
    { id: 'u6', name: 'Tom H.', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
];

const mockGroupPosts: CommunityPost[] = [
  { 
    id: '1', 
    author: { id: 'u1', name: 'Eleanor Vance', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop' }, 
    content: "Kebun balkon saya akhirnya mekar! Sangat bangga dengan petunia ini.", 
    timestamp: new Date(Date.now() - 3600000).toISOString(), 
    likes: 15, 
    comments: [], 
    group: 'Klub Berkebun', 
    media: [{ url: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop', type: 'image' }] 
  },
  { id: 'p2', author: { id: 'u4', name: 'Ben Carter', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'}, content: "Ada yang pernah mencoba menggunakan ampas kopi sebagai pupuk untuk mawar? Katanya hasilnya luar biasa.", timestamp: new Date(Date.now() - 86400000).toISOString(), likes: 8, comments: [], group: 'Klub Berkebun' }
];

export default function GroupViewPage() {
  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      {/* Cover Image */}
      <div className="h-64 bg-cover bg-center rounded-lg shadow-lg mb-8" style={{ backgroundImage: `url(${groupInfo.coverImageUrl})` }}>
        <div className="h-full bg-black/40 rounded-lg flex items-end p-8">
            <div className="bg-primary/20 backdrop-blur-sm p-4 rounded-full">
                <groupInfo.icon className="h-16 w-16 text-white" />
            </div>
            <div className="ml-4">
                <h1 className="text-5xl font-headline text-white drop-shadow-md">{groupInfo.name}</h1>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Feed */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-headline">Postingan Terbaru di {groupInfo.name}</h2>
            {mockGroupPosts.length > 0 ? (
                mockGroupPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        <p className="text-lg">Belum ada postingan di grup ini. Jadilah yang pertama berbagi sesuatu!</p>
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Sidebar - Group Info */}
        <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg sticky top-24">
                <CardHeader>
                    <CardTitle className="text-2xl">Tentang Grup Ini</CardTitle>
                    <CardDescription className="text-lg pt-2">{groupInfo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <JoinGroupButton />
                    <Separator className="my-6" />
                    <div>
                        <h3 className="text-xl font-headline mb-4 flex items-center">
                            <Users className="mr-2 h-5 w-5" /> Anggota ({groupInfo.memberCount})
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {mockMembers.map(member => (
                                <Avatar key={member.id} title={member.name} className="h-12 w-12 border-2 border-accent">
                                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            ))}
                            <Avatar>
                                <AvatarFallback className="text-sm">+{groupInfo.memberCount - mockMembers.length}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
