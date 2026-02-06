'use client';

import type { CommunityPost } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, MoreHorizontal, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: CommunityPost;
}

export function PostCard({ post }: PostCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(post.timestamp).toLocaleString('id-ID', { hour: 'numeric', minute: 'numeric' }) + ' yang lalu');
  }, [post.timestamp]);

  return (
    <Card className="mb-6 shadow-soft border-none rounded-[1.5rem] overflow-hidden animate-slide-in-up">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
        <div className="flex flex-row items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-xl font-bold font-headline leading-none">{post.author.name}</h4>
            <p className="text-sm text-primary font-medium mt-1">
              {post.group ? `Grup: ${post.group}` : 'Feed Umum'} • <span className="text-muted-foreground font-normal">{formattedDate}</span>
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-4">
        {post.id === '1' && <h3 className="text-2xl font-bold font-headline">Tips agar Anggrek Cepat Berbunga</h3>}
        {post.id === '3' && <h3 className="text-2xl font-bold font-headline">Bernostalgia dengan Koes Plus</h3>}
        
        <p className="text-lg leading-relaxed text-foreground/90">{post.content}</p>
        
        {post.media && post.media.length > 0 && (
          <div className="relative rounded-2xl overflow-hidden mt-4 shadow-sm group">
            <Image
              src={post.media[0].url}
              alt="Konten postingan"
              width={800}
              height={500}
              className="w-full h-auto object-cover max-h-[500px]"
            />
            {post.media[0].type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="bg-primary h-16 w-16 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-white fill-current ml-1" />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 py-4 flex gap-4">
        <Button variant="secondary" className="flex-1 bg-secondary/50 hover:bg-secondary text-foreground text-lg rounded-xl h-12 font-bold gap-2">
          <Heart className="h-5 w-5" /> Suka ({post.likes})
        </Button>
        <Button variant="secondary" className="flex-1 bg-secondary/50 hover:bg-secondary text-foreground text-lg rounded-xl h-12 font-bold gap-2">
          <MessageSquare className="h-5 w-5" /> Komentar ({post.comments.length})
        </Button>
      </CardFooter>
    </Card>
  );
}
