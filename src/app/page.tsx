import { DailyGreeting } from '@/components/home/DailyGreeting';
import { ScheduledSessions } from '@/components/home/ScheduledSessions';
import { CuratedContent } from '@/components/home/CuratedContent';
import { DailyPuzzle } from '@/components/home/DailyPuzzle';
import { CloudSun } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto py-12 px-6 space-y-12 max-w-7xl animate-fade-in">
      {/* Top Greeting */}
      <DailyGreeting />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column (8 units) */}
        <div className="lg:col-span-8 space-y-12">
          <CuratedContent />
          <ScheduledSessions />
        </div>

        {/* Right Column (4 units) */}
        <div className="lg:col-span-4 space-y-8">
          <DailyPuzzle />
          
          {/* Weather Widget */}
          <div className="bg-card rounded-[2rem] p-8 flex items-center justify-between shadow-sm border border-border/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full shadow-sm">
                <CloudSun className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <p className="text-xl font-bold">Cerah Berawan</p>
                <p className="text-muted-foreground">Bandung, 24°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
