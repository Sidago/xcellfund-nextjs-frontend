import React from "react";

type Props = {
  inputCount: number; // number of placeholder inputs
};

export default function FormSkeleton({ inputCount }: Props) {
  const isOdd = inputCount % 2 !== 0;

  return (
    <div className="w-full">
      {/* Skeleton Title */}
      <div className="h-12 md:h-14 w-3/4 md:w-1/4 bg-gray-300 animate-pulse mb-8 mx-auto md:mx-0 rounded"></div>

      {/* Skeleton Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: inputCount }).map((_, index) => {
          const isLastOdd = isOdd && index === inputCount - 1;

          return (
            <div
              key={index}
              className={`${isLastOdd ? "md:col-span-2" : ""} h-12 bg-gray-300 animate-pulse rounded`}
            ></div>
          );
        })}
      </div>

      {/* Skeleton Button */}
      <div className="mt-6 w-30 h-12 bg-gray-400 animate-pulse rounded md:mx-0"></div>
    </div>
  );
}
