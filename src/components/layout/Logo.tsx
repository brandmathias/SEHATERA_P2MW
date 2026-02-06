import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-0 group transition-transform active:scale-95">
      <div className="relative h-[104px] w-[104px] transition-transform group-hover:scale-110">
        <Image 
          src="/logo.png" 
          alt="SEHATERA Logo" 
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <span className={cn(
        "text-5xl font-headline font-black italic tracking-tighter text-primary logo-outline uppercase -ml-4",
      )}>
        SEHATERA
      </span>
    </Link>
  );
}
