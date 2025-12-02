"use client";
import React from "react";

type Props = {
  inputCount?: number;
  socialsCount?: number;
};

export default function SubscriptionSkeleton({
  socialsCount = 3,
}: Props) {
  return (
    <div className="w-full bg-gray-950 py-6 px-4">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Input + Button Skeleton */}
          <div className="w-full md:w-1/3">
            <div className="flex w-full rounded overflow-hidden">
              {/* Input */}
              <div className="h-12 bg-gray-700/40 w-full animate-pulse" />
              {/* Button */}
              <div className="h-12 w-28 bg-gray-700/40 animate-pulse" />
            </div>
          </div>

          {/* Social Icons Skeleton */}
          <div className="flex gap-4 md:justify-end justify-center w-full md:w-auto">
            {Array.from({ length: socialsCount }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-6 rounded bg-gray-700/40 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
