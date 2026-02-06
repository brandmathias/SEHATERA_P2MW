import { SignInForm } from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 animate-fade-in">
      <div className="mb-8 text-center">
        <Image 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=200&auto=format&fit=crop" 
            alt="SEHATERA Logo" 
            width={120} 
            height={120} 
            className="mx-auto rounded-full shadow-md object-cover"
        />
      </div>
      <SignInForm />
    </div>
  );
}
