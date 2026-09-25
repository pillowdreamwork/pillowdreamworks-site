import React from 'react';
import { pricingPlans } from '@/data/pricing';
import Card from '@/components/Card';

export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            title={plan.name}
            description={plan.features.join(', ')}
            href="#"
          />
        ))}
      </div>
    </section>
  );
}
