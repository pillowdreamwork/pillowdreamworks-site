import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/site/layout-shell";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PillowDreamWorks Foundation — Calm on the surface. Ambition underneath.",
  description:
    "An editorial psychology and wellbeing foundation combining guided workbooks, 177 standardized self-assessments, counselling, and structured learning for meaningful self-discovery.",
  keywords: [
    "psychology toolkit",
    "finding the centre",
    "psychological assessments",
    "counselling",
    "centreline",
    "graphotherapy",
    "editorial psychology",
    "manish garg",
    "177 clinical scales"
  ],
  authors: [{ name: "Manish Garg", url: "https://www.linkedin.com/in/manish-garg-11757b238" }],
  openGraph: {
    title: "PillowDreamWorks Foundation — Editorial Psychology & Wellbeing",
    description: "Calm on the surface. Ambition underneath. Discover guided psychological workbooks, 177 clinical screening tools, and confidential counselling.",
    url: "https://www.pillowdreamworks.com",
    siteName: "PillowDreamWorks Foundation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PillowDreamWorks Foundation",
    description: "Calm on the surface. Ambition underneath. Editorial psychology workbooks and 177 clinical assessments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen bg-ivory text-navy flex flex-col justify-between selection:bg-sage selection:text-ivory">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
