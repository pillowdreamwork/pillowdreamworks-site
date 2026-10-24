"use client";

import React, { useState } from "react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { FOUNDER_CONTACT } from "@/data/navigation";
import { MessageSquare, ArrowRight } from "lucide-react";

interface PurchaseControlProps {
  label: string;
  checkoutUrl?: string;
  onReturn: () => void;
  variant?: "link" | "solid";
}

export const PurchaseControl = ({
  label,
  checkoutUrl,
  onReturn,
  variant = "link",
}: PurchaseControlProps) => {
  const [notice, setNotice] = useState(false);

  if (checkoutUrl) {
    return (
      <LiquidGlassButton
        href={checkoutUrl}
        variant={variant === "solid" ? "primary" : "secondary"}
        size="md"
        showArrow
      >
        {label}
      </LiquidGlassButton>
    );
  }

  return (
    <div className="space-y-3">
      <LiquidGlassButton
        onClick={() => setNotice(true)}
        variant={variant === "solid" ? "primary" : "secondary"}
        size="md"
        showArrow
      >
        {label}
      </LiquidGlassButton>

      <div role="status" aria-live="polite">
        {notice && (
          <div className="mt-4 p-4 rounded-xl bg-[#F5EFE6] border border-[#24483B]/15 text-xs text-[#202923]/80 space-y-3 font-sans">
            <p className="font-serif text-sm font-semibold text-[#202923]">
              Checkout is being prepared. Purchases are not available yet.
            </p>
            <p className="leading-relaxed">
              Automated card checkout for this edition is being connected. You can acquire your digital copy or reserve your print edition immediately via the Foundation desk.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <LiquidGlassButton
                href={`${FOUNDER_CONTACT.whatsapp}?text=${encodeURIComponent(`Hello PillowDreamWorks Foundation, I would like to order: ${label}`)}`}
                variant="primary"
                size="sm"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                <span>Order via Foundation Desk</span>
              </LiquidGlassButton>
              <LiquidGlassButton
                type="button"
                onClick={onReturn}
                className="px-3 py-1.5 text-xs font-mono text-[#24483B] hover:underline cursor-pointer"
              >
                Return to the library
              </LiquidGlassButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
