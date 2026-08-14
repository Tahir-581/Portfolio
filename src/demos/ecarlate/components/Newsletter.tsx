"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="ec-newsletter">
      <p className="ec-label">Private list</p>
      <h2>News and exclusives</h2>
      {done ? (
        <p className="mt-4 text-sm tracking-wide">Thank you for signing up.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Email address"
            aria-label="Email address"
          />
          <button type="submit">Sign up</button>
        </form>
      )}
    </section>
  );
}
