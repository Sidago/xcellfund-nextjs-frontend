"use client";
import React from "react";
import TextInput from "../common/TextInput";

type Icon = {
  name: string;
};

type Button = {
  label: string;
  icon: Icon;
};

type Input = {
  icon: Icon;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  required?: boolean;
  name?: string;
};

type Props = {
  button: Button;
  input: Input[];
};

export default function Form({ button, input }: Props) {
  const isOdd = input.length % 2 !== 0; // check if total inputs are odd

  return (
    <div className="w-full">
      {/* Form Title */}
      {/* <h2 className="text-(--sand-500) text-4xl leading-[1.56em] uppercase mb-8 text-center md:text-left prata">
        {title}
      </h2> */}

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {input.map((field, index) => {
          // Check if last element in an odd-length array
          const isLastOdd = isOdd && index === input.length - 1;

          return (
            <div key={index} className={isLastOdd ? "md:col-span-2" : ""}>
              {field.label && <label className="block text-sm font-light mb-2 text-gray-950" htmlFor={field.name}>{field.label}<span>{field.required ? " *" : ""}</span></label>}
              <TextInput
                name={field.name}
                type={field.type}
                value=""
                onChange={(event) => console.log(event)}
                placeholder={field.placeholder}
              />
            </div>
          );
        })}
      </form>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="inline-block bg-black text-white px-6 py-3 rounded capitalize font-normal tracking-[1px] hover:opacity-95 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}
