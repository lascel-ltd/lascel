"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  giveAnswer,
  onlyWithConsent,
  startConsent,
  subscribe,
  type Answer,
} from "../lib/consent";

// Vercel Web Analytics. The package is fetched only after the visitor says yes, so until
// then, and after a no, the browser requests and runs nothing from it.
const Analytics = dynamic(() => import("@vercel/analytics/next").then((mod) => mod.Analytics), {
  ssr: false,
});

/** Focus that came from the keyboard, which browsers mark with :focus-visible. */
function focusFromKeyboard(element: Element) {
  try {
    return element.matches(":focus-visible");
  } catch {
    // A browser too old to know :focus-visible: treat the focus as keyboard focus.
    return true;
  }
}

/**
 * The consent notice, at the bottom of every page until the visitor answers, and the
 * analytics, which loads only after a yes. Cookie settings in the footer brings the notice back.
 */
export default function ConsentNotice() {
  const { answer, gpc, notice, opened } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const noticeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    startConsent();
  }, []);

  // Reopened from Cookie settings: scroll to the end of the page, where the notice sits below
  // the footer and covers nothing. Focus stays on Cookie settings; the notice comes next.
  useEffect(() => {
    if (opened === 0) return;
    const page = document.scrollingElement ?? document.documentElement;
    window.scrollTo({ top: page.scrollHeight });
  }, [opened]);

  // While the notice is open it stays in view at the bottom of the window, and a link or button
  // that gets keyboard focus is scrolled clear of it. A notice taller than half the window (a
  // short window, or text enlarged) would cover most of the page, so it waits below the footer.
  useEffect(() => {
    const element = noticeRef.current;
    const slot = element?.parentElement;
    if (!element || !slot) return;
    const root = document.documentElement;
    const fit = () => {
      const tall = element.offsetHeight > window.innerHeight / 2;
      slot.toggleAttribute("data-static", tall);
      root.style.scrollPaddingBottom = tall ? "" : `${element.offsetHeight}px`;
    };
    // Browsers do not always use the scroll padding when Tab moves focus to something that is
    // already on the screen, so check after each move and scroll it clear of the notice.
    let open = true;
    const keepFocusClear = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || element.contains(target)) return;
      requestAnimationFrame(() => {
        // Not once the notice has closed, as it does when an answer moves focus to Cookie settings.
        if (!open || !element.isConnected || slot.hasAttribute("data-static")) return;
        // Only focus from the keyboard. A mouse press focuses a link in some browsers, and
        // moving the page before the button comes up would send the click somewhere else.
        if (!focusFromKeyboard(target)) return;
        const overlap = target.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
        if (overlap > 0) window.scrollBy({ top: overlap + 16, behavior: "instant" });
      });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    window.addEventListener("resize", fit);
    document.addEventListener("focusin", keepFocusClear);
    return () => {
      open = false;
      observer.disconnect();
      window.removeEventListener("resize", fit);
      document.removeEventListener("focusin", keepFocusClear);
      slot.removeAttribute("data-static");
      root.style.removeProperty("scroll-padding-bottom");
    };
  }, [notice]);

  function answerWith(choice: Answer, button: HTMLButtonElement) {
    const byKeyboard = focusFromKeyboard(button);
    giveAnswer(choice);
    // The notice closes. Focus moves to Cookie settings, the control that brings it back.
    const settings = document.getElementById("cookie-settings");
    if (!settings) return;
    settings.focus({ preventScroll: true });
    // After an answer from the keyboard, bring Cookie settings into view once the notice has
    // gone, so the focus can be seen. A click or tap leaves the page where it is.
    if (byKeyboard) {
      requestAnimationFrame(() => {
        const box = settings.getBoundingClientRect();
        if (box.top < 8 || box.bottom > window.innerHeight - 8) {
          settings.scrollIntoView({ block: "center" });
        }
      });
    }
  }

  let current: string | null = null;
  if (notice === "settings") {
    if (answer === "granted") current = "At the moment, analytics is on.";
    else if (answer === "denied") current = "At the moment, analytics is off.";
    else if (gpc) current = "Your browser sends a Global Privacy Control signal, so analytics is off.";
  }

  return (
    <>
      {/* Always on the page and empty until needed, so screen readers announce the notice. */}
      <div className="consent-slot" aria-live="polite">
        {notice === "closed" ? null : (
          <section ref={noticeRef} className="consent" aria-labelledby="consent-title">
            <div className="wrap">
              <div className="consent-text">
                <h2 id="consent-title">May we count your visits?</h2>
                <p>
                  We would use Vercel Web Analytics to see which pages people read and how they
                  find this site. We keep your answer in a cookie for up to 180 days. You can
                  change it at any time with Cookie settings, at the foot of every page. Read
                  about{" "}
                  {/* A plain link, as in the footer: the privacy notice opens at its cookies part. */}
                  <a className="link" href="/privacy/#cookies">
                    cookies and analytics
                  </a>{" "}
                  in our privacy notice.
                </p>
                {current ? <p className="consent-current">{current}</p> : null}
              </div>
              <div className="consent-actions">
                <button
                  type="button"
                  className="consent-button"
                  onClick={(event) => answerWith("granted", event.currentTarget)}
                >
                  Accept analytics
                </button>
                <button
                  type="button"
                  className="consent-button"
                  onClick={(event) => answerWith("denied", event.currentTarget)}
                >
                  No thanks
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* Production mode always: never the debug script that development mode loads from Vercel's CDN. */}
      {answer === "granted" ? <Analytics mode="production" beforeSend={onlyWithConsent} /> : null}
    </>
  );
}
