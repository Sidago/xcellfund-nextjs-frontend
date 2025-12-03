import React from "react";

export default function FooterSkeleton() {
  return (
    <footer className="w-full bg-[#f9f9f9] py-10 px-4 md:px-0">
      <div className="w-full max-w-[1140px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Branding Skeleton */}
          <div className="flex-1 flex flex-col items-start gap-4">
            {/* Logo */}
            <div className="w-36 h-10 bg-gray-300/60 rounded animate-pulse"></div>

            {/* Description (3 lines) */}
            <div className="w-full h-3 bg-gray-300/60 rounded animate-pulse"></div>
            <div className="w-4/5 h-3 bg-gray-300/60 rounded animate-pulse"></div>
            <div className="w-2/3 h-3 bg-gray-300/60 rounded animate-pulse"></div>
          </div>

          {/* Quick Links Skeleton */}
          <div className="flex-1 flex flex-col items-start gap-2">
            {/* Heading */}
            <div className="w-28 h-4 bg-gray-300/60 rounded animate-pulse mb-1"></div>

            {/* Links */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-32 h-3 bg-gray-300/60 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Address Skeleton */}
          <div className="flex-1 flex flex-col items-start gap-3">
            {/* Heading */}
            <div className="w-28 h-4 bg-gray-300/60 rounded animate-pulse mb-1"></div>

            {/* Address (3 lines) */}
            <div className="w-full h-3 bg-gray-300/60 rounded animate-pulse"></div>
            <div className="w-5/6 h-3 bg-gray-300/60 rounded animate-pulse"></div>

            {/* Contact Links */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="w-40 h-3 bg-gray-300/60 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
