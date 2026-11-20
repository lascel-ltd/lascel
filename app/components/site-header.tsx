import Link from "next/link";
import { site } from "@/site.config";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="wordmark" translate="no">
          {site.name}
        </Link>
        <nav className="site-nav" aria-label="Main">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a plain link moves keyboard focus to #contact; <Link> leaves it in the header */}
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
