import { Providers } from "@/components/Providers";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-root min-h-screen bg-bg font-sans text-fg">
      <Providers>{children}</Providers>
    </div>
  );
}
