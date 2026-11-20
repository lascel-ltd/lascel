<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# This repository

- The site is a static export (`output: "export"` in `next.config.ts`) published by GitHub Pages. Do not add anything that needs a server: API routes, Server Actions, proxy, rewrites, redirects, headers, cookies or the default image loader. Route handlers need `export const dynamic = "force-static"`.
- Settings the owner changes (contact address, registered company details) live in `site.config.ts`. Never invent a registered name, company number, address, email or phone number.
- Statements about VAYRENO must use VAYRENO's approved wording and pass its claims register. No other company or product is named.
- The privacy page states that the site sets no cookies, runs no analytics, loads nothing from third parties and has no forms. Keep that true, or change the page in the same commit.
- Before handing work back: `npm run lint`, `npm run typecheck` and `npm run build`, then `npm run preview` to check `out/`.
