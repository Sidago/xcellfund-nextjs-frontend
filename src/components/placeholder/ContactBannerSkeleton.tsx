"use client";
import React from "react";

type Props = {
  hasButton?: boolean;
};

export default function ContactBannerSkeleton({ hasButton = true }: Props) {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-6 md:px-12 bg-gray-200 overflow-hidden rounded">
      {/* Skeleton Overlay for Background */}
      <div className="absolute inset-0 bg-gray-300 animate-pulse -z-10"></div>

      {/* Skeleton Content */}
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {/* Title */}
        <div className="h-12 md:h-16 w-3/4 md:w-1/2 bg-gray-400 animate-pulse rounded"></div>

        {/* Divider */}
        <div className="w-32 h-px bg-gray-400 animate-pulse mx-auto"></div>

        {/* Subtitle */}
        <div className="h-4 md:h-6 w-5/6 md:w-2/3 bg-gray-400 animate-pulse rounded"></div>

        {/* Button */}
        {hasButton && (
          <div className="h-10 w-32 md:w-40 bg-gray-400 animate-pulse rounded mt-4"></div>
        )}
      </div>
    </div>
  );
}
