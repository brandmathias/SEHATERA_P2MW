'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  History, 
  CalendarDays, 
  Settings, 
  LogOut, 
  Video, 
  Phone, 
  MessageSquare, 
  Star, 
  Clock, 
  Users,
  CheckCircle2,
  Calendar as CalendarIcon,
  Bell,
  Edit2,
  Check
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CustomThemeToggle } from '@/components/layout/CustomThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const stats = [
  {
    label: 'Total Sesi Bulan Ini',
    value: '45',
    growth: '+5%',
    icon: Users,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    label: 'Rating Rata-rata',
    value: '4.9',
    growth: '+0.1',
    icon: Star,
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-500/10',
  },
  {
    label: 'Total Jam Relawan',
    value: '120',
    unit: 'jam',
    growth: '+10h',
    icon: Clock,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
];

const initialRequests = [
  {
    id: 'req1',
    name: 'Budi Santoso',
    type: 'Video Call',
    icon: Video,
    path: '/video-call',
    time: 'Menunggu sejak 10:00 WIB',
    status: 'online',
    typeColor: 'text-primary',
  },
  {
    id: 'req2',
    name: 'Siti Aminah',
    type: 'Suara',
    icon: Phone,
    path: '/voice-call',
    time: 'Menunggu sejak 10:15 WIB',
    status: 'online',
    typeColor: 'text-blue-500',
  },
  {
    id: 'req3',
    name: 'Haryono',
    type: 'Chat',
    icon: MessageSquare,
    path: '/chat',
    time: 'Menunggu sejak 10:30 WIB',
    status: 'away',
    typeColor: 'text-orange-500',
  },
];

const mockHistory = [
  { id: 'h1', name: 'Ratna Sari', type: 'Video Call', date: '23 Okt 2023', duration: '30 menit', rating: 5 },
  { id: 'h2', name: 'Bambang', type: 'Chat', date: '22 Okt 2023', duration: '45 menit', rating: 4 },
  { id: 'h3', name: 'Wati', type: 'Suara', date: '21 Okt 2023', duration: '20 menit', rating: 5 },
];

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "19:00 - 21:00"
];

export default function VolunteerDashboardPage() {
  const { user, logout, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [requests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
  
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, string[]>>({});
  const [currentEditingDate, setCurrentEditingDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setMounted(true);
    if (user) {
      setEditName(user.name);
      setEditBio(user.bio || '');
    }
  }, [user]);

  const handleAcceptSession = (id: string, name: string, path: string) => {
    toast({
      title: "Sesi Diterima",
      description: `Menghubungkan Anda dengan ${name}...`,
    });
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun Relawan.",
    });
  };

  const handleUpdateProfile = () => {
    updateUserProfile(editName, editBio);
    setIsProfileDialogOpen(false);
    toast({
      title: "Profil Diperbarui",
      description: "Nama dan bio Anda telah berhasil disimpan.",
    });
  };

  const handleUpdateSchedule = () => {
    const totalDates = Object.keys(availabilityMap).length;
    setIsScheduleDialogOpen(false);
    toast({
      title: "Jadwal Disimpan",
      description: `Ketersediaan Anda untuk ${totalDates} tanggal telah diperbarui.`,
    });
  };

  const toggleTimeSlot = (slot: string) => {
    if (!currentEditingDate) return;
    
    const dateKey = currentEditingDate.toDateString();
    setAvailabilityMap(prev => {
      const existingSlots = prev[dateKey] || [];
      const updatedSlots = existingSlots.includes(slot)
        ? existingSlots.filter(s => s !== slot)
        : [...existingSlots, slot];
      
      const newMap = { ...prev, [dateKey]: updatedSlots };
      
      if (updatedSlots.length === 0) {
        delete newMap[dateKey];
      }
      
      return newMap;
    });
  };

  const selectedDates = Object.keys(availabilityMap).map(d => new Date(d));
  const currentSlots = currentEditingDate ? (availabilityMap[currentEditingDate.toDateString()] || []) : [];

  if (!mounted) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <section className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-4 text-foreground">
                Permintaan Masuk 
                <span className="bg-primary text-white text-sm h-7 w-7 flex items-center justify-center rounded-full font-bold">
                  {requests.length}
                </span>
              </h2>
            </div>

            <div className="space-y-5">
              {requests.map((req) => (
                <Card key={req.id} className="border-none shadow-sm rounded-[2rem] bg-card hover:shadow-md transition-all">
                  <CardContent className="p-8 flex items-center gap-8">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-2 border-primary/10 shadow-sm bg-muted">
                        <AvatarFallback className="text-2xl font-bold text-primary">
                          {req.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white dark:border-card",
                        req.status === 'online' ? "bg-green-500" : "bg-orange-400"
                      )} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground">{req.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <req.icon className={cn("h-5 w-5", req.typeColor)} />
                          <span className={cn("text-md font-bold", req.typeColor)}>{req.type}</span>
                        </div>
                        <p className="text-md text-muted-foreground font-medium">• {req.time}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="rounded-2xl px-8 h-14 font-bold border-muted-foreground/20 hover:bg-muted/30">
                        Detail Profil
                      </Button>
                      <Button 
                        className="rounded-2xl px-10 h-14 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                        onClick={() => handleAcceptSession(req.id, req.name, req.path)}
                      >
                        <CheckCircle2 className="mr-3 h-6 w-6" /> Terima Sesi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      case 'history':
        return (
          <section className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold text-foreground mb-8">Riwayat Sesi Selesai</h2>
            {mockHistory.map((item) => (
              <Card key={item.id} className="border-none shadow-sm rounded-[2rem] bg-card">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-16 w-16 bg-muted">
                      <AvatarFallback className="text-xl font-bold text-primary">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="text-muted-foreground">{item.type} • {item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{item.duration}</p>
                    <div className="flex gap-1 justify-end mt-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        );
      case 'schedule':
        return (
          <section className="animate-fade-in text-center py-20 bg-card rounded-[3rem] border-2 border-dashed border-muted">
            <CalendarIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Jadwal Mendatang</h2>
            <p className="text-muted-foreground mt-2">
              Anda memiliki ketersediaan pada {selectedDates.length} tanggal.
            </p>
            <Button 
              className="mt-8 rounded-full px-8 bg-primary h-14 font-bold"
              onClick={() => setIsScheduleDialogOpen(true)}
            >
              Atur Ketersediaan Kalender & Jam
            </Button>
          </section>
        );
      case 'settings':
        return (
          <section className="animate-fade-in max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Pengaturan Akun</h2>
            <Card className="border-none shadow-sm rounded-[2rem] bg-card">
              <CardContent className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-lg font-bold">Status Relawan Aktif</Label>
                    <p className="text-sm text-muted-foreground">Matikan jika Anda tidak ingin menerima permintaan baru.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-lg font-bold">Notifikasi Suara</Label>
                    <p className="text-sm text-muted-foreground">Putar suara saat ada permintaan masuk.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4 space-y-4">
                  <Label className="text-lg font-bold">Bio Ringkas</Label>
                  <p className="p-4 bg-muted/30 rounded-xl text-muted-foreground italic">
                    "{user?.bio || 'Belum ada bio.'}"
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-xl w-full h-12 font-bold flex items-center justify-center gap-2"
                    onClick={() => setIsProfileDialogOpen(true)}
                  >
                    <Edit2 className="h-4 w-4" /> Ubah Profil &amp; Bio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Navigasi - Fixed Scroll Issue */}
      <aside className="w-[300px] bg-card border-r border-border flex flex-col p-8 sticky top-0 h-screen overflow-y-auto shrink-0 shadow-lg">
        <div className="flex items-center gap-4 mb-16 shrink-0">
          <Avatar className="h-14 w-14 border-2 border-primary/20 bg-muted">
            <AvatarFallback className="font-bold text-xl text-primary">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'SW'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-bold text-xl text-foreground leading-tight truncate">{user?.name || "Sarah Wijaya"}</p>
            <p className="text-sm text-primary font-bold">Relawan Aktif</p>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          <SidebarLink 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarLink 
            icon={History} 
            label="Riwayat Sesi" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          />
          <SidebarLink 
            icon={CalendarDays} 
            label="Jadwal Saya" 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')}
          />
          <SidebarLink 
            icon={Settings} 
            label="Pengaturan" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        {/* Theme Toggle & Logout Area */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col gap-6 shrink-0">
          <div className="px-2">
            <CustomThemeToggle />
          </div>
          <Button 
            variant="outline" 
            className="rounded-full py-6 text-foreground font-bold border-muted-foreground/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" /> Keluar Akun
          </Button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-12 max-w-7xl overflow-y-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold font-headline text-foreground">
              {activeTab === 'dashboard' && 'Dashboard Relawan'}
              {activeTab === 'history' && 'Riwayat Sesi'}
              {activeTab === 'schedule' && 'Jadwal Sesi'}
              {activeTab === 'settings' && 'Pengaturan'}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Halo {user?.name?.split(' ')[0] || 'Sarah'}, mari bantu lansia tetap terhubung dan bahagia hari ini.
            </p>
          </div>
          <div className="bg-card px-6 py-3 rounded-full shadow-sm border border-border flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-muted-foreground">Selasa, 24 Oktober 2023</span>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2.5rem] bg-card">
                <CardContent className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-4 rounded-2xl", stat.iconBg)}>
                      <stat.icon className={cn("h-7 w-7", stat.iconColor)} />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1">
                      {stat.growth}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-bold mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-foreground">{stat.value}</span>
                    {stat.unit && <span className="text-muted-foreground font-bold ml-1">{stat.unit}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {renderContent()}

        {/* Edit Profile Dialog */}
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-headline">Ubah Profil &amp; Bio</DialogTitle>
              <DialogDescription>
                Sesuaikan informasi publik Anda agar lansia merasa lebih nyaman.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-md font-bold">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio" className="text-md font-bold">Bio Ringkas</Label>
                <Textarea 
                  id="bio" 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Ceritakan sedikit tentang Anda..."
                  className="rounded-xl min-h-[120px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateProfile} className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90">
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Schedule Dialog */}
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="sm:max-w-[850px] rounded-[2rem] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-headline">Atur Ketersediaan Waktu</DialogTitle>
              <DialogDescription>
                Pilih tanggal di kalender, lalu tentukan jam ketersediaan <span className="text-primary font-bold">khusus untuk tanggal tersebut</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
              <div className="space-y-4">
                <Label className="text-lg font-bold block mb-2">1. Pilih & Fokus Tanggal</Label>
                <div className="border rounded-2xl p-4 bg-card shadow-sm flex justify-center">
                    <Calendar
                        mode="single"
                        selected={currentEditingDate}
                        onSelect={setCurrentEditingDate}
                        modifiers={{
                          hasAvailability: selectedDates
                        }}
                        modifiersClassNames={{
                          hasAvailability: "bg-primary/10 text-primary font-bold rounded-full border-2 border-primary/20"
                        }}
                        className="rounded-md border-none"
                    />
                </div>
                <div className="p-4 bg-muted/30 rounded-2xl text-sm">
                  <p>Tanggal dipilih: <span className="font-bold text-primary">{currentEditingDate?.toLocaleDateString('id-ID', { dateStyle: 'long' })}</span></p>
                  <p className="text-xs text-muted-foreground mt-1 italic">Klik tanggal lain untuk mengatur jam yang berbeda.</p>
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-lg font-bold block mb-2">
                  2. Jam Tersedia untuk {currentEditingDate?.getDate()} {currentEditingDate?.toLocaleString('default', { month: 'short' })}
                </Label>
                <div className="grid grid-cols-1 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => toggleTimeSlot(slot)}
                        className={cn(
                          "flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all font-bold",
                          currentSlots.includes(slot) 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-muted text-muted-foreground hover:border-primary/20"
                        )}
                      >
                        <span className="text-lg">{slot}</span>
                        {currentSlots.includes(slot) && <Check className="h-6 w-6" />}
                      </button>
                    ))}
                </div>
                {currentSlots.length === 0 && (
                  <div className="text-center p-6 border-2 border-dashed rounded-2xl text-muted-foreground bg-muted/5">
                    Belum ada jam dipilih untuk tanggal ini.
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={handleUpdateSchedule} className="w-full h-16 rounded-[1.5rem] text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                Simpan Semua Jadwal Ketersediaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <footer className="mt-24 pt-12 border-t text-center text-muted-foreground/60 font-medium">
          © 2023 SEHATERA. Memberdayakan lansia, menghubungkan hati.
        </footer>
      </main>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-lg",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      <Icon className={cn("h-6 w-6", active ? "text-primary" : "text-muted-foreground")} />
      <span>{label}</span>
    </button>
  );
}
