// Serves the static build in out/ the way a static host does, for checking it locally.
// Usage: npm run build && npm run preview   (PORT=5000 npm run preview for another port)
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

async function fileAt(path) {
  try {
    const info = await stat(path);
    return info;
  } catch {
    return null;
  }
}

function send(req, res, status, path, info) {
  res.writeHead(status, {
    "Content-Type": types[extname(path)] ?? "application/octet-stream",
    "Content-Length": info.size,
  });
  if (req.method === "HEAD") return res.end();
  createReadStream(path).pipe(res);
}

const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  const url = new URL(req.url ?? "/", "http://localhost");
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  const target = resolve(join(root, pathname));
  if (target !== root && !target.startsWith(root + sep)) {
    res.writeHead(403).end();
    return;
  }

  const info = await fileAt(target);
  if (info?.isDirectory()) {
    if (!pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    const index = join(target, "index.html");
    const indexInfo = await fileAt(index);
    if (indexInfo?.isFile()) return send(req, res, 200, index, indexInfo);
  } else if (info?.isFile()) {
    return send(req, res, 200, target, info);
  } else {
    const html = `${target}.html`;
    const htmlInfo = await fileAt(html);
    if (htmlInfo?.isFile()) return send(req, res, 200, html, htmlInfo);
  }

  const notFound = join(root, "404.html");
  const notFoundInfo = await fileAt(notFound);
  if (notFoundInfo?.isFile()) return send(req, res, 404, notFound, notFoundInfo);
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}/`);
});
