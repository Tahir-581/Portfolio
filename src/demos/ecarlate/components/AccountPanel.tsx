"use client";

import { useEcarlate } from "../store";

export function AccountPanel() {
  const { overlay, close } = useEcarlate();
  if (overlay !== "account") return null;

  return (
    <>
      <button
        type="button"
        className="ec-overlay"
        aria-label="Close account"
        onClick={close}
      />
      <aside className="ec-panel ec-drawer" role="dialog" aria-label="Account">
        <div className="ec-drawer-head">
          <p className="ec-label">Account</p>
          <button type="button" className="ec-icon-btn" onClick={close}>
            Close
          </button>
        </div>
        <div className="ec-drawer-body">
          <h2 className="ec-serif text-3xl italic">Sign in</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ec-muted)]">
            Accounts and checkout are disabled in this live demo. The bag,
            quick shop, and catalog are fully interactive.
          </p>
          <button type="button" className="ec-cta mt-6" disabled>
            Continue — demo only
          </button>
        </div>
      </aside>
    </>
  );
}
