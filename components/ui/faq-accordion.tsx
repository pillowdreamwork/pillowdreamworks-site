"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional follow-up link rendered beneath the answer. */
  link?: { href: string; label: string };
}

export interface FaqGroup {
  /** Optional sub-heading rendered above the group's first row. */
  title?: string;
  items: FaqItem[];
}

interface FaqAccordionProps {
  groups: FaqGroup[];
  /** Index (across all flattened rows) that starts open. Defaults to none. */
  initialOpenIndex?: number | null;
  /** Smaller typography for use inside modals. */
  compact?: boolean;
}

/**
 * Number-free FAQ accordion matching the ivory/cream card language used
 * across the book, bundle and assessment pages. Rows are buttons with
 * aria-expanded / aria-controls; answers stay in the DOM behind `hidden`
 * so the structure is identical on the server and in the browser.
 */
export function FaqAccordion({
  groups,
  initialOpenIndex = null,
  compact = false,
}: FaqAccordionProps) {
  const baseId = React.useId();

  const rows = React.useMemo(
    () =>
      groups.flatMap((group, groupIndex) =>
        group.items.map((item, itemIndex) => ({
          item,
          title: itemIndex === 0 ? group.title : undefined,
          key: `${groupIndex}-${itemIndex}`,
        }))
      ),
    [groups]
  );

  const [openKey, setOpenKey] = React.useState<string | null>(
    initialOpenIndex === null ? null : (rows[initialOpenIndex]?.key ?? null)
  );

  if (rows.length === 0) return null;

  return (
    <div className="space-y-3">
      {rows.map(({ item, title, key }) => {
        const open = openKey === key;
        const buttonId = `${baseId}-q-${key}`;
        const panelId = `${baseId}-a-${key}`;

        return (
          <React.Fragment key={key}>
            {title && (
              <h3 className="border-t border-navy/10 pt-8 pb-1 font-serif text-lg font-bold text-navy">
                {title}
              </h3>
            )}
            <div className="overflow-hidden rounded-xl border border-navy/10 bg-cream">
              <LiquidGlassButton
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenKey(open ? null : key)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left font-serif font-bold text-navy transition-colors hover:bg-cream/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy/40 ${
                  compact ? "p-3.5 text-sm" : "p-5 text-base sm:text-lg"
                }`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-navy/50 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </LiquidGlassButton>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className={`border-t border-navy/5 font-sans leading-relaxed text-navy/75 ${
                  compact ? "px-3.5 pb-3.5 pt-3 text-xs" : "px-5 pb-5 pt-3.5 text-sm sm:text-base"
                }`}
              >
                <p>{item.answer}</p>
                {item.link && (
                  <p className="pt-2">
                    <Link
                      href={item.link.href}
                      className="font-semibold text-sage-dark underline underline-offset-2 hover:text-navy"
                    >
                      {item.link.label}
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
