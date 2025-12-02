"use client";
import React from "react";

export default function CopyrightSkeleton() {
  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4">
          {/* Left link skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-3 w-24 bg-gray-300 rounded animate-pulse" />
            <span className="h-4 border-l border-gray-400 opacity-50 mx-2"></span>
            <div className="h-3 w-24 bg-gray-300 rounded animate-pulse" />
          </div>

          {/* Right copyright skeleton */}
          <div className="h-3 w-40 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
