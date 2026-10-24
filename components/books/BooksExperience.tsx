import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Book, BOOKS } from "@/data/books";
import { BookEntrance } from "./BookEntrance";
import { BookOpening } from "./BookOpening";
import { ToolkitJourney } from "./ToolkitJourney";
import { FindingCentreJourney } from "./FindingCentreJourney";
import { PageStory } from "./PageStory";
import { ChapterFlow } from "./ChapterFlow";
import { BookDetails } from "./BookDetails";
import { BookFAQ } from "./BookFAQ";
import { BookPricing } from "./BookPricing";
import { SecondBookDiscovery } from "./SecondBookDiscovery";
import { BundleReveal } from "./BundleReveal";

interface BookWorldProps {
  book: Book;
  onReturn: () => void;
}

/** One book's complete story inside the single continuous document. */
const BookWorld = ({ book, onReturn }: BookWorldProps) => {
  const centre = book.personality === "centre";
  return (
    <div id={`world-${book.id}`} data-scene={book.title} className="scroll-mt-10">
      <BookOpening book={book} />
      {centre ? <FindingCentreJourney book={book} /> : <ToolkitJourney book={book} />}
      <PageStory items={book.scrollJourney} bookTitle={book.title} tone={centre ? "centre" : "default"} />
      <ChapterFlow book={book} />
      <BookDetails book={book} />
      <BookFAQ book={book} />
      <BookPricing book={book} onReturn={onReturn} />
    </div>
  );
};

export const BooksExperience = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [pendingScroll, setPendingScroll] = useState(false);
  const [scene, setScene] = useState("The Library");
  const reducedMotion = Boolean(useReducedMotion());
  const firstWorldRef = useRef<HTMLDivElement>(null);

  const selectedBook = selectedBookId ? BOOKS.find((book) => book.id === selectedBookId) ?? null : null;
  const otherBook = selectedBook ? BOOKS.find((book) => book.id !== selectedBook.id) ?? null : null;

  const handleSelect = (id: string) => {
    setSelectedBookId(id);
    setPendingScroll(true);
  };

  // After a choice, carry the visitor into the book once (normal scrolling takes over from there).
  useEffect(() => {
    if (!pendingScroll || !selectedBookId) return;
    const timer = window.setTimeout(
      () => {
        firstWorldRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        setPendingScroll(false);
      },
      reducedMotion ? 0 : 650
    );
    return () => window.clearTimeout(timer);
  }, [pendingScroll, selectedBookId, reducedMotion]);

  // Closes the current book, resets selection, and returns to the shelf.
  const handleReturn = () => {
    setPendingScroll(false);
    setSelectedBookId(null);
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  // Ambient orientation: follow the scene that is actually in view, not button state.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-scene]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setScene(entry.target.getAttribute("data-scene") ?? "The Library");
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [selectedBookId]);

  return (
    <div className="relative w-full bg-[#FDFBF7]">
      {/* Sub-Masthead */}
      <header className="sticky top-[60px] z-30 border-b border-[#24483B]/10 bg-[#FDFBF7]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 md:px-8">
          <LiquidGlassButton
            type="button"
            onClick={handleReturn}
            className="cursor-pointer border-0 bg-transparent p-0 font-serif text-xs uppercase tracking-[0.25em] text-[#24483B] hover:text-[#1A3529] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A46A]"
          >
            ← Library Shelf
          </LiquidGlassButton>
          <span className="truncate pl-4 font-serif text-xs text-[#202923]/60" aria-live="off">
            {scene}
          </span>
        </div>
      </header>

      <div>
        <div data-scene="The Library">
          <BookEntrance selectedBookId={selectedBookId} onSelection={handleSelect} />
        </div>

        {selectedBook && (
          <>
            <div ref={firstWorldRef} key={selectedBook.id} className="scroll-mt-10">
              <BookWorld book={selectedBook} onReturn={handleReturn} />
            </div>

            {otherBook && (
              <>
                <SecondBookDiscovery currentBook={selectedBook} nextBook={otherBook} />
                <BookWorld key={otherBook.id} book={otherBook} onReturn={handleReturn} />
                <div data-scene="The Collection">
                  <BundleReveal onReturn={handleReturn} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
