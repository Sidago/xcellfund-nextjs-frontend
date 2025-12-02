import React from "react";
import Form from "@/components/contact/Form";
import AppLink from "@/components/common/AppLink";

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

type Address = {
  id: string;
  heading: string;
  address: string;
  links: LinkItem[];
};

type Props = {
  button: Button;
  input: Input[];
  address: Address;
};

export default function ContactusContact({ button, input, address }: Props) {
  return (
    <div className="w-full max-w-[1140px] px-4 md:mx-auto py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form: full width on mobile, flex-1 on desktop */}
        <div className="w-full md:flex-1">
          <h2 className="text-gray-800 text-2xl leading-[1.56em] uppercase mb-8 text-center md:text-left prata">
            Send Us a Message
          </h2>
          <Form input={input} button={button} />
        </div>

        {/* Address: full width on mobile, 1/3 width on desktop */}
        <div className="w-full md:w-1/3 flex-none">
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-bold text-base text-gray-800 border-b border-gray-200  w-full mb-2 pb-4 prata tracking-[2px]">
              {address.heading}
            </h4>

            <p className="text-base font-light text-gray-700 whitespace-pre-line">
              {address.address}
            </p>

            {address?.links?.map((link: LinkItem, index: number) => (
              <AppLink
                key={index}
                aria_label={link.aria_label}
                external={link.external}
                label={link.label ?? ""}
                target={link.target}
                type={link.type}
                url={link.url}
                className={`inline-flex items-center font-light transition-colors duration-200 text-base ${
                  link.type === "email" ? "text-(--sand-500)" : "text-gray-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
