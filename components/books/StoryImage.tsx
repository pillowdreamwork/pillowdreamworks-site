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

  const opacityKeyframes =
    count === 1
      ? { input: [0, 1], output: [1, 1] }
      : index === 0
        ? { input: [0, step * 0.4, 1], output: [1, 1, 0] }
        : index === count - 1
          ? { input: [0, 1 - step * 0.4, 1], output: [0, 1, 1] }
          : {
              input: [0, c - step * 0.4, c + step * 0.4, 1],
              output: [0, 1, 0, 0],
            };
  const opacity = useTransform(progress, opacityKeyframes.input, opacityKeyframes.output);

  const delta = reducedMotion ? 0 : scaleDelta;
  const scaleKeyframes =
    count === 1
      ? { input: [0, 1], output: [1, 1] }
      : index === 0
        ? { input: [0, step, 1], output: [1, 1, 1 + delta] }
        : index === count - 1
          ? { input: [0, 1 - step, 1], output: [1 - delta, 1, 1] }
          : { input: [0, c, 1], output: [1 - delta, 1, 1 + delta] };
  const scale = useTransform(progress, scaleKeyframes.input, scaleKeyframes.output);

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
