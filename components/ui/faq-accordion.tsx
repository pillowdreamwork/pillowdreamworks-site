"use client";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";


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
            <div className="overflow-hidden rounded-2xl border border-[#24483B]/15 bg-[#FDFBF7]/90 shadow-xs transition-all duration-300 hover:border-[#24483B]/35 hover:shadow-md group">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenKey(open ? null : key)}
                className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left font-serif font-bold text-[#202923] group-hover:text-[#24483B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24483B]/40 ${
                  compact ? "p-4 text-sm" : "p-5 text-base sm:text-lg"
                }`}
              >
                <span className="leading-snug">{item.question}</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#24483B]/5 group-hover:bg-[#24483B]/10 text-[#24483B] transition-transform duration-300 shrink-0">
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!open}
                className={`border-t border-[#24483B]/10 font-sans leading-relaxed text-[#202923]/80 bg-[#FAF8F5]/60 ${
                  compact ? "px-4 pb-4 pt-3 text-xs" : "px-5 pb-5 pt-4 text-sm sm:text-base"
                }`}
              >
                <p>{item.answer}</p>
                {item.link && (
                  <p className="pt-3">
                    <Link
                      href={item.link.href}
                      className="inline-flex items-center gap-1 font-semibold text-[#24483B] underline underline-offset-4 hover:text-[#C6A46A] transition-colors"
                    >
                      <span>{item.link.label}</span>
                      <span aria-hidden="true">→</span>
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
