'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const mockEvents = [
  {
    id: 'e1',
    title: 'Senam Sehat Minggu Pagi',
    description: 'Mari bergabung untuk senam bersama agar tubuh tetap bugar dan hati gembira.',
    date: 'Minggu, 27 Okt 2024',
    time: '06:30 - 08:00',
    location: 'Taman Kota Bandung',
    category: 'Olahraga',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
    attendees: 45
  },
  {
    id: 'e2',
    title: 'Workshop Menanam Hidroponik',
    description: 'Belajar cara menanam sayuran di lahan terbatas dengan metode hidroponik.',
    date: 'Selasa, 29 Okt 2024',
    time: '10:00 - 12:00',
    location: 'Gedung Komunitas',
    category: 'Hobi',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800',
    attendees: 20
  }
];

export default function EventsPage() {
  return (
    <div className="container mx-auto py-12 px-6 animate-fade-in max-w-6xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-headline text-primary">Acara Mendatang</h1>
        <p className="text-xl text-muted-foreground mt-3">Bergabunglah dengan berbagai kegiatan positif bersama komunitas.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden border-none shadow-lg rounded-[2.5rem] bg-white group hover:shadow-xl transition-shadow">
            <div className="relative h-64 w-full">
              <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <Badge className="absolute top-4 left-4 bg-white/90 text-primary hover:bg-white">{event.category}</Badge>
            </div>
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-headline text-primary leading-tight">{event.title}</CardTitle>
              <CardDescription className="text-lg mt-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{event.attendees} Peserta</span>
                </div>
              </div>
              <Button className="w-full text-xl py-7 rounded-2xl bg-primary hover:bg-primary/90 mt-4">
                Ikuti Acara
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
