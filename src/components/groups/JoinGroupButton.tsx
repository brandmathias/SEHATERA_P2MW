
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, CheckCircle } from 'lucide-react';

export function JoinGroupButton() {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <Button onClick={() => setIsJoined(!isJoined)} className="w-full text-lg py-4" variant={isJoined ? "secondary" : "default"}>
      {isJoined ? <><CheckCircle className="mr-2 h-5 w-5" /> Telah Bergabung</> : <><PlusCircle className="mr-2 h-5 w-5" /> Gabung Grup</>}
    </Button>
  );
}
