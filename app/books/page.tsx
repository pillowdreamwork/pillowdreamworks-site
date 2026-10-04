import type { Metadata } from "next";
<<<<<<< HEAD
import { BooksJourneyExperience } from "@/components/books/books-journey-experience";
=======
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookCarousel } from "@/components/books/book-carousel";
import { BOOKS_PRICING, CAMPAIGN_METADATA } from "@/data/pricing";
import { ArrowRight, Check, Sparkles } from "lucide-react";
>>>>>>> 30c7539 (Clean lint warnings and finalize production build)

export const metadata: Metadata = {
  title: "The Books Ecosystem — PillowDreamWorks Foundation",
  description:
    "Enter the living library and discover two distinct intellectual journeys: The Psychology Toolkit (an 80-page structured clinical workbook) and Finding The Centre (a contemplative mindfulness handbook).",
  keywords: [
    "the psychology toolkit",
    "finding the centre",
    "psychology playbook",
    "clinical workbook",
    "manish garg books",
    "cognitive restructuring workbook"
  ],
  openGraph: {
    title: "The Books Ecosystem — PillowDreamWorks Foundation",
    description: "Two distinct paths: The Psychology Toolkit (Structured Workbook) & Finding The Centre (Contemplative Folio).",
    type: "website",
  },
};

export default function BooksHubPage() {
  return <BooksJourneyExperience />;
}
