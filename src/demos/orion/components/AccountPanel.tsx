"use client";

import { useOrion } from "../store";

export function AccountPanel() {
  const { overlay, close } = useOrion();
  if (overlay !== "account") return null;

  return (
    <>
      <button
        type="button"
        className="or-overlay"
        aria-label="Close account"
        onClick={close}
      />
      <aside className="or-panel or-drawer" role="dialog" aria-label="Account">
        <div className="or-drawer-head">
          <p className="or-label">Account</p>
          <button type="button" className="or-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="or-drawer-body">
          <h2 className="or-serif text-3xl italic">Sign in</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--or-muted)]">
            Accounts and checkout are disabled in this live demo. The bag,
            catalog, and private-viewing stubs are fully interactive.
          </p>
          <button type="button" className="or-cta mt-6" disabled>
            Continue — demo only
          </button>
        </div>
      </aside>
    </>
  );
}
