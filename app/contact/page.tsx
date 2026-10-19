"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { Mail, Phone, MessageSquare, Check, ShieldCheck, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.consent) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container size="narrow">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3.5 py-1.5 rounded-full border border-[#24483B]/10">
            Correspondence & Inquiries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#202923]">
            Get in touch
          </h1>
          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-xl mx-auto">
            Direct communication with PillowDreamWorks Foundation. We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#24483B]/10 shadow-sm space-y-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[#202923]/70 font-semibold block">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#24483B]/15 text-[#202923] text-sm placeholder:text-[#202923]/35 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#202923]/70 font-semibold block">
                  Your Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#24483B]/15 text-[#202923] text-sm placeholder:text-[#202923]/35 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiry-type" className="text-xs font-mono uppercase tracking-wider text-[#202923]/70 font-semibold block">
                What are you inquiring about? *
              </label>
              <select
                id="inquiry-type"
                name="inquiry_type"
                required
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#24483B]/15 text-[#202923] text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
              >
                <option value="">Select an inquiry type</option>
                <option value="toolkit">The Psychology Toolkit (80-Page Workbook)</option>
                <option value="finding-centre">Finding The Centre (eBook / Hardcover)</option>
                <option value="consultation">1-on-1 Counselling Consultation</option>
                <option value="crisis">Crisis Stabilization Call</option>
                <option value="graphology">Graphotherapy & Handwriting Analysis</option>
                <option value="course">Psychology Course / Masterclass</option>
                <option value="general">General Foundation Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[#202923]/70 font-semibold block">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please share context regarding your goals, questions, or requirements..."
                className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#24483B]/15 text-[#202923] text-sm placeholder:text-[#202923]/35 focus:outline-none focus:ring-2 focus:ring-[#C6A46A] resize-none"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-[#24483B]/30 text-[#24483B] focus:ring-[#C6A46A]"
              />
              <label htmlFor="consent" className="text-xs text-[#202923]/75 leading-relaxed">
                I agree to the{" "}
                <Link href="/legal/privacy" className="text-[#24483B] font-semibold underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and consent to be contacted regarding this inquiry.
              </label>
            </div>

            <div className="pt-2">
              {!submitted ? (
                <LiquidGlassButton type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LiquidGlassButton>
              ) : (
                <div className="p-4 rounded-xl bg-[#DCE7DD] border border-[#24483B]/20 text-[#24483B] flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#24483B] shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-sm">Message received.</strong>
                    <span>Thank you. We typically review and respond within 24 hours.</span>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Direct WhatsApp Quick Contact Strip */}
          <div className="pt-8 border-t border-[#24483B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold block">
                Prefer immediate messaging?
              </span>
              <p className="text-xs text-[#202923]/70 font-sans">
                You can reach the Foundation desk directly on WhatsApp:
              </p>
            </div>
            <LiquidGlassButton
              href={FOUNDER_CONTACT.whatsapp}
              variant="secondary"
              size="sm"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              <span>WhatsApp: +91 97283 55421</span>
            </LiquidGlassButton>
          </div>
        </div>
      </Container>
    </main>
  );
}
