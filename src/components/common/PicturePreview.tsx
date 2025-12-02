/* eslint-disable @typescript-eslint/no-explicit-any */
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
};

export default function PicturePreview({ alt_text, image }: Props) {
  return (
    <picture className="w-full h-full">
      {image.formats?.small && (
        <source
          media="(max-width: 500px)"
          srcSet={getAbsoluteUrl(image.formats.small.url)}
        />
      )}
      {image.formats?.medium && (
        <source
          media="(max-width: 750px)"
          srcSet={getAbsoluteUrl(image.formats.medium.url)}
        />
      )}
      {image.formats?.large && (
        <source
          media="(max-width: 1000px)"
          srcSet={getAbsoluteUrl(image.formats.large.url)}
        />
      )}
      {/* Fallback / default */}
      <img
        src={getAbsoluteUrl(image.url)}
        alt={alt_text || image.alternativeText || "xcellfund"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </picture>
  );
}
