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
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
