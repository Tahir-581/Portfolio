"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="sa-newsletter">
      <p className="sa-label">Be the first</p>
      <h2>New arrivals. First access to the season.</h2>
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
          <button type="submit">Subscribe</button>
        </form>
      )}
    </section>
  );
}
