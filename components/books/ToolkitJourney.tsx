"use client";

import React from "react";
import { Book } from "@/data/books";
import { StoryScene, StoryStep } from "./StoryScene";

export const ToolkitJourney = ({ book }: { book: Book }) => {
  // Steps come straight from the verified contents (five chapters + Resources & Closing).
  const steps: StoryStep[] = book.chapters.map((chapter) => ({
    id: chapter.id,
    label: chapter.label,
    title: chapter.title,
    text: chapter.subtitle,
    meta: chapter.pages ? `Pages ${chapter.pages}` : undefined,
    image: chapter.image,
    imageAlt: chapter.imageAlt,
  }));

  return <StoryScene steps={steps} ariaLabel={`${book.title}: contents`} />;
};
