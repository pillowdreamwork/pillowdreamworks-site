import * as React from "react";
import Link from "next/link";
import { FOUNDER_CONTACT, LEGAL_ROUTES } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="w-full bg-[#202923] text-[#FDFBF7] pt-16 pb-12 border-t border-[#24483B]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FDFBF7]/10">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#24483B] border border-[#C6A46A]/30 text-[#FDFBF7] flex items-center justify-center font-serif text-sm font-bold">
                Ψ
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-[#FDFBF7]">
                  PillowDreamWorks
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A46A] font-sans font-semibold">
                  Foundation
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#FDFBF7]/70 leading-relaxed font-sans max-w-sm">
              An educational psychology and wellbeing foundation publishing structured workbooks, reflective journals, and accessible assessment tools for thoughtful self-inquiry.
            </p>
            <div className="pt-2">
              <a
                href={FOUNDER_CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24483B] hover:bg-[#2D5A4A] text-[#FDFBF7] text-xs font-mono border border-white/10 transition-colors"
              >
                <span>WhatsApp: +91 97283 55421</span>
              </a>
            </div>
          </div>

          {/* Library & Books (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-[#C6A46A]">
              Library
            </h4>
            <ul className="space-y-2 text-sm text-[#FDFBF7]/70">
              <li>
                <Link href="/books" className="hover:text-[#FDFBF7] transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/books/psychology-toolkit" className="hover:text-[#FDFBF7] transition-colors">
                  Psychology Toolkit
                </Link>
              </li>
              <li>
                <Link href="/books/finding-the-centre" className="hover:text-[#FDFBF7] transition-colors">
                  Finding The Centre
                </Link>
              </li>
              <li>
                <Link href="/books/bundles" className="hover:text-[#FDFBF7] transition-colors">
                  Book Bundles
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-[#FDFBF7] transition-colors">
                  177 Assessments
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Learn (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-[#C6A46A]">
              Services & Learning
            </h4>
            <ul className="space-y-2 text-sm text-[#FDFBF7]/70">
              <li>
                <Link href="/services#counselling" className="hover:text-[#FDFBF7] transition-colors">
                  1-on-1 Counselling
                </Link>
              </li>
              <li>
                <Link href="/services#graphotherapy" className="hover:text-[#FDFBF7] transition-colors">
                  Graphology & Handwriting
                </Link>
              </li>
              <li>
                <Link href="/services#crisis" className="hover:text-[#FDFBF7] transition-colors">
                  Crisis Protocols
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[#FDFBF7] transition-colors">
                  Learning Journal
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#FDFBF7] transition-colors">
                  Pricing & Contributions
                </Link>
              </li>
            </ul>
          </div>

          {/* Foundation & Legal (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-[#C6A46A]">
              Foundation & Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#FDFBF7]/70">
              <li>
                <Link href="/about" className="hover:text-[#FDFBF7] transition-colors">
                  About Foundation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FDFBF7] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              {LEGAL_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className="hover:text-[#FDFBF7] transition-colors text-xs text-[#FDFBF7]/60">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF7]/50 font-sans">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong>Important Notice:</strong> PillowDreamWorks Foundation is an educational and wellbeing resource ecosystem. Materials and assessments are educational tools and do not constitute clinical psychiatric diagnosis, psychotherapy, or emergency services. If in acute crisis, call 988 or 14416 immediately.
          </p>
          <p className="whitespace-nowrap font-mono text-[11px]">
            © 2026 PillowDreamWorks Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
