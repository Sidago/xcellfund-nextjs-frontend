/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PicturePreview from "@/components/common/PicturePreview";
import Icon from "@/components/common/Icon";
import AppLink from "@/components/common/AppLink";

type Icon = {
  name: string;
};

type LinkItem = {
  id: number;
  label: string | null;
  url: string;
  type: "text" | "email" | "phone";
  target?: "_blank" | "_self";
  aria_label?: string;
  external?: boolean;
  icon: Icon | null;
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

export default function WhoAreWeBanner({
  data,
}: {
  data: WhoAreWeBannerProps;
}) {
  return (
    <div className="bg-white">
      <div className="max-w-[1140px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6">
        {/* Left (Text) */}
        <div className="w-full md:w-[35%] flex justify-center px-5 mb-10 md:justify-start">
          <LeftContent {...data?.content} />
        </div>
        {/* Right (Images) */}
        <div className="w-full md:w-[65%] flex justify-center md:justify-start">
          <RightContent images={data?.images || []} />
        </div>
      </div>
    </div>
  );
}

const LeftContent = ({ subtitle, title, description, link }: Content) => (
  <div className="w-full flex flex-col items-start text-left">
    <div className="uppercase font-bold text-xs tracking-[2px]">
      <div className="w-32 bg-[#cbd2d7] text-gray-400 h-px relative -left-44 top-2.5"></div>
      {subtitle}
    </div>
    <h1 className="text-[#c6ac83] text-4xl leading-[1.56em] mt-3 prata">
      {title}
    </h1>
    <p className="text-gray-400 text-[14px] tracking-widest mt-4 max-w-md">
      {description}
    </p>

    {link && link.url && link.label && (
      <AppLink
        aria_label={link.aria_label}
        external={link.external}
        target={link.target}
        type={link.type}
        url={link.url}
        className="mt-6 px-6 py-3 bg-(--sand-500) text-white rounded text-base font-semibold sentence-case hover:bg-gray-900 transition-colors flex items-center gap-1"
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
    <div className="w-full px-5 md:px-0 max-w-5xl relative top-[-60px]">
      <div className="relative flex flex-col gap-0 md:grid md:grid-cols-8">
        {hero && (
          <div className="md:col-start-3 md:col-end-13 overflow-hidden shadow-lg h-60 md:h-[360px] relative">
            <PicturePreview image={hero} priority />
          </div>
        )}
        {left && (
          <div className="md:col-start-2 md:col-end-4 md:-mt-10 overflow-hidden shadow-md h-60 md:h-[180px] relative">
            <PicturePreview image={left} priority />
          </div>
        )}
        {right && (
          <div className="md:col-start-4 md:col-end-13 md:-mt-10 overflow-hidden shadow-md h-60 relative">
            <PicturePreview image={right} priority />
          </div>
        )}
      </div>
    </div>
  );
};
