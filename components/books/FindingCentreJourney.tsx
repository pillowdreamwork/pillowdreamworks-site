"use client";

import React from "react";
import { Book } from "@/data/books";
import { StoryScene, StoryStep } from "./StoryScene";

export const FindingCentreJourney = ({ book }: { book: Book }) => {
  const steps: StoryStep[] = book.chapters.map((chapter) => ({
    id: chapter.id,
    label: chapter.label,
    title: chapter.title,
    image: chapter.image,
    imageAlt: chapter.imageAlt,
  }));

  return <StoryScene steps={steps} ariaLabel={`${book.title}: chapters`} tone="centre" showCounter={false} />;
};
