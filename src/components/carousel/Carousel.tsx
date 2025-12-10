"use client";

type MediaFormat = { url: string; width: number; height: number };
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

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import ScrollButton from "@/components/carousel/ScrollButton";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import { useOptimizedImage } from "@/hooks/useOptimizedImage";

export default function Carousel({ items, interval = 3000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animBorder, setAnimBorder] = useState("animate-ltr");
  const [animTitle, setAnimTitle] = useState("animate-ttb");
  const [animDesc, setAnimDesc] = useState("animate-btt");
  const [lineHeight, setLineHeight] = useState(0);
  const textRef = useRef<HTMLDivElement | null>(null);

  const slide = items[current];
  const optimizedImage = useOptimizedImage(slide.image);

  const directions = [
    "animate-ltr",
    "animate-rtl",
    "animate-ttb",
    "animate-btt",
  ];

  const changeSlide = (next = true) => {
    const newIndex = next
      ? (current + 1) % items.length
      : (current - 1 + items.length) % items.length;

    setAnimBorder(directions[Math.floor(Math.random() * directions.length)]);
    setAnimTitle(directions[Math.floor(Math.random() * directions.length)]);
    setAnimDesc(directions[Math.floor(Math.random() * directions.length)]);
    setCurrent(newIndex);
  };

  const nextSlide = () => changeSlide(true);
  const prevSlide = () => changeSlide(false);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer); // cleanup on unmount
  }, [current, interval]); // re-run when current changes or interval changes

  useLayoutEffect(() => {
    if (textRef.current) setLineHeight(textRef.current.offsetHeight);
  }, [current]);

  if (!items.length) return null;

  return (
    <div className="relative w-full h-[470px] md:h-[745px] overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className={
          current === 0
            ? "absolute inset-0"
            : "absolute inset-0 animate-zoomSlow"
        }
      >
        <Image
          src={getAbsoluteUrl(optimizedImage)}
          alt={slide.image.alternativeText || slide.title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
          priority={current === 0} // first slide is priority
          loading={current === 0 ? "eager" : "lazy"}
          fetchPriority="high"
          quality={80}
        />
      </div>

      {/* TEXT OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center px-6 md:px-[120px] text-white">
        <div className="w-full max-w-[1140px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-24">
          {/* LEFT LINE */}
          <div
            className={`hidden md:block w-px bg-gray-400 ${animBorder}`}
            style={{ height: `${lineHeight}px` }}
          />

          {/* TEXT BLOCK */}
          <div
            className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
            ref={textRef}
          >
            <h2
              className={`text-4xl md:text-[62px] prata font-light leading-[39px] md:leading-[82px] max-w-[690px] mx-2 md:mx-0 ${animTitle}`}
            >
              {slide.title}
            </h2>

            <div
              className={`lato text-[16px] md:text-2xl font-light leading-[25px] md:leading-9 mt-4 max-w-[725px] mx-2 md:mx-0 ${animDesc}`}
              dangerouslySetInnerHTML={{ __html: slide.description }}
            />
          </div>
        </div>
      </div>

      {/* NAV BUTTONS */}
      <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="prev" onClick={prevSlide} />
      </div>
      <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <ScrollButton type="next" onClick={nextSlide} />
      </div>
    </div>
  );
}
