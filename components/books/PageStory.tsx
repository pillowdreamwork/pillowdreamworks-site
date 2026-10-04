"use client";

import React from "react";
import { BookScrollItem } from "@/data/books";
import { StoryScene, StoryStep } from "./StoryScene";

interface PageStoryProps {
  items: BookScrollItem[];
  bookTitle: string;
  tone?: "default" | "centre";
}

export const PageStory = ({ items, bookTitle, tone = "default" }: PageStoryProps) => {
  const steps: StoryStep[] = items.map((item, index) => ({
    id: item.src,
    label: `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`,
    title: item.caption,
    image: item.src,
    imageAlt: `Page ${index + 1} of ${items.length} from ${bookTitle}: ${item.caption}`,
  }));

  return <StoryScene steps={steps} ariaLabel={`${bookTitle}: selected pages`} tone={tone} showCounter={tone !== "centre"} />;
};
