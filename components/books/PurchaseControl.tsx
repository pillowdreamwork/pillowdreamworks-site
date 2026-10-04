"use client";

import React, { useState } from "react";

interface PurchaseControlProps {
  label: string;
  /** Approved checkout destination. When absent a calm, honest fallback is shown. */
  checkoutUrl?: string;
  onReturn: () => void;
  variant?: "link" | "solid";
}

export const PurchaseControl = ({ label, checkoutUrl, onReturn, variant = "link" }: PurchaseControlProps) => {
  const [notice, setNotice] = useState(false);

  const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900";
  const base =
    variant === "solid"
      ? "inline-flex min-h-12 items-center border border-stone-900 bg-stone-900 px-8 font-serif text-sm uppercase tracking-[0.2em] text-stone-50 transition-colors hover:bg-stone-700"
      : "inline-flex min-h-12 items-center border-b border-stone-900 font-serif text-sm uppercase tracking-[0.18em] text-stone-900 transition-colors hover:text-stone-600";

  if (checkoutUrl) {
    return (
      <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${focus}`}>
        {label}
      </a>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setNotice(true)} className={`${base} ${focus} cursor-pointer`}>
        {label}
      </button>
      <div role="status" aria-live="polite">
        {notice && (
          <div className="mt-4 border-t border-stone-300 pt-4">
            <p className="font-serif text-stone-600">Checkout is being prepared.</p>
            <button
              type="button"
              onClick={onReturn}
              className={`mt-2 min-h-12 cursor-pointer border-0 bg-transparent p-0 font-serif text-sm uppercase tracking-[0.18em] text-stone-900 underline underline-offset-4 ${focus}`}
            >
              Return to the library
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
