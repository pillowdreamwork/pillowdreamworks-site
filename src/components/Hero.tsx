// src/components/Hero.tsx
import React from 'react';

export default function Hero() {
  return (
    <section className="bg-primary text-white py-24 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">PillowDreamWorks Foundation</h1>
      <p className="text-xl max-w-2xl text-center mb-8">
        Premium editorial psychology platform delivering insights, articles, and community for mental wellbeing.
      </p>
      <a href="/pricing" className="bg-accent hover:bg-accent/90 text-black font-semibold py-3 px-6 rounded transition">
        Explore Plans
      </a>
    </section>
  );
}
