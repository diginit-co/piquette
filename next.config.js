import BuilderDevTools from "@builder.io/dev-tools/next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = BuilderDevTools()({
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["img.clerk.com"],
  },
});

export default config;
