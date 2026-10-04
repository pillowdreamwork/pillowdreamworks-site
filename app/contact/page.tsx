"use client";

import * as React from "react";
import { FOUNDER_CONTACT } from "@/data/navigation";

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
    <main className="contact-shell">
      <section className="contact-form-block">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Get in touch</h1>
          <p>We usually respond within 24 hours.</p>

          <div className="form-field">
            <label htmlFor="name">Your name *</label>
            <input id="name" name="name" type="text" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
          </div>

          <div className="form-field">
            <label htmlFor="inquiry-type">What are you interested in? *</label>
            <select id="inquiry-type" name="inquiry_type" required value={formData.inquiryType} onChange={(event) => setFormData({ ...formData, inquiryType: event.target.value })}>
              <option value="">Select an option</option>
              <option value="toolkit">The Psychology Toolkit (₹999)</option>
              <option value="consultation">Request a Counseling Session (₹1,499)</option>
              <option value="assessment">Psychological Assessments (Free + Paid)</option>
              <option value="course">Learning Course</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="message">Your message *</label>
            <textarea id="message" name="message" required value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })}></textarea>
          </div>

          <div className="form-checkbox">
            <input id="consent" name="consent" type="checkbox" required checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} />
            <label htmlFor="consent">
              I agree to the <a href="/legal/privacy">privacy policy</a> and consent to be contacted about my inquiry.
            </label>
          </div>

          {!submitted ? (
            <button type="submit" className="btn-submit">Send Message</button>
          ) : (
            <div className="submit-success">
              <strong>Message received.</strong>
              <p>Thank you. We usually respond within 24 hours.</p>
            </div>
          )}

          <p className="form-note">
            <strong>What happens next:</strong> We usually respond within 24 hours with next steps, pricing information, or scheduling details.
          </p>

          <div className="contact-alternatives">
            <p>Prefer quick contact?</p>
            <a href={FOUNDER_CONTACT.whatsapp} className="whatsapp-link" target="_blank" rel="noopener noreferrer">
              Message on WhatsApp: +91 97283 55421
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
