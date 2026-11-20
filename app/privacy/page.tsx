import type { Metadata } from "next";
import { site } from "@/site.config";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What the Lascel website does with information about you: no cookies, no analytics, no tracking and no forms.",
  path: "/privacy/",
});

/*
  Keep this page true. It must change if the site ever adds a cookie, a form,
  analytics, a third-party script, font or image, or a different host.
*/

const updated = new Date(`${site.lastUpdated}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function Privacy() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Privacy</h1>
        <p className="lede">
          What this website does with information about you. In short, very little.
        </p>
        <p className="updated">
          Last updated <time dateTime={site.lastUpdated}>{updated}</time>
        </p>
      </header>

      <div className="prose">
        <h2>What the site does not do</h2>
        <ul>
          <li>It sets no cookies.</li>
          <li>It runs no analytics and does not track you.</li>
          <li>
            It loads no third-party scripts, fonts or images. Everything on it is served from this
            site.
          </li>
          <li>It has no forms, so it collects nothing you type.</li>
        </ul>

        <h2>Hosting</h2>
        <p>
          The site is hosted on GitHub Pages, a service of GitHub. GitHub logs the IP address of
          everyone who visits a GitHub Pages site and keeps it for security purposes. We do not
          receive those logs.
        </p>

        <h2>If you email us</h2>
        {site.contactEmail ? (
          <p>
            If you write to{" "}
            <a className="link" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            , we use your email address and your message only to reply to you.
          </p>
        ) : (
          <p>
            If you write to us, we use your email address and your message only to reply to you.
          </p>
        )}

        <h2>Other websites</h2>
        <p>
          This site links to{" "}
          <a className="link" href={site.vayreno.url}>
            {site.vayreno.displayUrl}
          </a>
          . That website is separate and has its own privacy notice.
        </p>
      </div>
    </div>
  );
}
