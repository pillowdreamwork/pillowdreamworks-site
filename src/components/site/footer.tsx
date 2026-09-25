import * as React from "react";
import Link from "next/link";
import { FOUNDER_CONTACT, LEGAL_ROUTES, EMERGENCY_INFO } from "@/data/navigation";
import { HeartHandshake, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-ivory pt-16 pb-12 border-t border-navy-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-ivory/10">
          {/* Foundation Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gold text-navy flex items-center justify-center font-serif text-lg font-bold">
                P
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory">
                PillowDreamWorks
              </span>
            </div>
            <p className="font-serif italic text-base text-gold-light/90">
              "Calm on the surface. Ambition underneath."
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              An independent psychology foundation and publishing house. We design evidence-grounded workbooks, psychological assessments, and personalized counselling for structured inner growth.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                Founder Story & Contact
              </span>
              <p className="text-xs text-ivory/80">
                Created & Directed by{" "}
                <Link
                  href="/about"
                  className="text-gold hover:underline font-medium"
                >
                  Manish Garg
                </Link>
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <a
                  href={FOUNDER_CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-gold flex items-center gap-0.5"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={FOUNDER_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-gold flex items-center gap-0.5"
                >
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={`mailto:${FOUNDER_CONTACT.email}`}
                  className="text-ivory/70 hover:text-gold"
                >
                  {FOUNDER_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Books */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                Books Ecosystem
              </h4>
              <ul className="space-y-2.5 text-sm text-ivory/75">
                <li>
                  <Link href="/books" className="hover:text-ivory transition-colors">
                    Books Hub
                  </Link>
                </li>
                <li>
                  <Link href="/books/psychology-toolkit" className="hover:text-ivory transition-colors">
                    Psychology Toolkit
                  </Link>
                </li>
                <li>
                  <Link href="/books/finding-the-centre" className="hover:text-ivory transition-colors">
                    Finding The Centre
                  </Link>
                </li>
                <li>
                  <Link href="/books/bundles" className="hover:text-ivory transition-colors">
                    Complete Bundles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Assessments */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                Assessments
              </h4>
              <ul className="space-y-2.5 text-sm text-ivory/75">
                <li>
                  <Link href="/assessments" className="hover:text-ivory transition-colors">
                    Assessment Centre
                  </Link>
                </li>
                <li>
                  <Link href="/assessments?category=anxiety" className="hover:text-ivory transition-colors">
                    HAM-A & Anxiety
                  </Link>
                </li>
                <li>
                  <Link href="/assessments?category=personality" className="hover:text-ivory transition-colors">
                    16PF & Rorschach
                  </Link>
                </li>
                <li>
                  <Link href="/assessments?category=cognitive" className="hover:text-ivory transition-colors">
                    WAIS-IV & Cognitive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-sm text-ivory/75">
                <li>
                  <Link href="/services#counselling" className="hover:text-ivory transition-colors">
                    1-on-1 Counselling
                  </Link>
                </li>
                <li>
                  <Link href="/services#crisis" className="hover:text-ivory transition-colors text-red-300">
                    Crisis Stabilization
                  </Link>
                </li>
                <li>
                  <Link href="/services#centreline" className="hover:text-ivory transition-colors">
                    CentreLine Support
                  </Link>
                </li>
                <li>
                  <Link href="/services#graphology" className="hover:text-ivory transition-colors">
                    Graphotherapy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Learn & Foundation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                Learn & About
              </h4>
              <ul className="space-y-2.5 text-sm text-ivory/75">
                <li>
                  <Link href="/learn" className="hover:text-ivory transition-colors">
                    PsychSnaps & Articles
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-ivory transition-colors">
                    About the Foundation
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-ivory transition-colors">
                    Pricing & Offers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-ivory transition-colors">
                    Contact & Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Crisis & Safety Disclaimers */}
        <div className="py-8 border-b border-ivory/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ivory/60 leading-relaxed">
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-ivory font-semibold">Emergency Disclaimer:</strong> If you are experiencing a life-threatening mental health emergency or imminent harm, please contact national emergency services immediately (India: 14416 / 1800-891-4416, US/Canada: 988, UK: 111/999). PillowDreamWorks Foundation is not an emergency medical provider.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-4 h-4 text-sage shrink-0 mt-0.5" />
            <p>
              <strong className="text-ivory font-semibold">Educational & Assessment Disclaimer:</strong> Psychological tools and self-assessments provided here are for educational self-reflection, screening, and personal development. They do not constitute formal psychiatric or medical diagnoses without direct licensed evaluation.
            </p>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <p>© {new Date().getFullYear()} PillowDreamWorks Foundation. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {LEGAL_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="hover:text-ivory transition-colors"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
