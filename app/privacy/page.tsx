import type { Metadata } from "next";
import { site } from "@/site.config";
import Breakable from "../components/breakable";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What the Lascel website does with information about you: no cookies, no analytics, no tracking and no forms.",
  path: "/privacy/",
});

/*
  Keep this page true. It must change if the site ever adds a cookie, a form,
  analytics, a third-party script, font or image, or a different host.
  It must always give a way to contact us: the address in site.config.ts, or
  the VAYRENO website when the address is null.
*/

const updated = new Date(`${site.lastUpdated}T00:00:00Z`).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function EmailLink({ email }: { email: string }) {
  return (
    <a className="link" href={`mailto:${email}`}>
      <Breakable text={email} />
    </a>
  );
}

function VayrenoLink() {
  return (
    <a className="link" href={site.vayreno.url}>
      <Breakable text={site.vayreno.displayUrl} />
    </a>
  );
}

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
        <h2>Who we are</h2>
        <p>
          This website is run by {site.name}, a small software engineering company in {site.location}.{" "}
          {site.contactEmail ? (
            <>
              You can contact us at <EmailLink email={site.contactEmail} />.
            </>
          ) : (
            <>
              You can contact us through <VayrenoLink />.
            </>
          )}
        </p>
        {site.registeredDetails ? <p>{site.registeredDetails}</p> : null}

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
          The site is hosted by Vercel. To deliver the site and keep it secure, Vercel processes the
          IP address of everyone who visits, the approximate location that address suggests, and
          technical details of the browser and device. Vercel keeps technical records of visits. We
          can see those records in our hosting account, and we use them only to keep the site
          working and secure. Vercel is a company in the United States, so this information may be
          processed outside the United Kingdom. Vercel&apos;s data processing terms include the
          contractual safeguards that UK data protection law provides for such transfers.
        </p>

        <h2>If you email us</h2>
        <p>
          If you email us, we use your email address and your message to reply to you and to deal
          with what you asked about. We do this because it is in our legitimate interests to answer
          people who write to us. Our email provider stores the messages for us. We delete them when
          we no longer need them for that purpose.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask for a copy of the information we hold about you. You can also ask us to
          correct it, delete it or limit how we use it, and you can object to our using it. To do
          any of these,{" "}
          {site.contactEmail ? (
            <>
              write to <EmailLink email={site.contactEmail} />.
            </>
          ) : (
            <>
              get in touch through <VayrenoLink />.
            </>
          )}
        </p>
        <p>
          If you are unhappy with how we have handled your information, you can complain to the
          Information Commissioner&rsquo;s Office at{" "}
          <a className="link" href="https://ico.org.uk/make-a-complaint/">
            ico.org.uk
          </a>
          .
        </p>

        <h2>Other websites</h2>
        <p>
          This site links to <VayrenoLink /> and to the Information Commissioner&rsquo;s Office.
          Those websites are separate and have their own privacy notices.
        </p>
      </div>
    </div>
  );
}
