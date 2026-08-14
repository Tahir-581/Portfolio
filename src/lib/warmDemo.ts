export function warmDemoOrigin(demoUrl: string) {
  try {
    const origin = new URL(demoUrl, window.location.origin).origin;
    const existing = document.querySelector(
      `link[rel="preconnect"][href="${origin}"]`,
    );
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const dns = document.createElement("link");
    dns.rel = "dns-prefetch";
    dns.href = origin;
    document.head.appendChild(dns);
  } catch {
    // Ignore invalid demo URLs.
  }
}
