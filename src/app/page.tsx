import Hero from '@/components/Hero';
import Card from '@/components/Card';
import { pricingPlans } from '@/data/pricing';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto py-12 grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            title={plan.name}
            description={plan.features.join(', ')}
            href="/pricing"
          />
        ))}
      </section>
    </>
  );
}
