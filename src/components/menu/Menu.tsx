/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, Fragment } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { MobileMenuButton } from "@/components/menu/MobileMenuButton";
import { MobileMenu } from "@/components/menu/MobileMenu";
import { getAbsoluteUrl } from "@/utils/assetUrl";
import AppLink from "@/components/common/AppLink";
import Icon from "@/components/common/Icon";
import { usePathname } from "next/navigation";

type Icon = { name: string };
type Logo = {
  url: string;
  alternativeText?: string;
  name?: string;
  width?: number;
  height?: number;
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
type Brand = { alt_text: string; logo: Logo; link: LinkItem };
type MenuItem = { id: number; menu: LinkItem; submenu: LinkItem[] };
type Props = { brand: Brand; menus: MenuItem[] };

export default function Menu({ brand, menus }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); 

  const toggleMenu = () => setOpen((p) => !p);
  const closeMenu = () => setOpen(false);

  return (
    <header className="w-full bg-transparent">
      <div className="w-full max-w-[1140px] mx-auto px-6 md:px-0">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <AppLink
            aria_label={brand.link.aria_label}
            external={brand.link.external}
            target={brand.link.target}
            type={brand.link.type}
            url={brand.link.url}
          >
            <Image
              src={getAbsoluteUrl(brand.logo.url)}
              alt={brand.alt_text || brand.logo.alternativeText || "Logo"}
              width={brand.logo.width || 150}
              height={brand.logo.height || 40}
              priority
              unoptimized
            />
          </AppLink>

          {/* ⭐ Desktop Menu with Headless UI */}
          <nav className="hidden md:flex items-center gap-8">
            {menus.map((item) => {
              const isChildActive = item.submenu.some(
                (sub) => sub.url === pathname
              );
              const isParentActive = item.menu.url === pathname || isChildActive;

              return (
                <HeadlessMenu key={item.id} as="div" className="relative">
                  {({ open: dropdownOpen }) => (
                    <div
                      onMouseEnter={(e) => {
                        (e.currentTarget.querySelector("button") as any)?.click();
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget.querySelector("button") as any)?.click();
                      }}
                    >
                      {/* Parent Menu Button */}
                      <HeadlessMenu.Button
                        className="text-white focus:outline-none focus:ring-0"
                      >
                        <AppLink
                          aria_label={item.menu.aria_label}
                          external={item.menu.external}
                          target={item.menu.target}
                          type={item.menu.type}
                          url={item.menu.url}
                          label={item.menu.label || ""}
                          className={`montserrat font-medium text-xs uppercase hover:border-b hover:border-white ${
                            isParentActive
                              ? "border-b border-white"
                              : ""
                          }`}
                        />
                        {item.submenu.length > 0 && (
                          <Icon name="faPlus" className="text-xs" />
                        )}
                      </HeadlessMenu.Button>

                      {/* Dropdown */}
                      {item.submenu.length > 0 && (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-150"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <HeadlessMenu.Items className="absolute top-full right-0 left-auto bg-white shadow-lg z-50 w-56 max-w-[calc(100vw-20px)] overflow-hidden px-4 py-2 focus:outline-none focus:ring-0">
                            {item.submenu.map((sub) => {
                              const isActive = sub.url === pathname;
                              return (
                                <HeadlessMenu.Item key={sub.id}>
                                  {({ active }) => (
                                    <div className="py-1">
                                      <AppLink
                                        aria_label={sub.aria_label}
                                        external={sub.external}
                                        target={sub.target}
                                        type={sub.type}
                                        url={sub.url}
                                        label={sub.label || ""}
                                        className={`montserrat font-normal text-xs inline-block uppercase hover:text-(--sand-500) hover:border-b hover:border-(--sand-500) ${
                                          isActive
                                            ? "border-b border-(--sand-500) text-(--sand-500)"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  )}
                                </HeadlessMenu.Item>
                              );
                            })}
                          </HeadlessMenu.Items>
                        </Transition>
                      )}
                    </div>
                  )}
                </HeadlessMenu>
              );
            })}
          </nav>

          {/* Mobile Button */}
          <MobileMenuButton open={open} toggle={toggleMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={open} close={closeMenu} menus={menus} brand={brand} />
    </header>
  );
}
