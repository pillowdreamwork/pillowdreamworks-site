"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { Mail, Send, CheckCircle2, MessageSquare, Phone, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    topic: "The Psychology Toolkit",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Direct & Confidential Communication
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Contact PillowDreamWorks Foundation
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans max-w-xl mx-auto">
            Inquiries regarding publications, assessment sessions, 1-on-1 counselling, or institutional collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-cream rounded-3xl p-8 sm:p-10 border border-navy/15 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-navy">
                    Your Full Name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-gold text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-navy">
                    Email Address
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-gold text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="topic" className="block text-xs font-semibold uppercase tracking-wider text-navy">
                    Inquiry Topic
                  </label>
                  <select
                    id="topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-navy/15 text-navy focus:outline-gold text-sm cursor-pointer"
                  >
                    <option value="The Psychology Toolkit">The Psychology Toolkit (Workbook)</option>
                    <option value="Finding The Centre">Finding The Centre (eBook / Print)</option>
                    <option value="1-on-1 Counselling">1-on-1 Counselling Consultation</option>
                    <option value="Psychological Assessments">Assessment Centre Testing Session</option>
                    <option value="CentreLine Support">CentreLine Ongoing Check-ins</option>
                    <option value="General Foundation Inquiry">General Foundation Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-navy">
                    Message or Note
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist your inner journey?"
                    className="w-full px-4 py-3 rounded-xl bg-ivory border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-gold text-sm resize-none"
                  />
                </div>

                <Button type="submit" size="lg" variant="primary" className="w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Send Confidential Message</span>
                </Button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sage-light mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-sage-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Message Received
                </h3>
                <p className="text-sm text-navy/75 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. Your inquiry has been received. Our team or Manish Garg will reply directly to {formData.email}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", topic: "The Psychology Toolkit", message: "" });
                  }}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </div>

          {/* Right Information Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy text-ivory rounded-3xl p-8 border border-navy-light/40 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-1">
                  Direct Founder Desk
                </span>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  {FOUNDER_CONTACT.name}
                </h3>
                <p className="text-xs text-ivory/70">{FOUNDER_CONTACT.title}</p>
              </div>

              <div className="space-y-4 text-sm text-ivory/80 pt-2 border-t border-ivory/15">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <a href={`mailto:${FOUNDER_CONTACT.email}`} className="hover:text-gold transition-colors">
                    {FOUNDER_CONTACT.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-gold shrink-0" />
                  <a href={FOUNDER_CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                    Direct WhatsApp Desk
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-ivory/15 flex items-center gap-4 text-xs">
                <a
                  href={FOUNDER_CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline flex items-center gap-0.5"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
                <span className="text-ivory/30">•</span>
                <a
                  href={FOUNDER_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline flex items-center gap-0.5"
                >
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Crisis Fast Notice */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-900/15 text-xs text-navy/80 space-y-2">
              <span className="font-semibold text-red-950 block">Urgent Crisis or Distress?</span>
              <p>
                If you are in acute panic or emotional crisis, do not wait for email response. Contact national emergency lines immediately (India: 14416 / US: 988).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
