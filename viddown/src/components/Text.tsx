"use client";

import { TextGenerateEffect } from "./ui/text-generate-effect";


const words = `Video DownloaderEffortlessly download high-quality videos from YouTube, Instagram, Facebook, and more—all in one place, with blazing-fast speed, no ads, and absolutely no limitations.`;

export function Text() {
  return <TextGenerateEffect words={words} />;
}
