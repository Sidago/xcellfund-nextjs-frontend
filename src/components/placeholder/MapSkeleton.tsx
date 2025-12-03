import React from "react";

export default function MapSkeleton() {
  return (
    <div className="w-full h-64 md:h-96 relative overflow-hidden shadow-md">
      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
    </div>
  );
}
