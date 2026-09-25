// src/app/contact/page.tsx
import Card from '@/components/Card';

const contacts = [
  {
    title: 'Email Us',
    description: 'Reach out via email for any inquiries or support.',
    href: 'mailto:info@pillowdreamworks.org',
  },
  {
    title: 'Phone',
    description: 'Call us at +1 (555) 123‑4567 for direct assistance.',
    href: 'tel:+15551234567',
  },
  {
    title: 'Address',
    description: '123 Wellness Avenue, Mindful City, XY 98765.',
    href: '#',
  },
];

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {contacts.map((c) => (
          <Card key={c.title} title={c.title} description={c.description} href={c.href} />
        ))}
      </div>
    </section>
  );
}
