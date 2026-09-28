import { Metadata } from "next";
import { StudioPage } from "@/components/studio/studio-page";

export const metadata: Metadata = {
  title: "Lusion — Creative 3D & Interactive Web Studio",
  description: "A cinematic creative studio shaping experiences in real-time 3D, generative graphics, and the interactive web.",
};

export default function StudioRoute() {
  return <StudioPage />;
}
