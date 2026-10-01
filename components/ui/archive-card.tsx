import React from "react";
import { ClipboardCopy, Check, Copy, AlertCircle, Clock, Calendar } from "lucide-react";

export interface ArchiveCardProps {
  /** Assessment item data */
  item: any;
  /** Callback when user clicks start (for free assessments) */
  onStart?: (item: any) => void;
  /** Callback for booking a clinical session */
  onBook?: (item: any) => void;
}

/**
 * A premium card that visually resembles a library archive sheet.
 * Uses subtle paper texture, soft shadows and typographic hierarchy.
 */
export const ArchiveCard: React.FC<ArchiveCardProps> = ({ item, onStart, onBook }) => {
  const desc = Array.isArray(item.description) ? item.description.join(" ") : item.description;
  const isPaid = !!item.isPaid;

  return (
    <div className="relative bg-cream rounded-xl p-6 border border-sage-200 hover:border-sage-300 hover:shadow-lg transition-all group overflow-hidden">
      {/* Top badge row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase font-semibold tracking-widest text-sage-700 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200">
          {item.domain}
        </span>
        {isPaid ? (
          <span className="px-2.5 py-0.5 bg-navy text-ivory text-xs font-bold rounded-full">Clinical Battery</span>
        ) : (
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
            FREE · {item.questions?.length || 0} Qs
          </span>
        )}
      </div>

      {/* Title & breadcrumb */}
      <div className="space-y-1">
        <div className="text-[10px] text-sage-600 uppercase tracking-wider">{item.breadcrumb}</div>
        <h3 className="font-serif text-lg font-bold text-sage-900 group-hover:text-sage-800 transition-colors line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-sage-700 line-clamp-3">{desc}</p>

      {/* Meta chips */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-sage-600">
        <span className="px-2 py-0.5 bg-cream/70 rounded-md border border-sage-100">{item.whoCanTake}</span>
        {item.duration && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-cream/70 rounded-md border border-sage-100">
            <Clock className="w-3 h-3" /> {item.duration}
          </span>
        )}
      </div>

      {/* Action area */}
      <div className="mt-4 pt-3 border-t border-sage-200 flex flex-col gap-2">
        {isPaid ? (
          <button
            onClick={() => onBook?.(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-sage-800 text-ivory text-xs font-semibold hover:bg-sage-700 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" /> Book Diagnostic Session
          </button>
        ) : (
          <button
            onClick={() => onStart?.(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy text-ivory text-xs font-semibold hover:bg-navy-light transition-colors"
          >
            Take Free Assessment
          </button>
        )}
      </div>
    </div>
  );
};
