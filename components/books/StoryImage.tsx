/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "motion/react";


interface StoryImageProps {
  /** Real page image. When absent, the layer is typographic (label only). */
  src?: string;
  alt?: string;
  label: string;
  meta?: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
  reducedMotion: boolean;
  /** Maximum scale travel; keep small for quiet books. */
  scaleDelta?: number;
  priority?: boolean;
}

/**
 * One layer of a persistent visual frame. Layer `index` is fully visible when the
 * section's scroll progress equals index / (count - 1), which is exactly when its
 * matching text block is centred in the viewport. The first layer is therefore
 * fully visible at progress 0 (no empty first frame).
 */
export const StoryImage = ({
  src,
  alt = "",
  label,
  meta,
  index,
  count,
  progress,
  active,
  reducedMotion,
  scaleDelta = 0.02,
  priority = false,
}: StoryImageProps) => {
  const step = count > 1 ? 1 / (count - 1) : 1;
  const c = index * step;

  let opacityInput: number[];
  let opacityOutput: number[];

  if (count === 1) {
    opacityInput = [0, 1];
    opacityOutput = [1, 1];
  } else if (index === 0) {
    opacityInput = [0, Math.max(0.01, step * 0.25), Math.min(0.99, step * 0.6), 1];
    opacityOutput = [1, 1, 0, 0];
  } else if (index === count - 1) {
    opacityInput = [0, Math.max(0.01, 1 - step * 0.6), Math.min(0.99, 1 - step * 0.25), 1];
    opacityOutput = [0, 0, 1, 1];
  } else {
    const startFadeIn = Math.max(0, c - step * 0.5);
    const fullIn = Math.max(startFadeIn + 0.01, c - step * 0.15);
    const startFadeOut = Math.min(1, c + step * 0.15);
    const fullOut = Math.min(1, c + step * 0.5);
    opacityInput = [0, startFadeIn, fullIn, startFadeOut, fullOut, 1];
    opacityOutput = [0, 0, 1, 1, 0, 0];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput);

  const delta = reducedMotion ? 0 : scaleDelta;
  const scaleInput =
    count === 1
      ? [0, 1]
      : index === 0
        ? [0, step * 0.5, 1]
        : index === count - 1
          ? [0, 1 - step * 0.5, 1]
          : [0, Math.max(0, c - step * 0.3), c, Math.min(1, c + step * 0.3), 1];

  const scaleOutput =
    count === 1
      ? [1, 1]
      : index === 0
        ? [1, 1.02, 1.02 + delta]
        : index === count - 1
          ? [1 - delta, 1, 1]
          : [1 - delta, 1 - delta * 0.5, 1, 1 + delta * 0.5, 1 + delta];

  const scale = useTransform(progress, scaleInput, scaleOutput);

  return (
    <motion.div
      aria-hidden={!active}
      className="absolute inset-0 flex items-center justify-center p-8 lg:p-14"
      style={{ opacity, scale }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <div className="text-center">
          <p
            className={
              label.length > 3
                ? "font-serif text-5xl text-stone-300 md:text-6xl"
                : "font-serif text-[9rem] leading-none text-stone-300 md:text-[12rem]"
            }
          >
            {label}
          </p>
          {meta && (
            <p className="mt-6 font-serif text-sm tracking-[0.2em] uppercase text-stone-500">
              {meta}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};
