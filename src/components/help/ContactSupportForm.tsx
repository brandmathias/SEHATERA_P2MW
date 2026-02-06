'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContactSupportForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !email || !message) {
      toast({
        variant: 'destructive',
        title: 'Form Belum Lengkap',
        description: 'Mohon isi semua kolom untuk mengirim pesan.',
      });
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Pesan Terkirim!',
      description: 'Pesan Anda telah terkirim ke tim support kami.',
    });

    // Reset form fields
    setName('');
    setEmail('');
    setMessage('');

    // Redirect to home page for clear feedback
    router.push('/');
    
    // It's good practice to keep the state change after the navigation
    setIsSubmitting(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center">
            <Mail className="mr-2 h-6 w-6 text-primary"/>Kirim Pesan ke Tim Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-md">Nama Anda</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="text-lg p-3 h-auto"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-md">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alamat@email.com"
              className="text-lg p-3 h-auto"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-md">Pesan</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan Anda di sini..."
              className="min-h-[120px] text-lg p-3"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full text-lg py-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
