'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, QrCode, Building2, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const plans = [
  { id: 'free', name: 'Gratis Dasar', price: 'Rp 0', amount: 0 },
  { id: 'weekly', name: 'Pendamping Mingguan', price: 'Rp 150.000', amount: 150000 },
  { id: 'monthly', name: 'Sahabat Bulanan', price: 'Rp 500.000', amount: 500000 },
  { id: 'ondemand', name: 'Sesi Sesuai Permintaan', price: 'Rp 80.000', amount: 80000 },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const planId = searchParams.get('plan');
  const customPrice = searchParams.get('price');
  const customName = searchParams.get('name');

  const selectedPlan = planId?.startsWith('session_') 
    ? { id: planId, name: `Sesi ${customName}`, price: `Rp ${Number(customPrice).toLocaleString('id-ID')}`, amount: Number(customPrice) }
    : plans.find(p => p.id === planId) || plans[0];

  const [paymentMethod, setPaymentMethod] = useState<'cc' | 'qris' | 'bank'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    if (paymentMethod === 'bank') {
        setStep(2);
    } else {
        router.push('/checkout/success');
    }
  };

  const handleFinishManual = () => {
    toast({
        title: "Konfirmasi Terkirim",
        description: "Admin akan memverifikasi bukti transfer Anda dalam 1x24 jam.",
    });
    router.push('/');
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in max-w-4xl">
      <header className="mb-10 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-12 w-12 hover:bg-primary/10">
            <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-4xl font-headline text-primary">Checkout Pembayaran</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Payment Selection */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 ? (
            <Card className="shadow-2xl rounded-[2.5rem] border-none bg-card overflow-hidden">
                <CardHeader className="p-10 pb-6">
                    <CardTitle className="text-3xl font-headline">Pilih Metode Pembayaran</CardTitle>
                    <CardDescription className="text-lg">Pilih cara pembayaran yang paling nyaman bagi Anda.</CardDescription>
                </CardHeader>
                <CardContent className="px-10 space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)} className="space-y-4">
                        <Label 
                            className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-primary bg-primary/10' : 'border-muted bg-muted/20'}`}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value="qris" />
                                <QrCode className="h-8 w-8 text-primary" />
                                <div className="space-y-1 text-left">
                                    <p className="text-xl font-bold">QRIS (GoPay, OVO, Dana)</p>
                                    <p className="text-sm text-muted-foreground">Pembayaran instan & otomatis</p>
                                </div>
                            </div>
                        </Label>

                        <Label 
                            className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cc' ? 'border-primary bg-primary/10' : 'border-muted bg-muted/20'}`}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value="cc" />
                                <CreditCard className="h-8 w-8 text-primary" />
                                <div className="space-y-1 text-left">
                                    <p className="text-xl font-bold">Kartu Kredit / Debit</p>
                                    <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                                </div>
                            </div>
                        </Label>

                        <Label 
                            className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/10' : 'border-muted bg-muted/20'}`}
                        >
                            <div className="flex items-center gap-4">
                                <RadioGroupItem value="bank" />
                                <Building2 className="h-8 w-8 text-primary" />
                                <div className="space-y-1 text-left">
                                    <p className="text-xl font-bold">Transfer Bank Manual</p>
                                    <p className="text-sm text-muted-foreground">Verifikasi manual oleh admin (1x24 jam)</p>
                                </div>
                            </div>
                        </Label>
                    </RadioGroup>

                    {paymentMethod === 'cc' && (
                        <div className="mt-6 p-8 border rounded-3xl bg-muted/10 space-y-6 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-2">
                                <Label className="text-lg">Nomor Kartu</Label>
                                <Input placeholder="1234 5678 9012 3456" className="h-16 text-xl rounded-xl border-none bg-background/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-lg">Masa Berlaku (MM/YY)</Label>
                                    <Input placeholder="12/26" className="h-16 text-xl rounded-xl border-none bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-lg">CVV</Label>
                                    <Input placeholder="123" className="h-16 text-xl rounded-xl border-none bg-background/50" type="password" />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'qris' && (
                        <div className="mt-6 p-10 border rounded-[2rem] bg-muted/10 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-2">
                            <p className="mb-8 text-xl text-center font-medium opacity-70">Scan QR di bawah ini dengan aplikasi e-wallet Anda</p>
                            <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl">
                                <Image 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=SEHATERA_PAYMENT" 
                                    alt="Payment QRIS" 
                                    width={300} 
                                    height={300}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="p-10 pt-4">
                    <Button 
                        className="w-full text-2xl h-24 font-bold rounded-[1.5rem] shadow-xl shadow-primary/20" 
                        onClick={handlePayment}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <><Loader2 className="mr-3 h-8 w-8 animate-spin" /> Memproses...</>
                        ) : (
                            `Bayar ${selectedPlan.price}`
                        )}
                    </Button>
                </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-2xl border-none bg-card rounded-[2.5rem] overflow-hidden">
                <CardHeader className="text-center p-10">
                    <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-14 w-14 text-primary" />
                    </div>
                    <CardTitle className="text-4xl font-headline">Menunggu Bukti Transfer</CardTitle>
                    <CardDescription className="text-xl">Silakan selesaikan transfer Anda ke rekening di bawah ini.</CardDescription>
                </CardHeader>
                <CardContent className="px-10 space-y-10">
                    <div className="p-10 bg-muted/10 rounded-[2rem] space-y-8">
                        <div className="flex justify-between items-center pb-4 border-b border-muted">
                            <span className="text-xl text-muted-foreground">Bank</span>
                            <span className="text-xl font-bold">Bank Central Asia (BCA)</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-muted">
                            <span className="text-xl text-muted-foreground">Nomor Rekening</span>
                            <span className="font-bold text-3xl tracking-wider text-primary">1234 5678 90</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-muted">
                            <span className="text-xl text-muted-foreground">Atas Nama</span>
                            <span className="text-xl font-bold uppercase">PT SEHATERA ABADI</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-xl text-muted-foreground">Total Transfer</span>
                            <span className="font-bold text-4xl text-primary">{selectedPlan.price}</span>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Label className="text-2xl font-headline">Unggah Bukti Transfer</Label>
                        <div className="border-4 border-dashed rounded-[2.5rem] p-16 text-center bg-muted/10 cursor-pointer hover:bg-primary/5 transition-colors border-muted">
                            <p className="text-xl text-muted-foreground">Klik untuk pilih file bukti transfer (.jpg, .png)</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-10">
                    <Button className="w-full h-24 text-2xl rounded-[1.5rem] font-bold shadow-xl shadow-primary/20" onClick={handleFinishManual}>
                        Konfirmasi Saya Sudah Transfer
                    </Button>
                </CardFooter>
            </Card>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-1">
            <Card className="shadow-2xl sticky top-36 rounded-[2.5rem] border-none bg-card">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-headline">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between text-lg">
                        <span className="text-muted-foreground">Layanan</span>
                        <span className="font-bold text-right">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span className="text-muted-foreground">Metode</span>
                        <span className="capitalize font-medium">{paymentMethod.toUpperCase()}</span>
                    </div>
                    <hr className="my-6 border-muted" />
                    <div className="flex justify-between text-3xl font-bold text-primary">
                        <span>Total</span>
                        <span>{selectedPlan.price}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                    <div className="flex items-center gap-3 text-lg text-primary bg-primary/10 py-4 rounded-[1.5rem] w-full justify-center font-bold shadow-sm">
                        <ShieldCheck className="h-6 w-6" />
                        Pembayaran Aman
                    </div>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <CheckoutContent />
    </Suspense>
  );
}
