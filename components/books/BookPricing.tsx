"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Book, formatPrice } from "@/data/books";
import { PurchaseControl } from "./PurchaseControl";

interface BookPricingProps {
  book: Book;
  onReturn: () => void;
}

export const BookPricing = ({ book, onReturn }: BookPricingProps) => {
  const reducedMotion = useReducedMotion();
  const { formats } = book.pricing;
  if (formats.length === 0) return null;

  return (
    <section aria-label={`${book.title}: editions`} className="border-t border-stone-300 bg-[#faf8f5] py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0.2 : 0.9 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">{book.title}</p>
          <h2 className="font-serif text-5xl text-stone-900 md:text-6xl">
            {formats.length > 1 ? "Choose your edition." : "The edition."}
          </h2>
        </motion.div>

        <div className="divide-y divide-stone-300 border-y border-stone-300">
          {formats.map((format) => (
            <motion.div
              key={format.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0.2 : 0.7 }}
              className="grid items-start gap-6 py-10 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-10"
            >
              <div>
                <h3 className="font-serif text-3xl text-stone-900">{format.type}</h3>
                {format.description && (
                  <p className="mt-3 max-w-xl font-serif text-stone-600">{format.description}</p>
                )}
              </div>

              <p className="whitespace-nowrap font-serif text-3xl text-stone-900">
                {formatPrice(format.priceINR, format.priceUSD)}
              </p>

              <PurchaseControl
                label={`Buy ${format.type}`}
                checkoutUrl={format.checkoutUrl}
                onReturn={onReturn}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
