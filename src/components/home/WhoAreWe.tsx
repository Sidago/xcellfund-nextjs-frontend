import React from "react";
import AppLink from "@/components/common/AppLink";

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
  link?: LinkItem;
};

interface WhoAreWeProps {
  left_content: Content;
  right_content: Content;
}

export default function WhoAreWe({ data }: { data: WhoAreWeProps }) {
  return (
    <div className="bg-gray-950">
      <div
        className="bg-[radial-gradient(circle_at_center,#363e44_0%,#202326_100%)]
                   opacity-100 
                   transition-[background,border-radius,opacity] duration-300 
                   py-16 md:pt-16 md:pb-32 px-6 md:px-0"
      >
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <LeftContent {...data?.left_content} />
          </div>

          {/* Vertical line (hidden on mobile) */}
          <div className="hidden md:block md:w-[5%] min-h-52 border-l border-[#ffffff33]"></div>

          {/* Right */}
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <RightContent {...data?.right_content} />
          </div>
          <div className="w-full md:w-[25%]">
            {/* Empty div to balance the flex layout */}
          </div>
        </div>
      </div>
    </div>
  );
}

const LeftContent = ({ title, description }: Content) => (
  <div className="w-full flex flex-col items-start text-left">
    <div className="text-white uppercase font-bold text-xs tracking-[2px]">
      <div className="w-32 bg-[#ffffff33] h-px relative -left-44 top-2.5"></div>
      {title}
    </div>
    <h1 className="text-[#c6ac83] text-4xl leading-[1.56em] mt-3 prata">
      {description}
    </h1>
  </div>
);

const RightContent = ({ description, link }: Content) => (
  <div className="w-full flex flex-col text-left md:text-left pb-10 md:pb-0">
    <p className="text-[#cbd2d7] text-base font-light tracking-widest leading-relaxed">
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
        className="bg-(--sand-500) px-3 py-2 text-white rounded text-base font-normal prata sentence-case
             transition-all duration-300 ease-in-out hover:bg-gray-800 mt-6 inline-block w-fit"
      />
    )}
  </div>
);
