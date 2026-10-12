import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";

import appMetaJson from "../app-meta.json";
import { CONTACT_EMAIL, CONTACT_PHONE_HREF, INSTAGRAM_URL } from "@/components/site/ctas";
import { scrollScrubTheme } from "@/scroll-scrub-scenes";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
import appCss from "../styles.css?url";

declare const __HF_DESIGN_INSPECTOR__: boolean;

/*
 * Site identity. The one absolute URL the site knows about itself; every
 * other asset reference is a same-origin path. Contact facts come from
 * components/site/ctas so they are defined once. The browser-chrome theme
 * colour is the film theme's ink background (scroll-scrub-scenes.ts), the
 * same value as --color-ink in styles.css and the manifest, so no colour
 * is written in this file.
 */
const SITE_URL = "https://kuka-simwinga.vercel.app/";
const SITE_NAME = "Kuka Simwinga";
const AUTHOR = "Mukuka Simwinga";

/*
 * Resolves an asset reference from app-meta.json to a URL the browser can
 * load. Absolute and data URLs pass through; anything else is treated as a
 * path under this site's own origin.
 */
function toOwnAssetUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  if (/^(https?:)?\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
    return trimmed;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function toAbsoluteSiteUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//i.test(path) || /^data:/i.test(path)) return path;
  return new URL(path, SITE_URL).toString();
}

const pageTitle = appMetaJson.og_title || SITE_NAME;
const pageDescription = appMetaJson.og_description;
const ogImagePath = toOwnAssetUrl(appMetaJson.og_image_url);
const ogImageUrl = toAbsoluteSiteUrl(ogImagePath);
const faviconUrl = toOwnAssetUrl(appMetaJson.favicon_url) ?? "/assets/brand/favicon-32.png";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR,
  alternateName: ["Kuka", "KVKA"],
  jobTitle: "Creative Producer",
  description: pageDescription,
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  telephone: CONTACT_PHONE_HREF.replace(/^tel:/, ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressCountry: "AU",
  },
  sameAs: [INSTAGRAM_URL],
};

const personJsonLdText = JSON.stringify(personJsonLd).replace(/</g, "\\u003c");

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { name: "author", content: AUTHOR },
      { name: "theme-color", content: scrollScrubTheme.background },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_AU" },
      ...(ogImageUrl
        ? [
            { property: "og:image", content: ogImageUrl },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            {
              property: "og:image:alt",
              content: `${AUTHOR}, creative producer, director, artist developer, content creator, A&R and music artist (KVKA)`,
            },
          ]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      ...(ogImageUrl ? [{ name: "twitter:image", content: ogImageUrl }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", href: "/assets/brand/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: faviconUrl },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/brand/favicon-16.png" },
      { rel: "icon", type: "image/svg+xml", href: "/assets/brand/favicon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/brand/apple-touch-icon.png" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/assets/fonts/Anton-400.woff2", crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: "/assets/fonts/InterTight-400.woff2", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-ink font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLdText }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    let cancelled = false;
    import("../module/design-inspector/runtime")
      .then((mod) => {
        if (cancelled) return;
        mod.installHiggsfieldDesignInspector();
      })
      .catch((error: unknown) => {
        reportHiggsfieldError(error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

function NotFound() {
  return (
    <main className="bg-paper text-ink min-h-dvh flex flex-col justify-end px-5 py-10 md:px-12 md:py-16">
      <p className="font-sans text-xs uppercase tracking-wide">404</p>
      <h1 className="font-display uppercase leading-[0.9] tracking-tight text-5xl md:text-7xl mt-3">
        Nothing on this set.
      </h1>
      <p className="font-sans leading-relaxed max-w-[62ch] mt-6">The page you were after is not here.</p>
      <p className="mt-8">
        <a
          href="/"
          className="font-sans text-xs uppercase tracking-wide underline underline-offset-4 decoration-accent"
        >
          Back to the start
        </a>
      </p>
    </main>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  useEffect(() => {
    reportHiggsfieldError(error);
  }, [error]);

  return (
    <main className="bg-paper text-ink min-h-dvh flex flex-col justify-end px-5 py-10 md:px-12 md:py-16">
      <p className="font-sans text-xs uppercase tracking-wide">Error</p>
      <h1 className="font-display uppercase leading-[0.9] tracking-tight text-5xl md:text-7xl mt-3">
        Cut. Something broke.
      </h1>
      <p className="font-sans leading-relaxed max-w-[62ch] mt-6">
        The page hit an error while loading. Try again, or go back to the start.
      </p>
      <p className="mt-8 flex flex-wrap gap-6">
        <button
          type="button"
          onClick={reset}
          className="font-sans text-xs uppercase tracking-wide underline underline-offset-4 decoration-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="font-sans text-xs uppercase tracking-wide underline underline-offset-4 decoration-accent"
        >
          Back to the start
        </a>
      </p>
    </main>
  );
}
