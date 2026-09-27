import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { EmergencyBanner } from "@/components/site/emergency-banner";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const inter = Inter({
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

export const metadata: Metadata = {
  title: "PillowDreamWorks Foundation — Calm on the surface. Ambition underneath.",
  description:
    "An editorial psychology and wellbeing foundation combining guided workbooks, clinical-grade self-assessments, counselling, and structured learning for meaningful self-discovery.",
  keywords: [
    "psychology toolkit",
    "finding the centre",
    "psychological assessments",
    "counselling",
    "centreline",
    "graphotherapy",
    "editorial psychology",
    "manish garg"
  ],
  authors: [{ name: "Manish Garg", url: "https://www.linkedin.com/in/manish-garg-11757b238" }],
  openGraph: {
    title: "PillowDreamWorks Foundation — Editorial Psychology & Wellbeing",
    description: "Calm on the surface. Ambition underneath. Discover guided psychological workbooks, clinical screening, and counselling.",
    url: "https://pillowdreamworks.vercel.app",
    siteName: "PillowDreamWorks Foundation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PillowDreamWorks Foundation",
    description: "Calm on the surface. Ambition underneath. Editorial psychology workbooks and clinical assessments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body className="antialiased min-h-screen bg-ivory text-navy flex flex-col justify-between selection:bg-sage selection:text-ivory">
        <div>
          <EmergencyBanner />
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
