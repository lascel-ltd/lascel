/**
 * The values on the site that may need changing, in one place.
 * Edit this file, commit and push to main, then publish (README, "How it is published").
 */
export const site = {
  name: "Lascel",
  /** The address the site is published at. Used for canonical links, the sitemap and share images. */
  url: "https://www.lascel.com",
  location: "Birmingham, United Kingdom",

  /**
   * The public contact address. Use a mailbox that someone reads.
   * Set it to null to remove the address everywhere: the contact section then
   * points visitors to the VAYRENO website instead.
   * The privacy notice gives this address as the way to ask about personal
   * information, and it must always offer a way to contact us. With null it
   * points to the VAYRENO website too, so keep an address here if you can.
   */
  contactEmail: "contact@lascel.com" as string | null,

  /**
   * The registered company details, written as one line: the registered name,
   * where it is registered, the company number and the registered office.
   * Leave this as null until the company is registered. The footer shows the
   * line on every page only once it is filled in.
   */
  registeredDetails: null as string | null,

  /** The date the privacy notice last changed, as YYYY-MM-DD. Also used in the sitemap. */
  lastUpdated: "2026-11-20",

  vayreno: {
    name: "VAYRENO",
    url: "https://vayreno.co.uk",
    displayUrl: "vayreno.co.uk",
  },
};

export const siteDescription =
  "Lascel is a small software company in Birmingham. It is the company behind VAYRENO, which handles patient enquiries and bookings for UK private clinics.";
