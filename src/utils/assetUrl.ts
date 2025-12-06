import appConfig from "@/config/app.config";

export const getAbsoluteUrl = (url: string) => {
  if (url.startsWith("http")) return url;
  return `${appConfig.assetUrl}${url}`;
};
