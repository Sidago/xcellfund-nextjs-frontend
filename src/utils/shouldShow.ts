type Content = "contact-banner" | "map";

const notAllowedPathForContactBanner = ["/contact"]; // do not show contact banner on these paths
const allowedPathForMap = ["/","/contact-us"]; // only show map on these paths

export function shouldShow(content: Content, pathname: string): boolean {
  if (!pathname) return true; // default show
  const normalizedPath = pathname.toLowerCase();

  switch (content) {
    case "contact-banner":
      return !notAllowedPathForContactBanner.includes(normalizedPath);

    case "map":
      return allowedPathForMap.includes(normalizedPath);

    default:
      return true;
  }
}
