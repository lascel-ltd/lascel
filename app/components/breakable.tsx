import { Fragment } from "react";

/**
 * A web or email address that may wrap before each dot and after the @ on a narrow screen with
 * enlarged text, rather than mid-word. Copying the address still gives it unchanged.
 */
export default function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?=\.)|(?<=@)/);
  return (
    <>
      {parts.map((part, i) =>
        i === 0 ? (
          part
        ) : (
          <Fragment key={i}>
            <wbr />
            {part}
          </Fragment>
        ),
      )}
    </>
  );
}
