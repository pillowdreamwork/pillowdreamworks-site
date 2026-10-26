import * as React from "react";
import { AlertTriangle } from "lucide-react";


/**
 * Visible notice on every legal page. It makes clear that these documents are
 * plain-language summaries still pending qualified legal review, and must not
 * be read as a claim of verified regulatory compliance.
 */
export function LegalReviewNotice() {
  return (
    <div className="mb-10 p-4 rounded-2xl bg-cream border border-navy/15 flex items-start gap-3 text-xs text-navy/80 leading-relaxed">
      <AlertTriangle className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
      <p>
        <strong className="text-navy">Under legal review.</strong> This document is a
        plain-language summary provided in good faith. It is pending review by qualified legal
        counsel, does not constitute legal advice, and makes no claim of compliance with any
        specific jurisdiction&apos;s requirements.
      </p>
    </div>
  );
}
