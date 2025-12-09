/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "@/components/carousel/ScrollButton";
import Image from "next/image";
import { getAbsoluteUrl } from "@/utils/assetUrl";

type MediaFormat = {
  url: string;
  width: number;
  height: number;
};

type Media = {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats?: {
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
    webp?: MediaFormat;
  };
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

// ------------------- OPTIMIZED IMAGE PICKER -------------------
const getOptimizedImage = (image: Media) => {
  return (
    image.formats?.webp?.url ??
    image.formats?.small?.url ??
    image.formats?.medium?.url ??
    image.formats?.large?.url ??
    image.url
  );
};

// ------------------- BLUR PLACEHOLDER -------------------
const getBlurDataURL = () =>
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9p9oTiMAAAAASUVORK5CYII=";

// ------------------- RANDOM ANIMATION DIRECTIONS -------------------
const directions = [
  { x: -100, y: 0 }, // left
  { x: 100, y: 0 },  // right
  { x: 0, y: -100 }, // top
  { x: 0, y: 100 },  // bottom
];

const getRandomDirection = () => {
  return directions[Math.floor(Math.random() * directions.length)];
};

export default function Carousel({ items, interval = 6000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const textRef = useRef<HTMLDivElement | null>(null);
  const slide = items[current];

  // ------------------- RANDOM DIRECTIONS (INDEPENDENT) -------------------
  const [dirTitle, setDirTitle] = useState({ x: 0, y: 100 });
  const [dirDesc, setDirDesc] = useState({ x: 0, y: 100 });
  const [dirLine, setDirLine] = useState({ x: 0, y: 100 });

  const [lineHeight, setLineHeight] = useState(0);

  // ------------------- ON SLIDE CHANGE -------------------
  useEffect(() => {
    setDirTitle(getRandomDirection());
    setDirDesc(getRandomDirection());
    setDirLine(getRandomDirection());
    setProgress(0);
  }, [current]);

  // ------------------- AUTO SLIDE -------------------
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
  }, [isPaused, interval, items.length]);

  // ------------------- LINE HEIGHT CALC -------------------
  useLayoutEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current]);

  // ------------------- SWIPE EVENTS -------------------
  let touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 70) nextSlide(); // left swipe
    if (touchEndX - touchStartX > 70) prevSlide(); // right swipe
  };

  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  if (!items.length) return null;

  const optimizedImage = getOptimizedImage(slide.image);

  return (
    <div
      className="relative w-full h-[470px] md:h-[745px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ---------------- BACKGROUND IMAGE ---------------- */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          animate={{ opacity: 1, scale: 1.09 }} // cinematic zoom
          transition={{
            duration: 10,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={getAbsoluteUrl(optimizedImage)}
            alt={slide.image.alternativeText || slide.title}
            width={slide.image.width}
            height={slide.image.height}
            className="absolute inset-0 w-full h-full object-cover"
            priority={current === 0}
            loading={current === 0 ? "eager" : "lazy"}
            quality={75}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            fetchPriority="high"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ---------------- TEXT + LINES ---------------- */}
      <div className="absolute inset-0 flex justify-center md:justify-start items-center px-4 md:px-10 text-white">
        <div className="max-w-[1140px] w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mx-auto">
          
          {/* LINE */}
          <motion.div
            key={"line-" + current}
            initial={dirLine}
            animate={{ x: 0, y: 0, height: lineHeight }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden md:block w-px bg-gray-500 shrink-0"
          />

          {/* TEXT CONTENT */}
          <div
            ref={textRef}
            className="flex flex-col justify-center items-center md:justify-normal md:items-start text-center md:text-left w-full md:w-[calc(100%-120px)] lg:w-[calc(100%-150px)] mt-24"
          >
            {/* TITLE */}
            <motion.h2
              key={slide.title + current}
              initial={dirTitle}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-4xl md:text-[62px] font-light prata leading-[39px] md:leading-[82px] w-full max-w-[690px]"
            >
              {slide.title}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.div
              key={slide.description + current}
              initial={dirDesc}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="lato text-[16px] md:text-2xl font-light leading-[25px] md:leading-9 text-(--sand-500) md:text-white w-[340px] md:w-[725px] mt-3"
              dangerouslySetInnerHTML={{ __html: slide.description }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- NAV BUTTONS ---------------- */}
      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
