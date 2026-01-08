"use client";
import React from "react";

interface MenuItem {
  id: number;
  menu: {
    id: number;
    label: string;
    url: string;
  };
  submenu: {
    id: number;
    label: string;
    url: string;
  }[];
}

interface SitemapProps {
  data: MenuItem[];
  columns?: number;
}

export default function AppleStyleSitemap({ data, columns = 3 }: SitemapProps) {
  if (!data || data.length === 0) return null;

  return (
    <footer className="py-12 px-4 font-sans selection:bg-blue-500">
      <div className="max-w-6xl mx-auto">
        <div 
          className="gap-8" 
          style={{ columnCount: columns }}
        >
          {data.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col mb-2 break-inside-avoid-column"
            >
              <h3 className="font-semibold tracking-tight">
                <a href={item.menu.url} className="text-base text-900 hover:underline">
                  {item.menu.label}
                </a>
              </h3>

              {item.submenu.length > 0 && (
                <ul className="flex flex-col">
                  {item.submenu.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.url}
                        className="text-sm text-gray-900 transition-colors duration-100 hover:underline"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}