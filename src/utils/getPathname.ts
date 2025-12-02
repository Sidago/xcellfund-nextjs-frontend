"use server";

import { headers } from "next/headers";

export async function getPathname() {
  const headersList = await headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "";
  const fullPath = headersList.get('referer') || `${protocol}://${domain}`;
  const [,pathname] = fullPath.match( new RegExp(`${protocol}?:\/\/${domain}(.*)`))||[];
  return pathname;
}
