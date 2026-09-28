"use client";

import React, { useState } from "react";
import { StudioNavbar } from "./navbar";
import { StudioHero } from "./hero";
import { FeaturedWorkSection } from "./featured-work";
import { StudioApproachSection } from "./approach";
import { StudioLabsSection } from "./labs-section";
import { StudioCTASection } from "./cta-section";
import { StudioFooter } from "./footer";
import { ShowreelModal } from "./showreel-modal";

export function StudioPage() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const toggleAudio = () => {
    setIsAudioActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00FFFF] selection:text-black antialiased">
      {/* 1. Header Navigation */}
      <StudioNavbar
        isAudioActive={isAudioActive}
        onToggleAudio={toggleAudio}
        onOpenReel={() => setIsReelOpen(true)}
      />

      {/* 2. Hero Section with Real-Time WebGL Matrix */}
      <StudioHero
        isAudioActive={isAudioActive}
        onOpenReel={() => setIsReelOpen(true)}
      />

      {/* 3. Standout Featured Work Grid */}
      <FeaturedWorkSection />

      {/* 4. Studio Approach & 4-Pillar Craft */}
      <StudioApproachSection />

      {/* 5. Labs & Experimental Prototypes */}
      <StudioLabsSection />

      {/* 6. Collaboration CTA Section */}
      <StudioCTASection />

      {/* 7. Studio Footer with Clocks & Socials */}
      <StudioFooter />

      {/* 8. Fullscreen Cinematic Showreel Modal */}
      <ShowreelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />
    </div>
  );
}
