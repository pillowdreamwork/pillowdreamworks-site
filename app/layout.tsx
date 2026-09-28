import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/site/layout-shell";

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
  title: "Lusion — Creative 3D & Interactive Web Studio",
  description:
    "A cinematic creative studio shaping experiences in real-time 3D, generative graphics, and the interactive web.",
  keywords: [
    "creative studio",
    "real-time 3d",
    "webgl",
    "three.js",
    "interactive web",
    "lusion",
    "generative design",
    "motion craft"
  ],
  openGraph: {
    title: "Lusion — Creative 3D & Interactive Web Studio",
    description: "A cinematic creative studio shaping experiences in real-time 3D and the interactive web.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lusion — Creative 3D & Interactive Web Studio",
    description: "A cinematic creative studio shaping experiences in real-time 3D and the interactive web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body className="antialiased min-h-screen bg-white text-black flex flex-col justify-between selection:bg-[#00FFFF] selection:text-black">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
