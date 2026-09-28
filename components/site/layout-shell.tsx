"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { EmergencyBanner } from "@/components/site/emergency-banner";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // If we are on the homepage or studio page, let the modern Lusion Studio layout render full-bleed
  const isStudioView = pathname === "/" || pathname?.startsWith("/studio");

  if (isStudioView) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex-1">
        <EmergencyBanner />
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
