import type { ThemedGroup } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ThemedGroupCardProps {
  group: ThemedGroup;
}

export function ThemedGroupCard({ group }: ThemedGroupCardProps) {
  const IconComponent = group.icon || Users;
  return (
    <Link href="/groups/view" className="block group">
        <Card className="shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col animate-slide-in-up h-full">
        <CardHeader className="p-4">
            <div className="flex items-center space-x-4 mb-2">
                <div className="bg-primary/10 p-3 rounded-xl">
                    <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">{group.name}</CardTitle>
            </div>
            <CardDescription className="text-md h-16 overflow-hidden text-ellipsis">{group.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <div className="flex items-center text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-1.5" />
            {group.memberCount} anggota
            </div>
        </CardContent>
        <CardFooter className="p-4">
            <div className="w-full text-lg py-3 text-primary font-bold flex items-center justify-center group-hover:underline">
                Lihat Grup <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
