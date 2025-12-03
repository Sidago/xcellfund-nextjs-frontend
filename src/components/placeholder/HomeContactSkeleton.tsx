import React from "react";
import FormSkeleton from "@/components/placeholder/FormSkeleton";

type Props = {
  inputCount: number; // number of placeholder inputs
};

export default function HomeContactSkeleton({ inputCount }: Props) {
  return (
    <div className="w-full max-w-[1140px] px-4 md:mx-auto py-12">
      <FormSkeleton inputCount={inputCount} />
    </div>
  );
}