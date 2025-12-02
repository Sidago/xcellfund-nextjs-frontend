"use client";

import React from "react";

interface ScrollButtonProps {
  type?: "next" | "prev";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ type = "next", onClick }) => {
  const isNext = type === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
      className="flex flex-col items-center cursor-pointer gap-0"
    >
      {/* Arrow Top / Up */}
      {isNext ? (
        <div className="relative w-0.5 h-5 bg-white">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-t-2 border-l-2 border-white rotate-45"
          />
        </div>
      ) : (
        <div className="w-0.5 h-[15px] bg-white" />
      )}

      {/* Text */}
      <div
        className={`text-white font-bold text-[14px] my-[30px] transform rotate-270 ${
          isNext ? "tracking-[4px]" : "tracking-[3px]"
        }`}
      >
        {isNext ? "NEXT" : "PREV"}
      </div>

      {/* Arrow Bottom / Down */}
      {isNext ? (
        <div className="w-0.5 h-[15px] bg-white" />
      ) : (
        <div className="relative w-0.5 h-5 bg-white">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-t-2 border-l-2 border-white rotate-225"
          />
        </div>
      )}
    </button>
  );
};

export default ScrollButton;
