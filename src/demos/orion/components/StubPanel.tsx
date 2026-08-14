"use client";

import { useOrion, type Overlay } from "../store";

export function StubPanel({
  kind,
  title,
  body,
}: {
  kind: Extract<Overlay, "salon" | "care">;
  title: string;
  body: string;
}) {
  const { overlay, close } = useOrion();
  if (overlay !== kind) return null;

  return (
    <>
      <button
        type="button"
        className="or-overlay"
        aria-label={`Close ${title}`}
        onClick={close}
      />
      <aside className="or-panel or-drawer" role="dialog" aria-label={title}>
        <div className="or-drawer-head">
          <p className="or-label">{title}</p>
          <button type="button" className="or-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="or-drawer-body">
          <h2 className="or-serif text-3xl italic">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--or-muted)]">
            {body}
          </p>
          <button type="button" className="or-cta mt-6" onClick={close}>
            Continue — demo only
          </button>
        </div>
      </aside>
    </>
  );
}
