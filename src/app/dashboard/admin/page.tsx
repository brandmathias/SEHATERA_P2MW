
'use client';

import { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  ShieldAlert, 
  BarChart3, 
  Search, 
  UserCog, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  ArrowUpRight,
  CalendarDays,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import type { User, Transaction, Session, CommunityPost } from '@/types';

// Mock Data for Admin
const mockUsers: User[] = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi@example.com', role: 'elderly', status: 'active', createdAt: '2024-01-15' },
  { id: 'u2', name: 'Siti Aminah', email: 'siti@example.com', role: 'elderly', status: 'active', createdAt: '2024-01-18' },
  { id: 'u3', name: 'Andi Wijaya', email: 'andi@relawan.com', role: 'volunteer', status: 'active', createdAt: '2024-02-01' },
  { id: 'u4', name: 'Rina Kartika', email: 'rina@admin.com', role: 'admin', status: 'active', createdAt: '2023-12-10' },
  { id: 'u5', name: 'Joko Susilo', email: 'joko@example.com', role: 'elderly', status: 'suspended', createdAt: '2024-01-05' },
];

const mockPendingPayments: Transaction[] = [
  { id: 'tx1', userName: 'Budi Santoso', planName: 'Sahabat Bulanan', amount: 'Rp 500.000', date: '2024-07-28', status: 'pending', paymentMethod: 'Transfer Manual' },
  { id: 'tx2', userName: 'Siti Aminah', planName: 'Pendamping Mingguan', amount: 'Rp 150.000', date: '2024-07-29', status: 'pending', paymentMethod: 'Transfer Manual' },
];

const mockReportedPosts: CommunityPost[] = [
  { id: 'p1', author: { id: 'u9', name: 'Spammer Bot' }, content: 'Beli obat kuat klik link ini!!!', timestamp: '2024-07-29T10:00:00Z', likes: 0, comments: [], reports: 5 },
];

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handleApprovePayment = (id: string) => {
    toast({ title: 'Pembayaran Disetujui', description: `Transaksi ${id} telah berhasil dikonfirmasi.` });
  };

  const handleSuspendUser = (name: string) => {
    toast({ variant: 'destructive', title: 'User Ditangguhkan', description: `Akun ${name} telah dinonaktifkan sementara.` });
  };

  return (
    <div className="container mx-auto py-10 px-4 animate-fade-in">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-headline text-primary">Panel Super Admin</h1>
          <p className="text-xl text-muted-foreground mt-2">Pusat kendali ekosistem SEHATERA.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-lg">
                <Activity className="mr-2 h-5 w-5" /> Log Sistem
            </Button>
            <Button className="text-lg">
                <ShieldAlert className="mr-2 h-5 w-5" /> Laporan Darurat
            </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Pengguna" value="1.248" description="+12% dari bulan lalu" icon={Users} color="text-blue-500" />
        <StatCard title="Sesi Berjalan" value="42" description="Sesi chat & video aktif" icon={Activity} color="text-green-500" />
        <StatCard title="Pendapatan (Juli)" value="Rp 12.5M" description="+5.2% dari target" icon={CreditCard} color="text-primary" />
        <StatCard title="Laporan Konten" value="3" description="Perlu moderasi segera" icon={ShieldAlert} color="text-destructive" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
          <TabsTrigger value="overview" className="text-lg py-3">Ringkasan</TabsTrigger>
          <TabsTrigger value="users" className="text-lg py-3">Manajemen User</TabsTrigger>
          <TabsTrigger value="payments" className="text-lg py-3">Verifikasi Bayar</TabsTrigger>
          <TabsTrigger value="moderation" className="text-lg py-3">Moderasi</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Aktivitas Platform Terbaru</CardTitle>
                <CardDescription>Ringkasan kejadian dalam 24 jam terakhir.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                    { action: 'User baru mendaftar', user: 'Ratna Sari', time: '2 menit lalu' },
                    { action: 'Sesi Video selesai', user: 'Ibu Wati & Relawan Andi', time: '15 menit lalu' },
                    { action: 'Laporan konten baru', user: 'Anonim', time: '1 jam lalu' },
                    { action: 'Pembayaran QRIS berhasil', user: 'Bapak Hartono', time: '2 jam lalu' },
                ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <p className="font-medium">{log.action}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{log.time}</span>
                    </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
               <CardHeader>
                <CardTitle className="text-2xl font-headline">Target Pendampingan</CardTitle>
                <CardDescription>Progress pemenuhan sesi bulanan.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <div className="relative h-48 w-48 flex items-center justify-center">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path className="stroke-muted" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="stroke-primary" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute text-center">
                        <p className="text-4xl font-bold">75%</p>
                        <p className="text-xs text-muted-foreground">Tercapai</p>
                    </div>
                </div>
                <p className="mt-6 text-center text-muted-foreground">750 dari 1000 sesi bulanan telah diselesaikan.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-headline">Daftar Seluruh Pengguna</CardTitle>
                <CardDescription>Kelola peran dan status akun.</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari nama atau email..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Terdaftar</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                          {user.status === 'active' ? 'Aktif' : 'Ditangguhkan'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi Akun</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/profile/${user.id}`)}>Lihat Profil</DropdownMenuItem>
                            <DropdownMenuItem>Ubah Peran</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleSuspendUser(user.name)}>
                              Tangguhkan Akun
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Verification Tab */}
        <TabsContent value="payments">
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Verifikasi Pembayaran Manual</CardTitle>
                <CardDescription>Antrean persetujuan transfer bank pengguna.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pengguna</TableHead>
                            <TableHead>Paket</TableHead>
                            <TableHead>Jumlah</TableHead>
                            <TableHead>Metode</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockPendingPayments.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-bold">{tx.userName}</TableCell>
                                <TableCell>{tx.planName}</TableCell>
                                <TableCell className="text-primary font-bold">{tx.amount}</TableCell>
                                <TableCell>{tx.paymentMethod}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button size="sm" variant="outline">Lihat Bukti</Button>
                                    <Button size="sm" onClick={() => handleApprovePayment(tx.id)}><CheckCircle2 className="mr-1 h-4 w-4"/> Setujui</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {mockPendingPayments.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">Tidak ada pembayaran yang menunggu verifikasi.</div>
                )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Moderasi Konten Komunitas</CardTitle>
                    <CardDescription>Tinjau postingan yang dilaporkan oleh pengguna lain.</CardDescription>
                </CardHeader>
                <CardContent>
                     {mockReportedPosts.map((post) => (
                         <div key={post.id} className="p-6 border rounded-lg flex flex-col md:flex-row gap-6 items-start justify-between bg-destructive/5">
                            <div className="space-y-2 flex-grow">
                                <div className="flex items-center gap-2">
                                    <Badge variant="destructive">{post.reports} Laporan</Badge>
                                    <span className="text-sm text-muted-foreground">Diposting oleh <strong>{post.author.name}</strong></span>
                                </div>
                                <p className="text-lg italic">"{post.content}"</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline">Abaikan</Button>
                                <Button variant="destructive">Hapus Postingan</Button>
                            </div>
                         </div>
                     ))}
                     {mockReportedPosts.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">Feed komunitas bersih dari laporan.</div>
                     )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, description, icon: Icon, color }: any) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
