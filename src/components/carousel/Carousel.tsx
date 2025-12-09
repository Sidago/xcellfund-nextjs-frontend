/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollButton from "@/components/carousel/ScrollButton";
import Image from "next/image";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import { useInView } from "react-intersection-observer";

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

// ------------------- RESPONSIVE IMAGE PICKER -------------------
const getResponsiveImage = (image: Media, width: number) => {
  if (width < 768 && image.formats?.small?.url) return image.formats.small.url;
  if (width < 1024 && image.formats?.medium?.url)
    return image.formats.medium.url;
  if (image.formats?.large?.url) return image.formats.large.url;
  if (image.formats?.webp?.url) return image.formats.webp.url;
  return image.url;
};

// ------------------- BLUR PLACEHOLDER -------------------
const getBlurDataURL = () =>
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAn0B9p9oTiMAAAAASUVORK5CYII=";

const directions = [
  { x: -100, y: 0 }, // left
  { x: 100, y: 0 }, // right
  { x: 0, y: -100 }, // top
  { x: 0, y: 100 }, // bottom
];

const getRandomDirection = () =>
  directions[Math.floor(Math.random() * directions.length)];

export default function Carousel({ items, interval = 6000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1920);

  const textRef = useRef<HTMLDivElement | null>(null);
  const slide = items[current];

  const [dirTitle, setDirTitle] = useState({ x: 0, y: 0 });
  const [dirDesc, setDirDesc] = useState({ x: 0, y: 0 });
  const [dirLine, setDirLine] = useState({ x: 0, y: 0 });

  const [lineHeight, setLineHeight] = useState(0);

  // ------------------- LINE HEIGHT CALC -------------------
  useLayoutEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current]);

  // ------------------- WINDOW RESIZE -------------------
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ------------------- ON SLIDE CHANGE -------------------
  useEffect(() => {
    if (current !== 0) {
      setDirTitle(getRandomDirection());
      setDirDesc(getRandomDirection());
      setDirLine(getRandomDirection());
    }
  }, [current]);

  // ------------------- AUTO SLIDE -------------------
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [isPaused, interval, items.length]);

  // ------------------- SWIPE EVENTS -------------------
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 70) nextSlide();
    if (touchEndX.current - touchStartX.current > 70) prevSlide();
  };
  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  const isFirstSlide = current === 0;

  // ------------------- LAZY LOAD DETECTION -------------------
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  const optimizedImage = getResponsiveImage(slide.image, windowWidth);
  if (!items.length) return null;

  return (
    <div
      className="relative w-full h-[470px] md:h-[745px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      ref={inViewRef}
    >
      {/* ---------------- BLURRED PLACEHOLDER FOR FIRST SLIDE ---------------- */}
      {/* Removed blurred placeholder for first slide for faster LCP */}

      {/* ---------------- BACKGROUND IMAGE ---------------- */}
      {inView && (
        <AnimatePresence>
          <motion.div
            key={slide.id}
            initial={isFirstSlide ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isFirstSlide ? 1 : 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isFirstSlide ? 0 : 0.8 }}
            className="absolute inset-0 z-20"
          >
            <Image
              src={getAbsoluteUrl(optimizedImage)}
              alt={slide.image.alternativeText || slide.title}
              width={slide.image.width}
              height={slide.image.height}
              className="absolute inset-0 w-full h-full object-cover"
              priority={isFirstSlide}
              loading={isFirstSlide ? "eager" : "lazy"}
              quality={50}
              placeholder="blur"
              blurDataURL={getBlurDataURL()}
              fetchPriority={isFirstSlide ? "high" : "auto"}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* ---------------- TEXT ---------------- */}
      <div className="absolute inset-0 flex justify-center md:justify-start items-center px-4 md:px-10 text-white">
        <div className="max-w-[1140px] w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mx-auto">
          <motion.div
            key={"line-" + current}
            initial={dirLine}
            animate={{ x: 0, y: 0, height: lineHeight }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden md:block w-px z-20 bg-gray-300 shrink-0"
          />

          <div
            ref={textRef}
            className="flex flex-col justify-center items-center md:justify-normal md:items-start text-center md:text-left w-full md:w-[calc(100%-120px)] lg:w-[calc(100%-150px)] mt-24"
          >
            <motion.h2
              key={slide.title + current}
              initial={isFirstSlide ? false : dirTitle}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: isFirstSlide ? 0 : 0.9, ease: "easeOut" }}
              className="text-4xl md:text-[62px] z-20 font-light prata leading-[39px] md:leading-[82px] w-full max-w-[690px]"
            >
              {slide.title}
            </motion.h2>

            <motion.div
              key={slide.description + current}
              initial={isFirstSlide ? false : dirDesc}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: isFirstSlide ? 0 : 1,
                ease: "easeOut",
                delay: isFirstSlide ? 0 : 0.2,
              }}
              className="lato text-[16px] z-20 md:text-2xl font-light leading-[25px] md:leading-9 text-(--sand-500) md:text-white w-[340px] md:w-[725px] mt-3"
              dangerouslySetInnerHTML={{ __html: slide.description }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- NAV BUTTONS ---------------- */}
      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
