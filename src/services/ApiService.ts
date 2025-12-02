/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/config/app.config";
import buildPopulateParams from "@/utils/buildPopulateParams";

type ApiKey = keyof typeof apis;

const commonPopulateFields = ["seo", "hero.background_image"];

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
  contactUs:{
    url: `${appConfig.apiUrl}/api/contact-us`,
    populate: [
      "seo",
      "hero.background_image"
    ],
  },
  investor:{
    url: `${appConfig.apiUrl}/api/investor`,
    populate: [
      "seo",
      "hero.background_image",
      "form.input.icon",
      "form.button.icon",
    ],
  },
  investment: {
    url: `${appConfig.apiUrl}/api/investment`,
    populate: [...commonPopulateFields],
  },
  privatePlacement: {
    url: `${appConfig.apiUrl}/api/private-placement`,
    populate: [...commonPopulateFields],
  },
  debtRestructuring: {
    url: `${appConfig.apiUrl}/api/debt-restructuring`,
    populate: [...commonPopulateFields],
  },
  convertibleDebenture: {
    url: `${appConfig.apiUrl}/api/convertible-debenture`,
    populate: [...commonPopulateFields],
  },
  seedInvestment: {
    url: `${appConfig.apiUrl}/api/seed-investment`,
    populate: [...commonPopulateFields],
  },
  collateralizedFunding: {
    url: `${appConfig.apiUrl}/api/collateralized-funding`,
    populate: [...commonPopulateFields],
  },
  regAFunding: {
    url: `${appConfig.apiUrl}/api/reg-a-funding`,
    populate: [...commonPopulateFields],
  },
  equityLineFunding: {
    url: `${appConfig.apiUrl}/api/equity-line-funding`,
    populate: [...commonPopulateFields],
  },
  stockLoans: {
    url: `${appConfig.apiUrl}/api/stock-loan`,
    populate: [...commonPopulateFields],
  },
  seriesDFunding: {
    url: `${appConfig.apiUrl}/api/series-d-funding`,
    populate: [...commonPopulateFields],
  },

  partnership: {
    url: `${appConfig.apiUrl}/api/partnership`,
    populate: [...commonPopulateFields],
  },
  partnershipProcess: {
    url: `${appConfig.apiUrl}/api/partnership-process`,
    populate: [...commonPopulateFields],
  },
  partnershipStrategy: {
    url: `${appConfig.apiUrl}/api/partnership-strategy`,
    populate: [...commonPopulateFields],
  },
  partnershipVsInvestment: {
    url: `${appConfig.apiUrl}/api/partnership-vs-investment`,
    populate: [...commonPopulateFields],
  },

  webTechnology: {
    url: `${appConfig.apiUrl}/api/web-technology`,
    populate: [...commonPopulateFields],
  },
  webPublication: {
    url: `${appConfig.apiUrl}/api/web-publication`,
    populate: [...commonPopulateFields],
  },
  webProperty: {
    url: `${appConfig.apiUrl}/api/web-property`,
    populate: [...commonPopulateFields],
  },
  saasSolution: {
    url: `${appConfig.apiUrl}/api/saas-solution`,
    populate: [...commonPopulateFields],
  },
  niche: {
    url: `${appConfig.apiUrl}/api/niche`,
    populate: [...commonPopulateFields],
  },
  mobileApplication: {
    url: `${appConfig.apiUrl}/api/mobile-application`,
    populate: [...commonPopulateFields],
  },
  internetAdvertising: {
    url: `${appConfig.apiUrl}/api/internet-advertising`,
    populate: [...commonPopulateFields],
  },
  desktopSoftware: {
    url: `${appConfig.apiUrl}/api/desktop-software`,
    populate: [...commonPopulateFields],
  },

  corporateAccountability: {
    url: `${appConfig.apiUrl}/api/corporate-accountability`,
    populate: [...commonPopulateFields],
  },
  corporateFocus: {
    url: `${appConfig.apiUrl}/api/corporate-focus`,
    populate: [...commonPopulateFields],
  },
  corporateResponsibility: {
    url: `${appConfig.apiUrl}/api/corporate-responsibility`,
    populate: [...commonPopulateFields],
  },
  corporateSustainability: {
    url: `${appConfig.apiUrl}/api/corporate-sustainability`,
    populate: [...commonPopulateFields],
  },
  employeePride: {
    url: `${appConfig.apiUrl}/api/employee-pride`,
    populate: [...commonPopulateFields],
  },
  executiveViewpoint: {
    url: `${appConfig.apiUrl}/api/executive-viewpoint`,
    populate: [...commonPopulateFields],
  },
  internationalImpact: {
    url: `${appConfig.apiUrl}/api/international-impact`,
    populate: [...commonPopulateFields],
  },
  investmentStrategy: {
    url: `${appConfig.apiUrl}/api/investment-strategy`,
    populate: [...commonPopulateFields],
  },
  ourStrategy: {
    url: `${appConfig.apiUrl}/api/our-strategy`,
    populate: [...commonPopulateFields],
  },
  philanthropy: {
    url: `${appConfig.apiUrl}/api/philanthropy`,
    populate: [...commonPopulateFields],
  },
  visionAndGoal: {
    url: `${appConfig.apiUrl}/api/vision-and-goal`,
    populate: [...commonPopulateFields],
  },

  termsOfService: {
    url: `${appConfig.apiUrl}/api/terms-of-service`,
    populate: [...commonPopulateFields],
  },
  privacyPolicy: {
    url: `${appConfig.apiUrl}/api/privacy-policy`,
    populate: [...commonPopulateFields],
  },
  investors: {
    url: `${appConfig.apiUrl}/api/investor`,
    populate: [...commonPopulateFields,"form.input.icon","form.button.icon"],
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
