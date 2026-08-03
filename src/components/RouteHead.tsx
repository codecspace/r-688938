import { useEffect } from "react";

const SITE_ORIGIN = "https://lionvestrealty.com";

interface RouteHeadProps {
  title: string;
  description: string;
  path: string; // route path, e.g. "/privacy-policy"
  /** When true, emits <meta name="robots" content="noindex, nofollow"> */
  noindex?: boolean;
  /** Structured data injected as <script type="application/ld+json"> for this route. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Updates <title>, meta description, canonical link, robots and JSON-LD for the
 * current route. Note: crawlers of a static Vite SPA primarily read index.html;
 * this improves the in-browser experience and JS-executing crawlers.
 */
const RouteHead = ({ title, description, path, noindex = false, jsonLd }: RouteHeadProps) => {

  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
      let el = document.head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    const descEl = setMeta(
      'meta[name="description"]',
      "content",
      description,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      }
    );

    const ogTitle = setMeta(
      'meta[property="og:title"]',
      "content",
      title,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      }
    );

    const ogDesc = setMeta(
      'meta[property="og:description"]',
      "content",
      description,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }
    );

    const absoluteUrl = `${SITE_ORIGIN}${path}`;

    const canonical = setMeta(
      'link[rel="canonical"]',
      "href",
      absoluteUrl,
      () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      }
    );

    const ogUrl = setMeta(
      'meta[property="og:url"]',
      "content",
      absoluteUrl,
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:url");
        return m;
      }
    );

    const robots = setMeta(
      'meta[name="robots"]',
      "content",
      noindex ? "noindex, nofollow" : "index, follow",
      () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "robots");
        return m;
      }
    );

    let ldScript: HTMLScriptElement | null = null;
    if (jsonLd) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.dataset.routeHead = "true";
      ldScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(ldScript);
    }

    return () => {
      document.title = prevTitle;
      robots.setAttribute("content", "index, follow");
      ldScript?.remove();
    };
    // jsonLd is stringified so callers can pass an inline object safely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, noindex, JSON.stringify(jsonLd ?? null)]);


  return null;
};

export default RouteHead;
