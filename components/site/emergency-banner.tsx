"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, Phone, X } from "lucide-react";
import { EMERGENCY_INFO } from "@/data/navigation";

export function EmergencyBanner() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <aside
        aria-label="Emergency Crisis Notification"
        className="w-full bg-[#8B2626] text-ivory text-xs sm:text-sm py-2 px-4 shadow-inner relative z-50 transition-all border-b border-red-950/40"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-medium tracking-wide">
              {EMERGENCY_INFO.bannerText}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="underline underline-offset-4 font-semibold hover:text-red-100 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 inline" />
              <span>{EMERGENCY_INFO.actionText}</span>
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <Link
              href="/services#crisis"
              className="text-white/90 hover:text-white underline underline-offset-2 hidden sm:inline"
            >
              Crisis Stabilization
            </Link>
          </div>
        </div>
      </aside>

      {/* Emergency Hotline Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm"
        >
          <div className="bg-ivory text-navy max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-navy/15 relative">
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close emergency support modal"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-navy/5 text-navy/70 hover:text-navy cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-red-800 mb-4">
              <AlertCircle className="w-7 h-7" />
              <h3 id="emergency-modal-title" className="font-serif text-2xl font-bold text-navy">
                Immediate Crisis Support
              </h3>
            </div>

            <p className="text-sm text-navy/80 mb-6 leading-relaxed">
              If you or someone you know is in immediate life danger or experiencing an acute mental health crisis, please reach out to dedicated emergency helplines immediately.
            </p>

            <div className="space-y-3 mb-6">
              {EMERGENCY_INFO.phoneNumbers.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-cream border border-navy/10 text-sm"
                >
                  <span className="font-medium text-navy">{item.country}</span>
                  <span className="font-bold text-red-900 tracking-wide">{item.number}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/services#crisis"
                onClick={() => setShowModal(false)}
                className="w-full text-center py-2.5 px-4 rounded-md bg-navy text-ivory font-medium hover:bg-navy-light text-sm"
              >
                Book Crisis Stabilization Call
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 rounded-md bg-cream text-navy border border-navy/15 font-medium hover:bg-navy/5 text-sm cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
