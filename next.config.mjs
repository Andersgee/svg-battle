// @ts-check
import { env } from "./src/env/server.mjs";
import { withPlausibleProxy } from "next-plausible";
import { withSuperjson } from "next-superjson";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withPlausibleProxy()(withSuperjson()(config));
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true, // next/link no longer requires adding <a> as a child. Will be default in Next.js 13.
  },
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
