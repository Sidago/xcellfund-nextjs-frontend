/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/config/app.config";
import buildPopulateParams from "@/utils/buildPopulateParams";

type ApiKey = keyof typeof apis;

const apis = {
  global: {
    url: `${appConfig.apiUrl}/api/global`,
    populate: [
      "topnav.contacts.icon",
      "topnav.socials.icon",
      "mainmenu.brand.logo",
      "mainmenu.brand.link.icon",
      "mainmenu.menus.menu.icon",
      "mainmenu.menus.submenu.icon",
      "map",
      "contact_section.background_image",
      "contact_section.link.icon",
      "subscription_section.input.icon",
      "subscription_section.button.icon",
      "footer_section.branding.brand.logo",
      "footer_section.branding.brand.link.icon",
      "footer_section.quicklinks.links.icon",
      "footer_section.address.links.icon",
      "footer_section.copyright.links.icon",
      "contact_form.input.icon",
      "contact_form.button.icon",
    ],
  },
  home: {
    url: `${appConfig.apiUrl}/api/home`,
    populate: [
      "seo",
      "carousel.items.image",
      "features.icon",
      "features.link.icon",
      "services.cards.icon",
      "who_we_are.left_content.link.icon",
      "who_we_are.right_content.link.icon",
      "who_we_are_banner.content.link.icon",
      "who_we_are_banner.images",
      "highlights.link.icon",
    ],
  },
};
/**
 * Generic API fetcher for Strapi endpoints
 * @param api - API key from `apis` object
 * @returns JSON response
 */
export const fetchApi = async <T = any>(api: ApiKey): Promise<T | null> => {
  const apiConfig = apis[api];
  const query = buildPopulateParams(apiConfig.populate || []);
  const url = query ? `${apiConfig.url}?${query}` : apiConfig.url;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appConfig.apiKey}`,
      },
      next: { revalidate: appConfig.cacheTimeout },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${api}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching API "${api}":`, error.message || error);
    return null;
  }
};

export default fetchApi;
