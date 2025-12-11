import { Lato, Montserrat, Prata } from "next/font/google";

// Lato: multiple weights + italics
export const lato = Lato({
  subsets: ["latin"],
  weight: ["100","300","400","700","900"],
  style: ["normal","italic"],
  display: "swap",
  variable: "--font-lato",
});

// Montserrat: multiple weights + italics
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  style: ["normal","italic"],
  display: "swap",
  variable: "--font-montserrat",
});

// Prata: only 400 normal
export const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-prata",
});
