'use client';

import React, { useState } from 'react';
import type { CommunityPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, Video, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CreatePostFormProps {
    onPostCreated: (post: CommunityPost) => void;
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (newPostContent.trim() === '') return;
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: { id: 'currentUser', name: 'Anda', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
      content: newPostContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    onPostCreated(newPost);
    setNewPostContent('');
  };
  
  return (
    <Card className="shadow-soft border-none rounded-[1.5rem] mb-8 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Apa yang Anda pikirkan hari ini, Pak/Bu?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full bg-transparent border-none text-xl focus:outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
              <ImageIcon className="h-5 w-5 text-primary" />
              <span>Foto</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
              <Video className="h-5 w-5 text-primary" />
              <span>Video</span>
            </button>
          </div>
          <Button 
            onClick={handleCreatePost} 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-2 font-bold"
          >
            Bagikan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
