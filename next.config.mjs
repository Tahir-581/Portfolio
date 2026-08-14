/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel Image Optimization returns 402 on this plan, which leaves
  // next/image placeholders blank. Serve files from /public as-is.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
