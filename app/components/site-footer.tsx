import { site } from "@/site.config";
import CookieSettings from "./cookie-settings";

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
                {/* A plain link, not <Link>: the new page opens at the top with keyboard focus there too. */}
                <a href="/privacy/">Privacy</a>
              </li>
              <CookieSettings />
            </ul>
          </nav>
        </div>
        {site.registeredDetails ? <p className="registered">{site.registeredDetails}</p> : null}
      </div>
    </footer>
  );
}
