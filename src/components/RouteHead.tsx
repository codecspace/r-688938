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

    const canonical = setMeta(
      'link[rel="canonical"]',
      "href",
      path,
      () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      }
    );

    const ogUrl = setMeta(
      'meta[property="og:url"]',
      "content",
      path,
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

    return () => {
      document.title = prevTitle;
      robots.setAttribute("content", "index, follow");
    };
  }, [title, description, path, noindex]);

  return null;
};

export default RouteHead;
