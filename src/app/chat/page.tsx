'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowLeft, Paperclip, CheckCheck, FileIcon, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'You' | 'Partner';
  senderName: string;
  content: string;
  timestamp: string;
  type?: 'text' | 'file';
  fileName?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Deteksi peran untuk menentukan perspektif chat
  const isVolunteer = user?.role === 'volunteer';
  const partnerName = isVolunteer ? 'Ibu Sarah' : 'Alice Wulandari';
  const myName = user?.name || (isVolunteer ? 'Relawan' : 'Ibu Sarah');
  const myFirstName = myName.split(' ')[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    // Inisialisasi: Relawan mengirim pesan pertama
    // Jika user adalah relawan, gunakan namanya sendiri. 
    // Jika user adalah lansia, gunakan nama partner (Alice).
    const senderName = isVolunteer ? myName : 'Alice Wulandari';
    const contentName = isVolunteer ? myFirstName : 'Alice';

    setMessages([
      { 
        id: 'm1', 
        sender: isVolunteer ? 'You' : 'Partner', 
        senderName: senderName, 
        content: `Selamat pagi! ☀️ Bagaimana kabar Bapak/Ibu hari ini? Ada yang bisa ${contentName} bantu?`, 
        timestamp: '09:15',
        type: 'text'
      }
    ]);
  }, [isVolunteer, myName, myFirstName]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' && !attachedFile) return;

    const messagesToAdd: ChatMessage[] = [];

    // Jika ada file terlampir
    if (attachedFile) {
        messagesToAdd.push({
            id: `msg-file-${Date.now()}`,
            sender: 'You',
            senderName: myName,
            content: `Mengirim file: ${attachedFile.name}`,
            type: 'file',
            fileName: attachedFile.name,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setAttachedFile(null);
    }

    // Jika ada teks
    if (newMessage.trim() !== '') {
        messagesToAdd.push({
            id: `msg-${Date.now()}`,
            sender: 'You',
            senderName: myName,
            content: newMessage,
            type: 'text',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setNewMessage('');
    }

    setMessages(prev => [...prev, ...messagesToAdd]);
    
    // Simulasi balasan otomatis
    setTimeout(() => {
        const reply: ChatMessage = {
            id: `msg-reply-${Date.now()}`,
            sender: 'Partner',
            senderName: partnerName,
            content: 'Tentu, saya mengerti. Senang sekali bisa mengobrol hari ini. 😊',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      toast({
        title: "File Terpilih",
        description: `${file.name} telah siap untuk dikirimkan.`,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white animate-fade-in">
      {/* Header Chat */}
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary/10 bg-muted text-primary">
              <AvatarFallback className="font-bold">
                {partnerName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-headline">{partnerName}</h1>
            <p className="text-xs font-bold text-green-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full" /> Online sekarang
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-grow overflow-y-auto bg-[#fbfaff] px-4 md:px-20 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center">
            <span className="bg-muted/50 px-4 py-1 rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Hari Ini</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] font-bold text-muted-foreground mb-1 px-1">{msg.senderName}</span>
              <div className={cn(
                "flex items-end gap-3 max-w-[85%] md:max-w-[70%]",
                msg.sender === 'You' ? "flex-row-reverse" : ""
              )}>
                {msg.sender !== 'You' && (
                  <Avatar className="h-10 w-10 bg-muted border border-white text-primary">
                    <AvatarFallback className="text-xs font-bold">
                        {msg.senderName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <div className={cn(
                    "px-6 py-4 text-lg shadow-sm transition-all",
                    msg.sender === 'You' 
                      ? "bg-primary text-primary-foreground rounded-tl-[2rem] rounded-bl-[2rem] rounded-br-[2rem]" 
                      : "bg-white border rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[2rem]"
                  )}>
                    {msg.type === 'file' ? (
                        <div className="flex items-center gap-4 py-2">
                            <div className="bg-white/20 p-3 rounded-xl">
                                <FileIcon className="h-8 w-8" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm">Dokumen Terlampir</span>
                                <span className="text-xs opacity-70 truncate max-w-[150px]">{msg.fileName}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-[10px] font-bold text-muted-foreground",
                    msg.sender === 'You' ? "justify-end" : "justify-start"
                  )}>
                    {msg.timestamp}
                    {msg.sender === 'You' && <CheckCheck className="h-3 w-3 text-primary" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </main>

      {/* Preview Lampiran sebelum dikirim */}
      {attachedFile && (
        <div className="px-8 py-3 bg-primary/5 border-t flex items-center justify-between animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <FileIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold truncate max-w-[200px]">{attachedFile.name}</span>
                    <span className="text-[10px] text-muted-foreground">{(attachedFile.size / 1024).toFixed(1)} KB • Siap dikirim</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setAttachedFile(null)} className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive">
                <X className="h-5 w-5" />
            </Button>
        </div>
      )}

      {/* Footer / Input Area */}
      <footer className="px-8 py-6 border-t bg-white">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            className="hidden" 
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleFileAttach}
            className="text-muted-foreground hover:text-primary h-12 w-12 rounded-full"
          >
            <Paperclip className="h-6 w-6" />
          </Button>
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Ketik pesan disini..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-[#f8f9fa] border-none text-lg h-16 px-6 rounded-3xl focus-visible:ring-primary/20"
            />
          </div>
          <Button 
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90 text-white rounded-[2rem] h-16 px-10 text-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            Kirim <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
