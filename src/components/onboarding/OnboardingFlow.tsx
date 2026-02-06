
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import type { UserRole } from '@/types';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { CheckCircle, Users, Heart, Smile } from 'lucide-react';

const totalSteps = 3;

const StepContent = ({ step, userRole }: { step: number; userRole: UserRole | undefined }) => {
  switch (step) {
    case 1:
      return (
        <>
          <Image 
            src="https://images.unsplash.com/photo-1518428441065-3852702302a4?q=80&w=400&auto=format&fit=crop" 
            alt="Illustration welcoming user" 
            width={400} 
            height={300} 
            className="rounded-lg mb-8 mx-auto shadow-md object-cover"
          />
          <CardTitle className="text-4xl font-headline mb-3">Selamat Datang di SEHATERA!</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Kami senang Anda bergabung. Mari siapkan profil Anda agar dapat segera terhubung.
          </CardDescription>
        </>
      );
    case 2:
      return (
        <>
          <Image 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit&crop" 
            alt="Illustration for profile details" 
            width={400} 
            height={300} 
            className="rounded-lg mb-8 mx-auto shadow-md object-cover"
          />
          <CardTitle className="text-4xl font-headline mb-3">Ceritakan Tentang Diri Anda</CardTitle>
          <CardDescription className="text-xl text-muted-foreground mb-6">
            Informasi ini membantu kami menyesuaikan pengalaman SEHATERA untuk Anda.
          </CardDescription>
          <div className="space-y-6 text-left">
            <div>
              <Label htmlFor="interests" className="text-lg">Minat / Keahlian / Area Dukungan</Label>
              <Textarea id="interests" placeholder="Contoh: Berkebun, Bercerita, Bantuan Teknologi, Mendengarkan..." className="text-lg min-h-[120px] p-4 mt-2"/>
              <p className="text-sm text-muted-foreground mt-1">
                {userRole === 'elderly' && "Apa hobi atau topik favorit Anda untuk dibicarakan?"}
                {userRole === 'admin' && "Tugas administrasi apa yang ingin Anda kelola?"}
                {userRole === 'volunteer' && "Jenis pendampingan apa yang bisa Anda tawarkan?"}
              </p>
            </div>
            <div>
              <Label htmlFor="availability" className="text-lg">Ketersediaan Pilihan (Opsional)</Label>
              <Input id="availability" placeholder="Contoh: Pagi di hari kerja, Fleksibel" className="text-lg p-4 h-auto mt-2"/>
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
           <Image 
            src="https://images.unsplash.com/photo-1529333166437-77501bd29b2b?q=80&w=400&auto=format&fit&crop" 
            alt="Illustration showing community connection" 
            width={400} 
            height={300} 
            className="rounded-lg mb-8 mx-auto shadow-md object-cover"
          />
          <CardTitle className="text-4xl font-headline mb-3">Anda Sudah Siap!</CardTitle>
          <CardDescription className="text-xl text-muted-foreground mb-6">
            Profil SEHATERA Anda telah siap. Mulai jelajahi fitur-fitur utama kami.
          </CardDescription>
          <div className="space-y-4 text-xl text-left max-w-md mx-auto">
            <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
                <Smile className="h-8 w-8 mr-4 text-primary"/>
                <span>Nikmati inspirasi harian.</span>
            </div>
            <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
                <Users className="h-8 w-8 mr-4 text-primary"/>
                <span>Terhubung dengan pendamping.</span>
            </div>
            <div className="flex items-center p-3 bg-secondary/30 rounded-lg">
                <Heart className="h-8 w-8 mr-4 text-primary"/>
                <span>Berbagi di dalam komunitas.</span>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};


export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete
      router.push('/');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl animate-fade-in">
      <CardHeader className="text-center">
        <Progress value={progressPercentage} className="w-full mb-4 h-3" />
        <p className="text-sm text-muted-foreground">Langkah {currentStep} dari {totalSteps}</p>
      </CardHeader>
      <CardContent className="text-center px-4 md:px-8 py-8">
        <StepContent step={currentStep} userRole={user?.role} />
      </CardContent>
      <CardFooter className="flex justify-between pt-6 px-8 pb-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="text-lg px-8 py-5">
          Kembali
        </Button>
        <Button onClick={handleNext} className="text-lg px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground">
          {currentStep === totalSteps ? (
            <>
            Selesai <CheckCircle className="ml-2 h-5 w-5"/>
            </>
            ) : 'Selanjutnya'}
        </Button>
      </CardFooter>
    </Card>
  );
}
