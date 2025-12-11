/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useOptimizedImage.ts
"use client";

import { useMemo } from "react";
import { useScreenSize } from "./useScreenSize";

export function useOptimizedImage(image: any) {
  const width = useScreenSize();

  return useMemo(() => {
    if (!image) return null;

    // Mobile
    if (width < 640 && image.formats?.small) {
      return image.formats.small.url;
    }

    // Tablet / laptop
    if (width < 1200 && image.formats?.medium) {
      return image.formats.medium.url;
    }

    // Desktop
    if (image.formats?.large) {
      return image.formats.large.url;
    }

    // Fallback to original
    return image.url;
  }, [width, image]);
}
