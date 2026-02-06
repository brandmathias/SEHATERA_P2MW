import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <h1 className="text-5xl font-headline mb-10 text-center text-primary">Lengkapi Profil Anda</h1>
      <OnboardingFlow />
    </div>
  );
}
