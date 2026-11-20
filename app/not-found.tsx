import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Page not found</h1>
        <p className="lede">The address may have been mistyped, or the page may have moved.</p>
      </header>
      <div className="prose">
        <p>
          <Link className="link" href="/">
            Go to the home page
          </Link>
        </p>
      </div>
    </div>
  );
}
