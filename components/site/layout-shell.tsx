"use client";

import React from "react";
import { EmergencyBanner } from "@/components/site/emergency-banner";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EmergencyBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
