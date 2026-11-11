import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import appMetaJson from "../app-meta.json";
import { ChatWidget } from "../components/ChatWidget";

const appMeta = appMetaJson as {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  marketplace_cover_url?: string | null;
};

declare const __HF_DESIGN_INSPECTOR__: boolean;

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } } });

function buildHead() {
  const title = appMeta.og_title ?? "BG Travel Peru — Smart Experience";
  const description = appMeta.og_description ?? "Experiencias turisticas culturales, comerciales y personalizadas en Peru.";
  const ogImage = appMeta.og_image_url;
  const favicon = appMeta.favicon_url;

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage ?? undefined },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage ?? undefined },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.cdnfonts.com" },
      ...(favicon ? [
        { rel: "icon", href: favicon },
        { rel: "apple-touch-icon", href: favicon },
      ] : []),
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-navy px-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-display text-6xl font-black text-amber">404</h1>
        <p className="mt-4 text-lg text-text-secondary">Pagina no encontrada</p>
        <a href="/" className="mt-6 inline-flex rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy transition-colors hover:bg-amber-light">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-3xl font-bold">Algo salio mal</h1>
        <p className="mt-2 text-text-secondary">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-xl bg-amber px-6 py-3 font-semibold text-bg-navy"
          >
            Intentar de nuevo
          </button>
          <a href="/" className="rounded-xl border border-text-secondary/30 px-6 py-3 font-semibold text-text-primary">
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector())
      .catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ChatWidget />
    </QueryClientProvider>
  );
}