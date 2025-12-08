"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "@/components/carousel/ScrollButton";
import PicturePreview from "@/components/common/PicturePreview";

export type MediaFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: Record<string, MediaFormat | undefined>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CarouselItem = {
  id: number;
  title: string;
  description: string;
  image: Media;
};

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
}

// Random animation directions
const animationDirections = [
  { x: 0, y: "-100vh" },
  { x: 0, y: "100vh" },
  { x: "-100vw", y: 0 },
  { x: "100vw", y: 0 },
];

// Helper: pick best optimized image
const getOptimizedImage = (image: Media) => {
  return (
    image.formats?.small?.url ??
    image.formats?.medium?.url ??
    image.formats?.large?.url ??
    image.url
  );
};

export default function Carousel({ items, interval = 6000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const [animTitle, setAnimTitle] = useState(animationDirections[0]);
  const [animDesc, setAnimDesc] = useState(animationDirections[1]);
  const [animLine, setAnimLine] = useState(animationDirections[2]);
  const [lineHeight, setLineHeight] = useState(0);

  const textRef = useRef<HTMLDivElement | null>(null);
  const slide = items[current];

  /** ---------------------------
   *   RANDOM ANIMATION (SAFE)
   * --------------------------- */
  useEffect(() => {
    const random = () =>
      animationDirections[
        Math.floor(Math.random() * animationDirections.length)
      ];

    setAnimTitle(random());
    setAnimDesc(random());
    setAnimLine(random());
    setProgress(0);
  }, [current]);

  /** ---------------------------
   *   AUTO SLIDE TIMER
   * --------------------------- */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setCurrent((prev) => (prev + 1) % items.length);
          return 0;
        }
        return p + 1.7;
      });
    }, interval / 60);

    return () => clearInterval(timer);
  }, [isPaused, items.length, interval]);

  /** ---------------------------
   *   LINE HEIGHT CALC
   * --------------------------- */
  useLayoutEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current]);

  /** ---------------------------
   *   SWIPE GESTURES
   * --------------------------- */
  let touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX - touchEndX > 70) nextSlide();
    if (touchEndX - touchStartX > 70) prevSlide();
  };

  /** ---------------------------
   *   NAVIGATION
   * --------------------------- */
  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  if (!items.length) return null;

  return (
    <div
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ---------------- BACKGROUND IMAGE WITH FADE ---------------- */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <PicturePreview
            image={{
              ...slide.image,
              url: getOptimizedImage(slide.image),
            }}
            alt_text={slide.title}
            priority={current === 0} // only first slide LCP
          />
        </motion.div>
      </AnimatePresence>

      {/* ---------------- TEXT + ANIMATED ELEMENTS ---------------- */}
      <div className="absolute inset-0 flex justify-center md:justify-start items-center px-6 md:px-10 text-white">
        <div className="max-w-[1140px] w-full flex items-start gap-10 flex-col md:flex-row mx-auto">
          {/* Animated Line */}
          <motion.div
            key={"line-" + current}
            initial={animLine}
            animate={{ x: 0, y: 0, height: lineHeight }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden md:block w-px bg-gray-500"
          />

          {/* Text */}
          <div ref={textRef} className="flex flex-col text-center md:text-left">
            <motion.h2
              key={slide.title + current}
              initial={animTitle}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-[62px] leading-[1.2] md:leading-[82px] md:w-1/2"
            >
              {slide.title}
            </motion.h2>

            <motion.div
              key={slide.description + current}
              initial={animDesc}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-(--sand-500) font-light leading-8 md:text-white md:w-2/3 prose prose-invert"
              dangerouslySetInnerHTML={{ __html: slide.description }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- NAVIGATION BUTTONS ---------------- */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2">
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
