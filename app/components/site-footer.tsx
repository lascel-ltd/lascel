import Link from "next/link";
import { site } from "@/site.config";

export default function SiteFooter() {
  // The site is built ahead of time, so this is the year of the last build.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="row">
          <p className="place">
            <span>
              &copy; {year} {site.name}
            </span>
            <span>{site.location}</span>
          </p>
          <nav aria-label="Footer">
            <ul>
              <li>
                <a href={site.vayreno.url} translate="no">
                  {site.vayreno.name}
                </a>
              </li>
              <li>
                <Link href="/privacy/">Privacy</Link>
              </li>
            </ul>
          </nav>
        </div>
        {site.registeredDetails ? <p className="registered">{site.registeredDetails}</p> : null}
      </div>
    </footer>
  );
}
