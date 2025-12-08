"use client";

import React from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import AppLink from "@/components/common/AppLink";
import { getAbsoluteUrl } from "@/utils/assetUrl";

type IconType = { name: string };

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: IconType | null;
};

type Content = {
  id: number;
  title?: string;
  subtitle?: string;
  description: string;
  link?: LinkItem;
};

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

interface WhoAreWeBannerProps {
  content: Content;
  images: Media[];
}

// Helper: pick best optimized image
const getOptimizedImage = (image: Media) =>
  image.formats?.small?.url ?? image.formats?.medium?.url ?? image.formats?.large?.url ?? image.url;

export default function WhoAreWeBanner({ data }: { data: WhoAreWeBannerProps }) {
  return (
    <div className="bg-white md:h-[631px]">
      <div className="max-w-[1140px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-6 px-10 md:px-0">
        {/* Left (Text) */}
        <div className="w-full md:w-[35%] flex justify-center px-5 mb-10 md:justify-start">
          <LeftContent {...data.content} />
        </div>

        {/* Right (Images) */}
        <div className="w-full md:w-[65%] flex justify-center md:justify-start">
          <RightContent images={data.images || []} />
        </div>
      </div>
    </div>
  );
}

const LeftContent = ({ subtitle, title, description, link }: Content) => (
  <div className="w-full flex flex-col items-start text-left">
    <div className="uppercase font-bold text-xs tracking-[2px] text-[#909aa3] lato">
      <div className="w-32 bg-[#cbd2d7] text-gray-400 h-px relative -left-44 top-2.5"></div>
      {subtitle}
    </div>
     <h1 className="text-(--sand-500) text-4xl leading-[1.56em] mt-3 prata">{title}</h1>
    <p className="text-[#333473] text-lg font-light lato leading-[30px] w-full md:w-[396px]">{description}</p>

    {link?.url && link.label && (
      <AppLink
        aria_label={link.aria_label}
        external={link.external}
        target={link.target}
        type={link.type}
        url={link.url}
        className="mt-6 px-6 py-2 bg-(--sand-500) text-white rounded text-base font-semibold sentence-case hover:bg-[#333743] transition-colors flex items-center gap-1"
      >
        <span>{link.label}</span>
        <Icon name={link.icon?.name || ""} />
      </AppLink>
    )}
  </div>
);

const RightContent = ({ images }: { images: Media[] }) => {
  const hero = images?.[0];
  const left = images?.[1];
  const right = images?.[2];

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full px-5 md:px-0 max-w-5xl relative top-[-40px]">
      <div className="relative flex flex-col gap-0 md:grid md:grid-cols-8">
        {hero && (
          <div className="md:col-start-3 md:col-end-13 overflow-hidden shadow-lg h-60 md:h-[344px] relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(hero))}
              alt={hero.alternativeText || "Hero Image"}
              width={hero.width}
              height={hero.height}
              className="w-full h-full object-cover"
              priority
              quality={80}
              sizes="100vw"
            />
          </div>
        )}

        {left && (
          <div className="md:col-start-2 md:col-end-4 md:-mt-10 overflow-hidden shadow-md h-60 md:h-[209px] relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(left))}
              alt={left.alternativeText || "Left Image"}
              width={left.width}
              height={left.height}
              className="w-full h-full object-cover"
              priority
              quality={70}
              sizes="50vw"
            />
          </div>
        )}

        {right && (
          <div className="md:col-start-4 md:col-end-13 md:-mt-10 overflow-hidden shadow-md h-60 md:h-[286px] relative">
            <Image
              src={getAbsoluteUrl(getOptimizedImage(right))}
              alt={right.alternativeText || "Right Image"}
              width={right.width}
              height={right.height}
              className="w-full h-full object-cover"
              priority
              quality={70}
              sizes="70vw"
            />
          </div>
        )}
      </div>
    </div>
  );
};
