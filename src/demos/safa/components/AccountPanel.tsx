"use client";

import { useSafa } from "../store";

export function AccountPanel() {
  const { overlay, close } = useSafa();
  if (overlay !== "account") return null;

  return (
    <>
      <button
        type="button"
        className="sa-overlay"
        aria-label="Close account"
        onClick={close}
      />
      <aside className="sa-panel sa-drawer" role="dialog" aria-label="Account">
        <div className="sa-drawer-head">
          <p className="sa-label">Sign in</p>
          <button type="button" className="sa-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="sa-drawer-body">
          <h2 className="sa-serif text-3xl">Welcome back</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sa-muted)]">
            Accounts and checkout are disabled in this live demo. The bag,
            wishlist, and catalog are fully interactive.
          </p>
          <button type="button" className="sa-cta mt-6" disabled>
            Continue — demo only
          </button>
        </div>
      </aside>
    </>
  );
}
