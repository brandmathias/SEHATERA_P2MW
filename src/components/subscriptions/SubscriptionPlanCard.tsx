'use client';

import type { SubscriptionPlan } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  isPopular?: boolean;
}

export function SubscriptionPlanCard({ plan, isCurrentPlan = false, isPopular = false }: SubscriptionPlanCardProps) {
  const router = useRouter();

  const handleSubscribe = () => {
    // Navigate to checkout with plan information
    router.push(`/checkout?plan=${plan.id}`);
  };

  return (
    <Card className={`relative shadow-xl flex flex-col h-full transform transition-transform hover:scale-105 ${isPopular ? 'border-2 border-primary ring-2 ring-primary/50' : 'border-border'} animate-slide-in-up`}>
      {isPopular && (
        <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full shadow-md transform rotate-6 z-10">
          <Zap className="inline h-4 w-4 mr-1" /> Populer
        </div>
      )}
      <CardHeader className="p-6 text-center">
        <CardTitle className="text-3xl font-headline mb-2">{plan.name}</CardTitle>
        <CardDescription className="text-4xl font-bold text-primary mb-1">{plan.price}</CardDescription>
        <p className="text-sm text-muted-foreground">{plan.frequency}</p>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start text-lg">
              <CheckCircle className="h-6 w-6 mr-2 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 mt-auto">
        <Button 
          className="w-full text-xl py-4" 
          variant={isCurrentPlan ? "outline" : (isPopular ? "default" : "secondary")}
          disabled={isCurrentPlan}
          onClick={handleSubscribe}
        >
          {isCurrentPlan ? 'Paket Saat Ini' : plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
