// src/components/Navbar.tsx
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-background text-text py-4 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold">PillowDreamWorks</Link>
        <ul className="flex space-x-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/books" className="hover:underline">Books</Link></li>
          <li><Link href="/services" className="hover:underline">Services</Link></li>
          <li><Link href="/learn" className="hover:underline">Learn</Link></li>
          <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
