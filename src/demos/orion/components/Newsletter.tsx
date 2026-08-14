"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="or-newsletter">
      <p className="or-label">Private list</p>
      <h2>News from the manufacture</h2>
      {done ? (
        <p className="mt-4 text-sm tracking-wide">Thank you. This is a demo list only.</p>
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
