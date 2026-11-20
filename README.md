# Lascel

The website of Lascel, the software company behind [VAYRENO](https://vayreno.co.uk). It is published at https://www.lascel.com.

The site is two pages and a 404 page:

- `/`: what Lascel is, a short section on VAYRENO with a link to its website, how we work, and contact.
- `/privacy/`: what the site does with visitors' information.

It is a fully static build. There is no server, no form, no cookie, no analytics and no third-party script, font or image. The font (Newsreader) is downloaded at build time and served from the site itself.

## Tech stack

- Next.js 16 (App Router) with `output: "export"`, React 19 and TypeScript
- Tailwind CSS 4 for the CSS reset and build; the design lives in `app/globals.css`
- `next/font/google` for the self-hosted font
- ESLint 9 with `eslint-config-next`
- GitHub Actions and GitHub Pages for publishing

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
| `npm run preview` | Serve `out/` on http://127.0.0.1:4173 the way GitHub Pages does (`PORT=5000 npm run preview` for another port) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types and run the TypeScript compiler |

There is no `npm start`: a static export has no Node.js server.

The site needs no environment variables. `.env.example` only says so.

## Change the contact address or add the registered details

Both live in `site.config.ts`:

- `contactEmail` is the public contact address, shown in the contact section and the privacy notice. Use a mailbox that someone reads. Set it to `null` to remove it; the contact section then sends visitors to the VAYRENO website instead.
- `registeredDetails` is `null` until the company is registered. When it is, set it to one line with the registered name, where it is registered, the company number and the registered office. The footer shows that line on every page as soon as it is set, and not before.
- `lastUpdated` is the date shown on the privacy notice and used in the sitemap. Change it whenever the privacy notice changes.

Commit and push to `main`, and the site is rebuilt and published.

## How it is published

`.github/workflows/deploy.yml` runs on GitHub Actions:

1. On every pull request to `main`, it installs the dependencies, then runs `npm run lint`, `npm run typecheck` and `npm run build`.
2. On every push to `main` (and when run by hand from the Actions tab on `main`), it does the same, uploads `out/` with `actions/upload-pages-artifact`, and publishes it with `actions/configure-pages` and `actions/deploy-pages`.

It uses no secrets and no server. For it to publish, three settings are needed once:

1. In the repository's Settings > Pages, set Source to **GitHub Actions**.
2. In the same place, set the custom domain to `www.lascel.com` and, once the certificate is issued, tick Enforce HTTPS. (`public/CNAME` holds the same domain, so a copy of the site published from a branch would also keep it.)
3. At the DNS provider, point `www` at GitHub Pages with a `CNAME` record to the organisation's `github.io` host, and point the bare domain at GitHub Pages' `A` and `AAAA` addresses, as GitHub's custom domain guide lists them. GitHub then redirects `lascel.com` to `www.lascel.com`.

If a proxy or CDN is put in front of GitHub Pages, check that it sets no cookie and update the hosting paragraph of the privacy notice (`app/privacy/page.tsx`).

`public/.nojekyll` stops GitHub's Jekyll step from hiding the `_next` folder if the site is ever published from a branch instead of from Actions.

## How it works

- `site.config.ts` holds the values that may change: the address, contact email, registered details and the VAYRENO link.
- `app/layout.tsx` is the root layout: the font, the site-wide metadata, the skip link, the header and the footer.
- `app/page.tsx` is the home page and its Organization structured data. `app/privacy/page.tsx` is the privacy notice. `app/not-found.tsx` is the 404 page, which the build writes to `out/404.html` for GitHub Pages.
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
├── .github/workflows/   Build checks and the GitHub Pages publish
├── app/                 Pages, layout, metadata files, icons and styles
│   ├── components/      Header and footer
│   ├── lib/             Page metadata helper
│   └── privacy/         Privacy notice
├── public/              Logo, share picture, CNAME and .nojekyll, copied into the build as they are
├── scripts/preview.mjs  Local static server for out/
├── site.config.ts       Contact address, registered details and other settings
└── AGENTS.md            Notes for AI coding assistants (CLAUDE.md points here)
```
