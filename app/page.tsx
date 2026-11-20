import type { Metadata } from "next";
import { site, siteDescription } from "@/site.config";
import Breakable from "./components/breakable";
import { pageMetadata } from "./lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/" });

/*
  Every statement about VAYRENO on this page comes from VAYRENO's approved
  wording (its sales site and its claims register). Check the claims register
  before adding to it: no results, figures, clients, prices or promises.
  - The tagline is the sales site's page title.
  - "It handles patient enquiries and books consultations, never treatment."
    joins the sales site's opening sentence to its safeguard "It books
    consultations, never treatment."
  - The clinical questions sentence is claims register row C-04 (Approved).
  Answering calls, inviting past enquirers back and response times are
  Conditional in the register, and reporting (C-06) may only appear beside its
  metric definitions, so none of them is on this page.
*/

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/lascel-logo.png`,
  description: siteDescription,
  ...(site.contactEmail ? { email: site.contactEmail } : {}),
};

function Vayreno() {
  return (
    <span className="caps" translate="no">
      {site.vayreno.name}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />

      <div className="wrap">
        <section className="hero">
          <h1>
            The software company behind <Vayreno />.
          </h1>
          <p className="lede">
            {site.name} is a small, new company based in {site.location}. <Vayreno /> is the one
            product we make.
          </p>
        </section>

        <section id="vayreno" className="plate" aria-labelledby="vayreno-title">
          <div className="columns">
            <div>
              <h2 id="vayreno-title" translate="no">
                {site.vayreno.name}
              </h2>
              <p className="tagline">Patient enquiry and booking support for UK private clinics.</p>
            </div>
            <div className="body">
              <p>It handles patient enquiries and books consultations, never treatment.</p>
              <p>
                Clinical questions go to the clinic&rsquo;s own team, and <Vayreno />
                &rsquo;s assistant never gives medical advice.
              </p>
              <a className="button" href={site.vayreno.url}>
                Visit <Breakable text={site.vayreno.displayUrl} />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="columns">
            <h2 id="contact-title">Contact</h2>
            <div className="body">
              {site.contactEmail ? (
                <>
                  <p>
                    <a className="link email" href={`mailto:${site.contactEmail}`}>
                      <Breakable text={site.contactEmail} />
                    </a>
                  </p>
                  <p>
                    Clinics that want to know more about <Vayreno /> will find the details, and a
                    way to get in touch, at{" "}
                    <a className="link" href={site.vayreno.url}>
                      <Breakable text={site.vayreno.displayUrl} />
                    </a>
                    .
                  </p>
                </>
              ) : (
                <p>
                  To get in touch, please use{" "}
                  <a className="link" href={site.vayreno.url}>
                    <Breakable text={site.vayreno.displayUrl} />
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
