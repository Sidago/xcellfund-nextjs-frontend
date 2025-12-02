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
  const fallbackSrc = getAbsoluteUrl(image.url);

  return (
    <picture className="w-full h-full">
      {/* Large image for desktops */}
      {image.formats?.large && (
        <source
          media="(min-width: 1001px)"
          srcSet={getAbsoluteUrl(image.formats.large.url)}
          type={image.formats.large.mime}
        />
      )}
      {/* Medium image for tablets */}
      {image.formats?.medium && (
        <source
          media="(min-width: 751px) and (max-width: 1000px)"
          srcSet={getAbsoluteUrl(image.formats.medium.url)}
          type={image.formats.medium.mime}
        />
      )}
      {/* Small image for mobile */}
      {image.formats?.small && (
        <source
          media="(max-width: 750px)"
          srcSet={getAbsoluteUrl(image.formats.small.url)}
          type={image.formats.small.mime}
        />
      )}
      {/* Fallback for browsers that don't support <picture> */}
      <img
        src={fallbackSrc}
        alt={alt_text || image.alternativeText || "xcellfund"}
        className="w-full h-full object-cover min-h-[350px] sm:min-h-[400px] md:min-h-[450px]"
        loading="lazy"
        width={image.width}
        height={image.height}
      />
    </picture>
  );
}
