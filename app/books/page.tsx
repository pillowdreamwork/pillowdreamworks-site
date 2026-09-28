import type { Metadata } from "next";
import { BooksJourneyExperience } from "@/components/books/books-journey-experience";

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
