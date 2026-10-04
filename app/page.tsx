<<<<<<< HEAD
import { Metadata } from "next";
import { FoundationExperience } from "@/components/home/foundation-experience";

export const metadata: Metadata = {
  title: "PillowDreamWorks Foundation — Calm on the surface. Ambition underneath.",
  description:
    "An editorial psychology and wellbeing foundation combining guided workbooks, 177 clinical-grade self-assessments, counselling, and structured learning for meaningful self-discovery.",
  keywords: [
    "psychology toolkit",
    "finding the centre",
    "psychological assessments",
    "counselling",
    "centreline",
    "graphotherapy",
    "editorial psychology",
    "manish garg",
    "mental health foundation"
  ],
  openGraph: {
    title: "PillowDreamWorks Foundation — Psychology, Reflection & Becoming",
    description: "Calm on the surface. Ambition underneath. Discover guided psychological workbooks, 177 clinical scales, and confidential counselling.",
    url: "https://pillowdreamworks.vercel.app",
    siteName: "PillowDreamWorks Foundation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PillowDreamWorks Foundation — Editorial Psychology & Wellbeing",
    description: "Calm on the surface. Ambition underneath. Editorial psychology workbooks and 177 clinical assessments.",
  },
};

export default function HomePage() {
  return <FoundationExperience />;
=======
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <h1>Psychological clarity and calm.</h1>
        <p className="subheading">Through evidence, reflection, and grounded support.</p>

        <p className="outcome-line">
          Areas we work with: clearer boundaries, understanding anxiety patterns,
          emotional awareness, and developing a stronger sense of self.
        </p>

        <div className="hero-ctas">
          <Link href="/assessments" className="btn-primary">
            Explore Free Assessments
          </Link>

          <Link href="/books/psychology-toolkit" className="btn-secondary">
            Explore The Psychology Toolkit
            <span className="price">₹999 / $89</span>
          </Link>
        </div>

        <p className="trust-line">Real assessments. Evidence-based. No AI-generated content.</p>
      </section>

      <section className="founder-intro">
        <div className="founder-container">
          <div className="founder-image">
            <Image src="/founder-portrait.svg" alt="Manish Garg, Founder of PillowDreamWorks Foundation" width={200} height={250} />
          </div>

          <div className="founder-content">
            <p className="founder-name">Manish Garg</p>
            <p className="founder-role">Founder, PillowDreamWorks Foundation</p>

            <p className="founder-summary">
              Clinical psychologist with a commitment to making psychology
              evidence-based, accessible, and honest.
            </p>

            <Link href="/about" className="link-button">
              Meet the Founder →
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Start where you are.</h2>

        <div className="paths">
          <div className="path">
            <div className="path-number">1</div>
            <h3>Discover</h3>
            <p>Understand your baseline with free psychological screenings.</p>
            <ul>
              <li>Free: GAD-7 (anxiety), PHQ-9 (depression), others</li>
              <li>Optional: Clinical assessments for deeper insight</li>
            </ul>
            <Link href="/assessments">Explore Assessments →</Link>
          </div>

          <div className="path">
            <div className="path-number">2</div>
            <h3>Experience</h3>
            <p>Reflect through structured exercises and worksheets.</p>
            <ul>
              <li>5 chapters: boundaries, anxiety, relationships, habits</li>
              <li>16+ exercises designed for self-understanding</li>
              <li>Self-paced, printable workbook</li>
            </ul>
            <Link href="/books/psychology-toolkit">Explore the Toolkit →</Link>
          </div>

          <div className="path">
            <div className="path-number">3</div>
            <h3>Understand</h3>
            <p>Get personalized guidance from a licensed counselor.</p>
            <ul>
              <li>1-on-1 sessions (50 min)</li>
              <li>Specific challenges, patterns, clarity</li>
              <li>Manual scheduling, usually within 48–72 hours</li>
            </ul>
            <Link href="/contact?inquiry_type=consultation">Request a Session →</Link>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to get started?</h2>
        <p>We usually respond within 24 hours.</p>

        <div className="final-cta-group">
          <Link href="/contact?inquiry_type=consultation" className="btn-primary">
            Request a Session
          </Link>
          <a href="https://wa.me/919728355421" className="btn-secondary" target="_blank" rel="noopener noreferrer">
            Message on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
>>>>>>> 30c7539 (Clean lint warnings and finalize production build)
}
