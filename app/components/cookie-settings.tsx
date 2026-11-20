"use client";

import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, openSettings, subscribe } from "../lib/consent";

/** Cookie settings, in the footer of every page: brings back the consent notice. */
export default function CookieSettings() {
  const { message } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <li className="cookie-settings">
      <button type="button" id="cookie-settings" onClick={() => openSettings()}>
        Cookie settings
      </button>
      {/* Says what an answer changed. Always on the page, so screen readers announce it. */}
      <span role="status" className="consent-status">
        {message ? <span key={message.id}>{message.text}</span> : null}
      </span>
    </li>
  );
}
