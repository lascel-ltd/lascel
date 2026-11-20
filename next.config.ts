import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site into `out/`. Vercel serves the files, so there is no server code.
  output: "export",
  // Write each page as `<path>/index.html`, which every static host serves without rewrites.
  trailingSlash: true,
  // A static export has no image optimisation server, so images are served as they are.
  images: { unoptimized: true },
};

export default nextConfig;
