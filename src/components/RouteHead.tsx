import { useEffect } from "react";

interface RouteHeadProps {
  title: string;
  description: string;
  path: string; // route path, e.g. "/privacy-policy"
  /** When true, emits <meta name="robots" content="noindex, nofollow"> */
  noindex?: boolean;
}

/**
 * Updates <title>, meta description, canonical link and robots for the current route.
 * Note: crawlers of a static Vite SPA primarily read index.html; this improves
 * the in-browser experience and JS-executing crawlers.
 */
const RouteHead = ({ title, description, path, noindex = false }: RouteHeadProps) => {
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

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);

  return null;
};

export default RouteHead;
