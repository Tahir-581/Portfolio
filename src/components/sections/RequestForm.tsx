"use client";

import { FormEvent, useRef, useState } from "react";

import type { Project } from "@/data/projects";

type RequestFormProps = {
  project?: Project;
  projectId: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function RequestForm({ project, projectId }: RequestFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formEl = formRef.current;
    if (!formEl) return;

    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      projectId,
    };

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data: { error?: string } = {};
      try {
        data = (await res.json()) as { error?: string };
      } catch {
        setStatus("error");
        setError("Unexpected server response. Please try again.");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 rounded-sm border border-border bg-fg/[0.03] p-6 md:p-8">
        <p className="text-lg font-medium tracking-tight text-fg">
          Request received
        </p>
        <p className="mt-3 text-fg/75">
          Thanks — we will reach out shortly about a similar custom build
          {project ? ` inspired by ${project.title}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-10 max-w-xl space-y-6">
      {project ? (
        <p className="text-sm text-muted">
          Requesting a similar custom build based on{" "}
          <span className="text-fg">{project.title}</span>.
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Name
        </span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-sm border border-border bg-transparent px-4 py-3 text-fg outline-none transition-colors focus:border-fg/40"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-sm border border-border bg-transparent px-4 py-3 text-fg outline-none transition-colors focus:border-fg/40"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          Phone number
        </span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full rounded-sm border border-border bg-transparent px-4 py-3 text-fg outline-none transition-colors focus:border-fg/40"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          WhatsApp number
        </span>
        <input
          name="whatsapp"
          type="tel"
          required
          className="w-full rounded-sm border border-border bg-transparent px-4 py-3 text-fg outline-none transition-colors focus:border-fg/40"
        />
      </label>

      {status === "error" ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-sm bg-fg px-5 py-3 text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
