import React from "react";
import fetchApi from "@/services/ApiService";
import AppLayout from "@/components/layouts/AppLayout";
import Hero from "@/components/common/Hero";
import Sitemap from "@/components/sitemap/Sitemap";

export default async function Page() {
  const globalData = await fetchApi("global");
  const contactData = await fetchApi("contactUs");

  // Original menus
  const menus = globalData?.data?.mainmenu?.menus || [];

  // Append extra menu item for Investors
  const extraMenu = {
    id: 999999,
    menu: {
      id: 999999,
      label: "Investors",
      url: "/investors",
      type: "internal",
      target: "_self",
      aria_label: "Investors",
      external: false,
      icon: null,
    },
    submenu: [],
  };

  const finalMenus = [...menus, extraMenu];

  return (
    <AppLayout pathname="/sitemap">
      <Hero
        title="Sitemap"
        subtitle=""
        image={contactData?.data?.hero?.background_image}
      />
      <Sitemap data={finalMenus} />
    </AppLayout>
  );
}
