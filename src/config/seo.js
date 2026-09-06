function upsertMeta(selector, attribute, value) {
  if (!value) return;

  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function applyPageMetadata(seo = {}) {
  document.documentElement.lang = seo.lang || 'es';
  document.title = seo.title || 'Landing Page';

  upsertMeta('meta[name="description"]', 'content', seo.description);
  upsertMeta('meta[name="keywords"]', 'content', seo.keywords);
  upsertMeta('meta[property="og:title"]', 'content', seo.title);
  upsertMeta('meta[property="og:description"]', 'content', seo.description);
  upsertMeta('meta[property="og:image"]', 'content', seo.ogImage);
}
