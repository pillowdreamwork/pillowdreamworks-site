// src/app/learn/page.tsx
import Card from '@/components/Card';

const resources = [
  {
    title: 'Blog Articles',
    description: 'In‑depth articles on psychology, wellbeing, and personal growth.',
    href: '#',
  },
  {
    title: 'Webinars',
    description: 'Live and recorded webinars from expert psychologists.',
    href: '#',
  },
  {
    title: 'Community Forum',
    description: 'Engage with peers, ask questions, and share insights.',
    href: '#',
  },
];

export default function LearnPage() {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Learn & Explore</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {resources.map((res) => (
          <Card key={res.title} title={res.title} description={res.description} href={res.href} />
        ))}
      </div>
    </section>
  );
}
