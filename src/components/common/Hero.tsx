/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import PicturePreview from "./PicturePreview";

type MediaFormat = {
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

type Media = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
    [key: string]: MediaFormat | undefined;
  };
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
type Props = {
  title: string;
  subtitle: string;
  alt_text?: string;
  image: Media;
};
export default function Hero({ image, alt_text,title, subtitle }: Props) {
  return (
    <header
      aria-label={title ?? "Hero"}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full min-h-[450px] md:min-h-[420px] lg:min-h-[500px]">
        <PicturePreview alt_text={alt_text} image={image} />
        {/* centered text */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-5 md:px-8 z-10">
          <div
            className="text-white w-full max-w-[1140px] mx-auto
            text-center lg:text-left flex flex-col items-center lg:items-start pb-32"
          >
            {title && (
              <h1 className="flex flex-nowrap gap-4 items-center justify-center lg:justify-start text-3xl md:text-6xl font-normal prata">
                <span className="h-20 md:h-32 w-px bg-gray-500 inline-block mr-5 md:mr-10"></span>
                <span>{title}</span>
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-base md:text-lg max-w-3xl opacity-90 mx-auto lg:mx-0">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
