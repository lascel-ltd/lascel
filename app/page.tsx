import type { Metadata } from "next";
import { site, siteDescription } from "@/site.config";
import { pageMetadata } from "./lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/" });

/*
  Every statement about VAYRENO on this page comes from VAYRENO's approved
  wording (its sales site and its claims register). Check the claims register
  before adding to it: no results, figures, clients, prices or promises.
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
              <p>
                A decision about treatment belongs to the patient and their clinician. <Vayreno />{" "}
                handles the administration around it and nothing more.
              </p>
              <p>
                Clinical questions go to the clinic&rsquo;s own team, and <Vayreno />
                &rsquo;s assistant never gives medical advice.
              </p>
              <a className="button" href={site.vayreno.url}>
                Visit {site.vayreno.displayUrl}
              </a>
            </div>
          </div>
        </section>

        <section id="approach" className="section" aria-labelledby="approach-title">
          <div className="columns">
            <h2 id="approach-title">How we work</h2>
            <div className="body">
              <p>
                We build <Vayreno /> and run it ourselves. The people who write the software are
                the people who answer for it.
              </p>
              <p>
                Private healthcare is a regulated setting, so we work carefully and in small steps.
                We say plainly what the service does, and what it does not do.
              </p>
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
                      {site.contactEmail}
                    </a>
                  </p>
                  <p>
                    Clinics that want to know more about <Vayreno /> will find the details, and a
                    way to get in touch, at{" "}
                    <a className="link" href={site.vayreno.url}>
                      {site.vayreno.displayUrl}
                    </a>
                    .
                  </p>
                </>
              ) : (
                <p>
                  To get in touch, please use{" "}
                  <a className="link" href={site.vayreno.url}>
                    {site.vayreno.displayUrl}
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
