"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Book, BOOKS } from "@/data/books";
import { BookEntrance } from "./BookEntrance";
import { BookOpening } from "./BookOpening";
import { ToolkitJourney } from "./ToolkitJourney";
import { FindingCentreJourney } from "./FindingCentreJourney";
import { BookDetails } from "./BookDetails";
import { BookFAQ } from "./BookFAQ";
import { BookPricing } from "./BookPricing";
import { BundleReveal } from "./BundleReveal";

interface BookWorldProps {
  book: Book;
  onReturn: () => void;
  onSelectBook: (id: string) => void;
}

/** One book's complete story inside the continuous document. */
const BookWorld = ({ book, onReturn, onSelectBook }: BookWorldProps) => {
  const centre = book.personality === "centre";
  return (
    <div id={`world-${book.id}`} data-scene={book.title} className="scroll-mt-10">
      <BookOpening book={book} />
      {centre ? <FindingCentreJourney book={book} /> : <ToolkitJourney book={book} />}
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

  const handleSelect = (id: string) => {
    setSelectedBookId(id);
    setPendingScroll(true);
  };

  // After a choice, smoothly scroll visitor into the book
  useEffect(() => {
    if (!pendingScroll || !selectedBookId) return;
    const timer = window.setTimeout(
      () => {
        firstWorldRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        setPendingScroll(false);
      },
      reducedMotion ? 0 : 500
    );
    return () => window.clearTimeout(timer);
  }, [pendingScroll, selectedBookId, reducedMotion]);

  // Closes current book and returns to the shelf
  const handleReturn = () => {
    setPendingScroll(false);
    setSelectedBookId(null);
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  // Follow the scene actually in view
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
      { rootMargin: "-40% 0px -40% 0px" }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [selectedBookId]);

  return (
    <div className="relative w-full bg-[#FDFBF7]">
      {/* Sub-Masthead */}
      <header className="sticky top-[60px] z-30 border-b border-[#24483B]/10 bg-[#FDFBF7]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 md:px-8">
          <button
            type="button"
            onClick={handleReturn}
            className="cursor-pointer border-0 bg-transparent p-0 font-serif text-xs uppercase tracking-[0.25em] text-[#24483B] hover:text-[#1A3529] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A46A]"
          >
            ← Library Shelf
          </button>
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
            {/* The Selected Book World */}
            <div ref={firstWorldRef} key={selectedBook.id} className="scroll-mt-10">
              <BookWorld
                book={selectedBook}
                onReturn={handleReturn}
                onSelectBook={handleSelect}
              />
            </div>

            {/* Immediately show the Bundle / Complete Library (Abolishing the second book repetition) */}
            <div data-scene="The Collection">
              <BundleReveal
                onReturn={handleReturn}
                onSelectBook={handleSelect}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
