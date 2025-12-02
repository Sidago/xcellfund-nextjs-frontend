import React from "react";
import AppLink from "../common/AppLink";

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
  link?: LinkItem | null;
};

export default function Highlights({ data }: { data: Content[] }) {
  const list = data ?? [];

  return (
    <div className="bg-transparent bg-[radial-gradient(at_center_center,#1d2022_0%,#202326_100%)] opacity-100 transition-[background,border-radius,opacity] duration-300">
      <div className="max-w-[1140px] mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------
   Single Highlight Item
----------------------------- */

const Item = ({ title, subtitle, description, link }: Content) => {
  return (
    <div className="bg-[#2C2F31] p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.35)]">
      {subtitle && (
        <div className="text-(--sand-500) uppercase tracking-widest text-sm mb-2">
          {subtitle}
        </div>
      )}

      {title && (
        <h3 className="text-2xl font-normal text-white mb-3 prata">{title}</h3>
      )}

      <p className="text-white mb-5 prata text-base font-light leading-7">
        {description}
      </p>
      {link && (
        <AppLink
          aria_label={link.aria_label}
          external={link.external}
          label={link.label ?? ""}
          target={link.target}
          type={link.type}
          url={link.url}
          className="px-4 py-2 rounded bg-gray-600 text-white font-medium hover:bg-(--sand-500) uppercase prata text-sm"
        />
      )}
    </div>
  );
};
