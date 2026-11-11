import { useEffect } from "react";

export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://www.bmgconsultoresperu.com";
export const SITE_NAME = "BMG Consultores";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface PageMeta {
  title: string;
  description: string;
  path: string;
  faqs?: { q: string; a: string }[];
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setFaqJsonLd(faqs?: { q: string; a: string }[]) {
  const id = "faq-jsonld";
  const existing = document.getElementById(id);
  if (!faqs || faqs.length === 0) {
    existing?.remove();
    return;
  }

  const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
  if (!existing) document.head.appendChild(script);
}

export function usePageMeta({ title, description, path, faqs }: PageMeta) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", DEFAULT_OG_IMAGE);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", DEFAULT_OG_IMAGE);
    setLinkTag("canonical", url);
    setFaqJsonLd(faqs);

    const ldJson = document.getElementById("structured-data-jsonld");
    if (ldJson) ldJson.textContent = ldJson.textContent?.replace(/https:\/\/[^"]*|__SITE_URL__/, url) ?? "";
  }, [title, description, path, faqs]);
}
