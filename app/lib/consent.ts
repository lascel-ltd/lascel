/*
  The visitor's answer about analytics, and what the consent notice shows.

  The answer is kept in one first-party cookie, the only cookie this site sets:
  lascel_consent=analytics=granted or lascel_consent=analytics=denied, for up to 180 days.
  The site has no server, so the cookie is set from script, and Safari may delete a cookie
  set from script after 7 days. With no answer stored, the notice asks. If the browser
  sends Global Privacy Control, that counts as no: the notice does not ask and nothing
  is stored.

  The privacy notice ("Cookies and analytics" in app/privacy/page.tsx) describes all of
  this. Change the two together.

  Browser only: these functions read document and navigator, so call them from effects
  and event handlers, never while rendering.
*/

export type Answer = "granted" | "denied";

const cookieName = "lascel_consent";

/**
 * 180 days, in seconds. When the cookie expires, or a browser deletes it sooner, the notice
 * asks again.
 */
const cookieMaxAge = 180 * 24 * 60 * 60;

/** The stored answer, or null when there is none. */
export function storedAnswer(): Answer | null {
  const match = document.cookie.match(/(?:^|;\s*)lascel_consent=analytics=(granted|denied)(?:;|$)/);
  return match ? (match[1] as Answer) : null;
}

function storeAnswer(answer: Answer) {
  document.cookie = `${cookieName}=analytics=${answer}; Max-Age=${cookieMaxAge}; Path=/; SameSite=Lax; Secure`;
}

function browserSendsGlobalPrivacyControl() {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/**
 * The analytics' beforeSend: it drops every page view unless the stored answer is yes.
 * The analytics script cannot be unloaded once it has run, so this is what stops it
 * straight away, in every open tab, when someone changes their answer to no.
 */
export function onlyWithConsent<Event>(event: Event): Event | null {
  return storedAnswer() === "granted" ? event : null;
}

export type ConsentState = {
  /** The answer stored, or given on this page. Null when there is none. */
  answer: Answer | null;
  /** The browser sends Global Privacy Control. With no answer, that counts as no. */
  gpc: boolean;
  /** "asking" when there is no answer, "settings" when reopened from Cookie settings. */
  notice: "closed" | "asking" | "settings";
  /** How many times Cookie settings has opened the notice on this page. */
  opened: number;
  /** What Cookie settings says after an answer on this page. */
  message: { id: number; text: string } | null;
};

// What the build renders, and what the page shows until the browser has read the cookie.
const initialState: ConsentState = {
  answer: null,
  gpc: false,
  notice: "closed",
  opened: 0,
  message: null,
};

let state = initialState;
let messages = 0;
let started = false;
const listeners = new Set<() => void>();

function update(changes: Partial<ConsentState>) {
  state = { ...state, ...changes };
  for (const listener of listeners) listener();
}

/* For useSyncExternalStore, so the notice and Cookie settings share one state. */

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot() {
  return state;
}

export function getServerSnapshot() {
  return initialState;
}

/** Reads the stored answer and the privacy signal once the page runs in the browser. */
export function startConsent() {
  if (started) return;
  started = true;
  const answer = storedAnswer();
  const gpc = browserSendsGlobalPrivacyControl();
  update({ answer, gpc, notice: answer === null && !gpc ? "asking" : "closed" });
}

/** Cookie settings: shows the notice again, so the answer can be changed. */
export function openSettings() {
  update({ notice: "settings", opened: state.opened + 1, message: null });
}

/** Stores the visitor's answer and closes the notice. */
export function giveAnswer(answer: Answer) {
  const wasOn = state.answer === "granted";
  storeAnswer(answer);
  let text = "Analytics is off.";
  if (answer === "granted") text = "Analytics is on.";
  else if (wasOn) text = "Analytics is off. Nothing more will be counted.";
  messages += 1;
  update({ answer, notice: "closed", message: { id: messages, text } });
}
