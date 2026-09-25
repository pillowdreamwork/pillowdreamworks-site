// src/components/Card.tsx
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  href?: string;
}

export default function Card({ title, description, href }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      {href && (
        <a
          href={href}
          className="text-primary font-medium hover:underline"
        >
          Learn more →
        </a>
      )}
    </div>
  );
}
