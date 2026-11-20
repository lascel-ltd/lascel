import type { Metadata } from "next";
import { site, siteDescription } from "@/site.config";

export const homeTitle = `${site.name} | The software company behind ${site.vayreno.name}`;

/** The picture shown when a link to the site is shared: public/og.png, 1200 by 630 pixels. */
export const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${site.name}, the software company behind ${site.vayreno.name}.`,
};

type Page = {
  /** The page's own title, shown as "Title | Lascel". Leave out for the home page. */
  title?: string;
  description?: string;
  /** The page's path, with a trailing slash, for example "/privacy/". */
  path: string;
};

/**
 * Title, description, canonical link and share cards for one page.
 * Next.js replaces (not merges) openGraph and twitter between layout and page,
 * so each page sets them in full here.
 */
export function pageMetadata({ title, description = siteDescription, path }: Page): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : homeTitle;

  return {
    title: title ?? { absolute: homeTitle },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
