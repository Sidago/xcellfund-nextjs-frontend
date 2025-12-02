/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLink from "./AppLink";
import Icon from "./Icon";
import React from "react";

export default function Topbar({ data }: { data: any }) {
  const { contacts, socials } = data.topnav;

  return (
    <div className="bg-transparent w-full border-b border-gray-100 py-2 px-6 md:px-0">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex flex-row justify-end gap-2 items-center md:justify-between md:gap-0">
          {/* LEFT: CONTACTS  large screen*/}
          <div className="hidden md:flex-row md:items-center md:gap-10 md:flex">
            {contacts &&
              contacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="flex flex-row items-center gap-2"
                >
                  {contact.icon && (
                    <Icon
                      name={contact.icon.name}
                      className="w-4 h-4 text-gray-100"
                    />
                  )}

                  <AppLink
                    aria_label={contact.aria_label}
                    external={contact.external}
                    label={contact.label}
                    target={contact.target}
                    type={contact.type}
                    url={contact.url}
                    className="text-xs font-light text-gray-100"
                  />
                </div>
              ))}
          </div>
          {/* LEFT: CONTACTS  mobile screen*/}
          <div className="flex md:hidden flex-row items-center gap-3">
            {contacts &&
              contacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="flex flex-row items-center"
                >
                  <AppLink
                    aria_label={contact.aria_label}
                    external={contact.external}
                    target={contact.target}
                    type={contact.type}
                    url={contact.url}
                  >
                    {contact.icon && (
                      <Icon
                        name={contact.icon.name}
                        className="w-4 h-4 text-gray-100"
                      />
                    )}
                  </AppLink>
                </div>
              ))}
          </div>

          {/* RIGHT: SOCIALS */}
          <div className="flex flex-row items-center gap-3">
            {socials &&
              socials.map((social: any) => (
                <div key={social.id} className="flex items-center">
                  <AppLink
                    aria_label={social.aria_label}
                    external={social.external}
                    label={social.label}
                    target={social.target}
                    type={social.type}
                    url={social.url}
                  >
                    {social.icon && (
                      <Icon
                        name={social.icon.name}
                        className="w-4 h-4 text-gray-100"
                      />
                    )}
                  </AppLink>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
