import type { Metadata } from "next";
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
}
