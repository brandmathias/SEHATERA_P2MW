'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Phone, Video, ChevronLeft, ChevronRight, Check, Heart, Brain, ShieldCheck, Headphones, ArrowRight, Star, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sessionTypes = [
  { 
    id: 'chat', 
    label: 'Chat', 
    price: 20000, 
    description: 'Obrolan teks yang ramah', 
    icon: MessageSquare,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  { 
    id: 'voice', 
    label: 'Voice Call', 
    price: 30000, 
    description: 'Percakapan suara yang hangat', 
    icon: Phone,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  { 
    id: 'video', 
    label: 'Video Call', 
    price: 50000, 
    description: 'Koneksi tatap muka langsung', 
    icon: Video,
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  },
];

const volunteers = [
  {
    id: 'v1',
    name: 'Alice Wulandari',
    specialty: 'Pendengar Setia & Bercerita',
    rating: 4.9,
    reviews: 124,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    online: true
  },
  {
    id: 'v2',
    name: 'Budi Santoso',
    specialty: 'Bantuan Teknologi & Berita',
    rating: 4.8,
    reviews: 89,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    online: true
  },
  {
    id: 'v3',
    name: 'Siti Aminah',
    specialty: 'Kesehatan & Berkebun',
    rating: 5.0,
    reviews: 56,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150',
    online: false
  }
];

const days = [
  { id: 12, day: 'SEN', active: true },
  { id: 13, day: 'SEL', active: false },
  { id: 14, day: 'RAB', active: false },
  { id: 15, day: 'KAM', active: false },
  { id: 16, day: 'JUM', active: false },
  { id: 17, day: 'SAB', active: false },
];

const timeSlots = [
  '09:00', '10:00', '11:30', '14:00', '15:30', '17:00'
];

export function BookingForm() {
  const [selectedType, setSelectedType] = useState('chat');
  const [selectedVolunteer, setSelectedVolunteer] = useState('v1');
  const [selectedDate, setSelectedDate] = useState(12);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentType = sessionTypes.find(t => t.id === selectedType);
  const currentVolunteer = volunteers.find(v => v.id === selectedVolunteer);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    router.push(`/checkout?plan=session_${selectedType}&price=${currentType?.price}&name=${currentType?.label}&volunteer=${currentVolunteer?.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-headline text-primary mb-4">Pesan Sesi Pendampingan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Terhubung dengan pendamping yang ramah untuk mengobrol, suara, atau video. Kami di sini untuk mendengarkan dan berbagi momen bersama Anda.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Booking Selection */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section 1: Choose Session Type */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">1</div>
              <h2 className="text-2xl font-bold">Pilih Jenis Layanan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sessionTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={cn(
                    "relative cursor-pointer transition-all duration-300 border-2 p-8 flex flex-col items-center text-center space-y-4 rounded-[2.5rem] shadow-sm bg-card",
                    selectedType === type.id ? "border-primary ring-2 ring-primary/20 scale-[1.02]" : "border-border/50 hover:border-primary/50"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  {selectedType === type.id && (
                    <div className="absolute top-5 right-5 bg-primary text-white rounded-full p-1 shadow-md">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <div className={cn(
                    "h-20 w-20 rounded-full flex items-center justify-center shadow-inner",
                    type.bgColor
                  )}>
                    <type.icon className={cn("h-10 w-10", type.iconColor)} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{type.label}</h3>
                    <p className="text-primary font-bold mt-1">Rp {type.price.toLocaleString('id-ID')}</p>
                    <p className="text-muted-foreground text-xs mt-1">{type.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 2: Choose Volunteer */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">2</div>
              <h2 className="text-2xl font-bold">Pilih Pendamping Anda</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteers.map((v) => (
                <Card 
                  key={v.id}
                  className={cn(
                    "relative cursor-pointer transition-all duration-300 border-2 p-6 flex items-center gap-4 rounded-[2rem] shadow-sm bg-card",
                    selectedVolunteer === v.id ? "border-primary ring-1 ring-primary/20" : "border-border/50 hover:border-primary/30"
                  )}
                  onClick={() => setSelectedVolunteer(v.id)}
                >
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-background shadow-md">
                      <AvatarImage src={v.avatar} alt={v.name} />
                      <AvatarFallback>{v.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {v.online && (
                      <div className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold">{v.name}</h4>
                      {selectedVolunteer === v.id && <UserCheck className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{v.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{v.rating}</span>
                      <span className="text-xs text-muted-foreground">({v.reviews} ulasan)</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 3: Select Date & Time */}
          <section className="bg-card rounded-[2.5rem] border border-border/50 p-10 shadow-sm space-y-10">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20">3</div>
              <h2 className="text-2xl font-bold">Pilih Tanggal & Waktu</h2>
            </div>

            {/* Date Selection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Oktober 2024</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted/20"><ChevronLeft className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted/20"><ChevronRight className="h-5 w-5" /></Button>
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {days.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDate(d.id)}
                    className={cn(
                      "flex flex-col items-center justify-center min-w-[100px] h-32 rounded-[2rem] transition-all",
                      selectedDate === d.id 
                        ? "bg-primary text-white shadow-xl shadow-primary/30 scale-[1.05]" 
                        : "bg-muted/30 text-foreground hover:bg-muted/50"
                    )}
                  >
                    <span className="text-xs font-bold tracking-widest mb-2">{d.day}</span>
                    <span className="text-4xl font-bold">{d.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-muted-foreground">Waktu Tersedia</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant="ghost"
                    className={cn(
                      "h-14 text-lg font-medium rounded-2xl transition-all",
                      selectedTime === time 
                        ? "bg-primary text-white hover:bg-primary/90 shadow-lg" 
                        : "bg-muted/30 text-foreground hover:bg-muted/40"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Centered Confirm Button */}
          <div className="flex justify-center pt-8">
            <Button 
              className="min-w-[350px] h-20 text-2xl font-bold rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95"
              onClick={handleConfirm}
              disabled={isSubmitting}
            >
              Lanjutkan Pembayaran <ArrowRight className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Right Side: Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Why a Companion Card */}
          <Card className="overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-card h-fit">
            <div className="relative h-72 w-full">
              <Image 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop" 
                alt="Smiling Elderly Woman" 
                fill 
                className="object-cover"
                data-ai-hint="Elderly woman"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-headline font-bold text-white text-left">Kenapa Pendamping?</h3>
              </div>
            </div>
            
            <CardContent className="p-10 space-y-8 text-left">
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="p-3 h-fit rounded-full bg-pink-500/10">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Dukungan Emosional</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Kurangi rasa kesepian dengan percakapan yang bermakna.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="p-3 h-fit rounded-full bg-purple-500/10">
                    <Brain className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Stimulasi Mental</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Diskusi menarik untuk menjaga pikiran tetap aktif dan tajam.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="p-3 h-fit rounded-full bg-blue-500/10">
                    <ShieldCheck className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Keamanan & Perhatian</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Wajah ramah yang siap membantu dan memastikan semua baik-baik saja.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-8 rounded-[2rem] text-center italic relative border border-primary/10">
                <p className="text-md text-primary leading-relaxed font-medium">
                  "Mengobrol dengan Alice setiap hari Selasa membuat seluruh minggu saya jauh lebih cerah."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <div className="bg-muted/20 rounded-[2.5rem] p-8 border border-primary/10 flex items-center gap-6 shadow-sm">
            <div className="bg-card p-4 rounded-2xl shadow-sm">
              <Headphones className="h-8 w-8 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xl font-bold">Butuh Bantuan?</p>
              <p className="text-primary font-bold text-lg">Hubungi: 0-800-SEHAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
