"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  embedLink: string;
  title?: string;
};

export default function Map({ embedLink, title = "xcellfund" }: Props) {
  const [loadMap, setLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoadMap(true);
            observer.disconnect(); // stop observing after load
          }
        });
      },
      { rootMargin: "200px" } // start loading slightly before entering viewport
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 md:h-96 relative overflow-hidden shadow-md bg-gray-200"
    >
      {loadMap ? (
        <iframe
          src={embedLink}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label={title}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-gray-500">
          Loading map…
        </div>
      )}
    </div>
  );
}
