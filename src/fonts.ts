import localFont from "next/font/local";

export const lato = localFont({
  src: [
    { path: "../public/fonts/lato/Lato-Thin.woff2", weight: "100" },
    { path: "../public/fonts/lato/Lato-Light.woff2", weight: "300" },
    { path: "../public/fonts/lato/Lato-Regular.woff2", weight: "400" },
    { path: "../public/fonts/lato/Lato-Bold.woff2", weight: "700" },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    { path: "../public/fonts/montserrat/Montserrat-Light.woff2", weight: "300" },
    { path: "../public/fonts/montserrat/Montserrat-Regular.woff2", weight: "400" },
    { path: "../public/fonts/montserrat/Montserrat-Medium.woff2", weight: "500" },
    { path: "../public/fonts/montserrat/Montserrat-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/montserrat/Montserrat-Bold.woff2", weight: "700" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const prata = localFont({
  src: [{ path: "../public/fonts/prata/Prata-Regular.woff2", weight: "400" }],
  variable: "--font-prata",
  display: "swap",
});
