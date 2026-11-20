import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { site, siteDescription } from "@/site.config";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import { homeTitle, shareImage } from "./lib/metadata";
import "./globals.css";

// Downloaded at build time and served from this site: visitors' browsers never contact Google.
const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: "normal",
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d121b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: globals.css scrolls smoothly within a page. This tells Next.js to
    // jump, not glide, to the top when it opens another page, so a page never opens part-way down.
    <html lang="en-GB" className={newsreader.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
