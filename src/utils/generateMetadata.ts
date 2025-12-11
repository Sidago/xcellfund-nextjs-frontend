import { defaultSEO } from "@/config/seo.config";

export const buildUrl = (path?: string) => {
  if (!path) return defaultSEO.canonical;
  if (path.startsWith("http")) return path;

  return `${defaultSEO.canonical.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export function createMetadata({
  creator = defaultSEO.creator,
  og_image = defaultSEO.og_image,
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  canonical = defaultSEO.canonical,
  /**extra */
  type = "website", // website, article, product
  authors = defaultSEO.authors,
  publisher = defaultSEO.publisher,
}: {
  creator?: string;
  og_image?: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  /**extra */
  type?: "website" | "article" | "product";
  authors?: string;
  publisher?: string;
}) {
  const absoluteImage = buildUrl(og_image);
  const absoluteUrl = buildUrl(canonical);

  const authorList = authors
    ? authors.split(",").map((name) => name.trim())
    : [];

  // JSON-LD Structured Data
  const jsonLd =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          image: [absoluteImage],
          author: authorList.map((name) => ({ "@type": "Person", name })),
          publisher: {
            "@type": "Organization",
            name: publisher,
            logo: {
              "@type": "ImageObject",
              url: absoluteImage,
            },
          },
          mainEntityOfPage: absoluteUrl,
        }
      : type === "product"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: title,
          description,
          image: [absoluteImage],
          brand: publisher,
          url: absoluteUrl,
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: title,
          description,
          url: absoluteUrl,
          publisher: {
            "@type": "Organization",
            name: publisher,
          },
        };

  return {
    title,
    description,
    keywords,
    authors: [{ name: authors }],
    creator,
    publisher,
    alternates: { canonical: absoluteUrl },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        maxImagePreview: "large",
        maxSnippet: -1,
        maxVideoPreview: -1,
      },
    },

    // ========== OpenGraph (FB, LinkedIn, WhatsApp, Reddit, Slack) ==========
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      type,
      siteName: defaultSEO.siteName,
      images: [{ url: absoluteImage }],
    },

    // ========== Twitter Card ==========
    twitter: {
      card: "summary_large_image",
      creator: creator,
      title,
      description,
      images: [absoluteImage],
    },

    // ========== Pinterest, Telegram, Viber, etc. ==========
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
      "pinterest-rich-pin": "true",
      "telegram-channel": title,
    },
  };
}
