# Lascel

The website of Lascel, the software engineering company that builds and runs [VAYRENO](https://vayreno.co.uk). It is published at https://www.lascel.com.

The site is two pages and a 404 page:

- `/`: what Lascel is, a short section on VAYRENO with a link to its website, and contact.
- `/privacy/`: what the site does with visitors' information.

It is a fully static build. There is no server, no form, no cookie, no analytics and no third-party script, font or image. The font (Newsreader) is downloaded at build time and served from the site itself.

## Tech stack

- Next.js 16 (App Router) with `output: "export"`, React 19 and TypeScript
- Tailwind CSS 4 for the CSS reset and build; the design lives in `app/globals.css`
- `next/font/google` for the self-hosted font
- ESLint 9 with `eslint-config-next`
- Vercel for hosting, and GitHub Actions for the build check

## Run it locally

You need Node.js 24 or 26 (LTS) and npm.

```bash
npm ci
npm run dev
```

Then open the address `next dev` prints.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the static site into `out/` |
| `npm run preview` | Serve `out/` on http://127.0.0.1:4173 the way a static host does (`PORT=5000 npm run preview` for another port) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types and run the TypeScript compiler |

There is no `npm start`: a static export has no Node.js server.

The site needs no environment variables. `.env.example` only says so.

## Change the contact address or add the registered details

Both live in `site.config.ts`:

- `contactEmail` is the public contact address, shown in the contact section and the privacy notice. Use a mailbox that someone reads. Set it to `null` to remove it; the contact section then sends visitors to the VAYRENO website instead.
  The privacy notice must keep a way to contact us even if the home page drops the address: it gives this address as the way to ask about personal information, and with `null` it can only point to the VAYRENO website. Keep an address here if you can.
- `registeredDetails` is `null` until the company is registered. When it is, set it to one line with the registered name, where it is registered, the company number and the registered office. The footer shows that line on every page as soon as it is set, and not before.
- `lastUpdated` is the date shown on the privacy notice and used in the sitemap. Change it whenever the privacy notice changes.

Commit and push to `main`, then publish as described below.

## How it is published

The site is hosted on Vercel, in the project `lascel` of the team that also hosts VAYRENO's sites. Vercel builds it with `next build`. Because of `output: "export"` the result is plain files, with no server code.

- **Until the repository is connected to the Vercel project**, publish by hand from a machine signed in to that Vercel team: run `npx vercel deploy --prod` in this folder. The folder is linked to the project with `npx vercel link`, which writes the git-ignored `.vercel/` folder.
- **Once the repository is connected** (Vercel project > Settings > Git, after Vercel's GitHub app is installed for the `lascel-ltd` organisation), Vercel builds and publishes every push to `main` by itself and gives every pull request a preview address.

`.github/workflows/ci.yml` runs on GitHub Actions for every pull request to `main` and every push to `main`. It installs the dependencies, then runs `npm run lint`, `npm run typecheck` and `npm run build`. It publishes nothing and uses no secrets.

`vercel.json` adds three response headers to every page: no content-type sniffing, a strict referrer policy and no framing.

### The domain

The domain's DNS is on Cloudflare. `www.lascel.com` is a `CNAME` record to the address Vercel gave for the project, and the bare domain has Vercel's two `A` records. Vercel redirects `lascel.com` to `www.lascel.com` and issues the HTTPS certificates.

- Keep these records set to **DNS only** (grey cloud), not Proxied. A proxied record puts Cloudflare between visitors and the site.
- Leave the `MX` and `TXT` records (email and domain verification) as they are.
- Keep Cloudflare's Web Analytics, Zaraz and Bot Fight Mode off for this domain, and Vercel's Web Analytics and Speed Insights off for the project. Each can add a script or a cookie, which the privacy notice says the site does not have.

## How it works

- `site.config.ts` holds the values that may change: the address, contact email, registered details and the VAYRENO link.
- `app/layout.tsx` is the root layout: the font, the site-wide metadata, the skip link, the header and the footer.
- `app/page.tsx` is the home page and its Organization structured data. `app/privacy/page.tsx` is the privacy notice. `app/not-found.tsx` is the 404 page, which the build writes to `out/404.html`; Vercel serves it for any missing path.
- `app/lib/metadata.ts` builds each page's title, description, canonical link and share cards. The share picture is `public/og.png` (1200 by 630 pixels); replace that file to change it.
- `app/robots.ts` and `app/sitemap.ts` are written to `out/robots.txt` and `out/sitemap.xml` at build time.
- `app/favicon.ico`, `app/icon.png` and `app/apple-icon.png` are the icons, made from the existing Lascel "L" mark; Next.js adds the matching tags. `public/lascel-logo.png` is the wordmark, used as the logo in the structured data.
- `app/globals.css` holds the colours (light and dark, following the visitor's system setting), the type and the layout.
- `next.config.ts` turns on the static export, writes each page as `<path>/index.html` (`trailingSlash: true`) and serves images unoptimised, since there is no image server.
- `scripts/preview.mjs` serves `out/` locally for checking a build.

## Rules for the content

- Every statement about VAYRENO comes from VAYRENO's approved wording and must pass its claims register: no results, figures, client names, testimonials, prices, guarantees or urgency, and nothing clinical.
- Name no other company or product.
- Keep the privacy notice true. If the site ever adds a cookie, a form, analytics, a third-party resource or a different host, change the notice in the same commit.
- Plain UK English, short sentences, no hype words, no em dashes.

## Project structure

```text
.
├── .github/workflows/   The build check
├── app/                 Pages, layout, metadata files, icons and styles
│   ├── components/      Header, footer, and the helper that lets addresses wrap at their dots
│   ├── lib/             Page metadata helper
│   └── privacy/         Privacy notice
├── public/              Logo and share picture, copied into the build as they are
├── scripts/preview.mjs  Local static server for out/
├── site.config.ts       Contact address, registered details and other settings
└── AGENTS.md            Notes for AI coding assistants (CLAUDE.md points here)
```
