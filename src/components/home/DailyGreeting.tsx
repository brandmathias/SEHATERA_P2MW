'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export function DailyGreeting() {
  const { user, isAuthenticated } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 11) setTimeOfDay('Selamat Pagi');
    else if (hour < 15) setTimeOfDay('Selamat Siang');
    else if (hour < 19) setTimeOfDay('Selamat Sore');
    else setTimeOfDay('Selamat Malam');
  }, []);

  if (!mounted) return (
    <div className="mb-12">
      <h1 className="text-6xl font-headline text-primary mb-4">
        Selamat Datang!
      </h1>
      <p className="text-muted-foreground text-2xl max-w-2xl leading-relaxed">
        Semoga hari ini membawa ketenangan, kebahagiaan, dan kesehatan yang berlimpah.
      </p>
    </div>
  );

  const name = isAuthenticated && user ? user.name : 'Ibu Sarah';

  return (
    <div className="mb-12">
      <h1 className="text-6xl font-headline text-primary mb-4">
        {timeOfDay}, {name}!
      </h1>
      <p className="text-muted-foreground text-2xl max-w-2xl leading-relaxed">
        Semoga hari ini membawa ketenangan, kebahagiaan, dan kesehatan yang berlimpah untuk {isAuthenticated && user ? name.split(' ')[0] : 'Ibu'}.
      </p>
    </div>
  );
}
