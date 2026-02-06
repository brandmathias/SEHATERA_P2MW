'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockSessions = [
  { 
    id: '1', 
    title: 'Senam Ringan Lansia', 
    description: 'Virtual Zoom bersama Komunitas Sejahtera', 
    time: '08:00', 
    period: 'PAGI',
    type: 'video',
    color: 'bg-primary/10',
    textColor: 'text-primary'
  },
  { 
    id: '2', 
    title: 'Makan Siang & Obat', 
    description: 'Vitamin C dan Kalsium', 
    time: '12:30', 
    period: 'SIANG',
    type: 'check',
    color: 'bg-orange-500/10',
    textColor: 'text-orange-500'
  },
];

export function ScheduledSessions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-headline font-bold text-foreground">Jadwal Hari Ini</h2>
        <Link href="/sessions/book" className="text-primary font-bold text-lg hover:underline flex items-center">
          Lihat Semua
        </Link>
      </div>
      
      <div className="space-y-4">
        {mockSessions.map((session) => (
          <Card key={session.id} className="border-none shadow-sm bg-card rounded-[1.5rem] overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={cn("w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-inner", session.color)}>
                  <span className={cn("text-xl font-bold", session.textColor)}>{session.time}</span>
                  <span className={cn("text-[10px] font-bold tracking-widest", session.textColor)}>{session.period}</span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-foreground">{session.title}</h4>
                  <p className="text-muted-foreground">{session.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {session.type === 'video' ? (
                  <Button size="icon" className="h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90">
                    <Video className="h-6 w-6 text-white" />
                  </Button>
                ) : (
                  <Button size="icon" variant="outline" className="h-14 w-14 rounded-full bg-green-500/10 border-none hover:bg-green-500/20">
                    <Check className="h-6 w-6 text-green-500" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
