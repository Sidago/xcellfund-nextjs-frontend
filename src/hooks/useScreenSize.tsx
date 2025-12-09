// hooks/useScreenSize.ts
"use client";

import { useState, useEffect } from "react";

export function useScreenSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update(); // initial width
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
