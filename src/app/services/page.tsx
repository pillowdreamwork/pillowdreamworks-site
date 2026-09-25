// src/app/services/page.tsx
import Card from '@/components/Card';

const services = [
  {
    title: 'Individual Counseling',
    description: 'Personalized therapy sessions to help you overcome challenges.',
    href: '#',
  },
  {
    title: 'Group Workshops',
    description: 'Interactive workshops focused on mental wellbeing and growth.',
    href: '#',
  },
  {
    title: 'Corporate Programs',
    description: 'Tailored mental health programs for workplaces.',
    href: '#',
  },
];

export default function ServicesPage() {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((svc) => (
          <Card key={svc.title} title={svc.title} description={svc.description} href={svc.href} />
        ))}
      </div>
    </section>
  );
}
