/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import React from "react";

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
  alt_text?: string;
  image: Media;
  priority?: boolean; // LCP
};

export default function PicturePreview({
  alt_text,
  image,
  priority = false,
}: Props) {
  // Choose responsive source URLs or fallback
  const srcLarge = image.formats?.large ? getAbsoluteUrl(image.formats.large.url) : null;
  const srcMedium = image.formats?.medium ? getAbsoluteUrl(image.formats.medium.url) : null;
  const srcSmall = image.formats?.small ? getAbsoluteUrl(image.formats.small.url) : null;
  const fallbackSrc = getAbsoluteUrl(image.url);

  return (
    <div className="w-full h-full relative min-h-[350px] sm:min-h-[400px] md:min-h-[450px]">
      <Image
        src={fallbackSrc}
        alt={alt_text || image.alternativeText || "xcellfund"}
        fill
        sizes="(max-width: 750px) 100vw, (max-width: 1000px) 50vw, 33vw"
        priority={priority}
        className="object-cover"
        // Optional: next/image will automatically pick WebP/AVIF if available
        // Optional: add loader if needed for your backend
      />
    </div>
  );
}
