'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, PhoneOff, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  sender: 'You' | 'Admin';
  content: string;
  timestamp: string;
}

const mockMessages: ChatMessage[] = [
  { id: 'm1', sender: 'Admin', content: 'Halo! Ada yang bisa kami bantu?', timestamp: '10:00 AM' },
];

export default function HelpChatPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEndChat = () => {
    toast({
      title: 'Chat Selesai',
      description: 'Sesi chat dengan admin telah berakhir.',
    });
    router.push('/help');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    // Simulate a reply
    setTimeout(() => {
        const reply: ChatMessage = {
            id: `msg-${Date.now() + 1}`,
            sender: 'Admin',
            content: 'Terima kasih atas informasinya. Mohon tunggu sebentar, kami sedang memeriksanya.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
    }, 1500)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-4 animate-fade-in">
      <Card className="w-full max-w-2xl mx-auto shadow-xl flex flex-col h-[80vh]">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()} aria-label="Kembali">
                    <ArrowLeft className="h-5 w-5"/>
                </Button>
                <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Support" />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-headline">
                    Live Chat dengan Admin
                </CardTitle>
            </div>
            <Button
                variant="destructive"
                onClick={handleEndChat}
                aria-label="Akhiri Chat"
                className="text-lg py-3 px-5"
            >
                <PhoneOff className="mr-2 h-6 w-6" /> Akhiri
            </Button>
        </CardHeader>
        <CardContent className="flex-grow p-4 overflow-y-auto">
            <div className="space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                         {msg.sender !== 'You' && <Avatar className="h-8 w-8"><AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback></Avatar>}
                        <div className={`rounded-lg px-4 py-3 max-w-xs md:max-w-md text-lg ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p>{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Ketik pesan Anda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-lg h-auto p-4"
            />
            <Button type="submit" size="icon" className="h-14 w-14" onClick={handleSendMessage}>
              <Send className="h-7 w-7" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
