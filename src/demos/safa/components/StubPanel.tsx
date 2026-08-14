"use client";

import { useSafa, type Overlay } from "../store";

export function StubPanel({
  kind,
  title,
  body,
}: {
  kind: Extract<Overlay, "tracking" | "gifting">;
  title: string;
  body: string;
}) {
  const { overlay, close } = useSafa();
  if (overlay !== kind) return null;

  return (
    <>
      <button
        type="button"
        className="sa-overlay"
        aria-label={`Close ${title}`}
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label={title}>
        <div className="sa-drawer-head">
          <p className="sa-label">{title}</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          <h2 className="sa-serif text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sa-muted)]">
            {body}
          </p>
          <button type="button" className="sa-cta mt-6" onClick={close}>
            Continue — demo only
          </button>
        </div>
      </aside>
    </>
  );
}
