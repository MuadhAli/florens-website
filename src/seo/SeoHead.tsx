import { useEffect } from 'react';
import { ViewId, SolutionId } from '../types';
import { getPageSeo, getCanonicalUrl } from './pages';
import { buildAllJsonLd } from './jsonLd';
import { DEFAULT_KEYWORDS, DEFAULT_OG_IMAGE, SITE_NAME } from './site';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const BREADCRUMBS: Record<ViewId, { name: string; path: string }[]> = {
  home: [{ name: 'Home', path: '/' }],
  'global-solutions': [
    { name: 'Home', path: '/' },
    { name: 'Global Solutions', path: '/global-solutions' },
  ],
  'subsidiary-formation': [
    { name: 'Home', path: '/' },
    { name: 'Subsidiary Formation', path: '/subsidiary-formation' },
  ],
  'cost-calculator': [
    { name: 'Home', path: '/' },
    { name: 'Cost Calculator', path: '/cost-calculator' },
  ],
  'about-us': [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
  ],
  'why-florens': [
    { name: 'Home', path: '/' },
    { name: 'Why Florens', path: '/why-florens' },
  ],
  'contact-us': [
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us' },
  ],
  'service-detail': [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/global-solutions' },
  ],
  'not-found': [
    { name: 'Home', path: '/' },
    { name: 'Not Found', path: '/404' },
  ],
};

interface SeoHeadProps {
  view: ViewId;
  solutionId: SolutionId;
}

export default function SeoHead({ view, solutionId }: SeoHeadProps) {
  useEffect(() => {
    const page = getPageSeo(view, solutionId);
    const canonical = getCanonicalUrl(page.path);
    const keywords = page.keywords || DEFAULT_KEYWORDS;

    document.title = page.title;
    document.documentElement.lang = 'en-IN';

    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertMeta('name', 'googlebot', 'index, follow');

    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:type', page.ogType || 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);

    upsertMeta('name', 'geo.region', 'IN-KA');
    upsertMeta('name', 'geo.placename', 'Bengaluru');
    upsertMeta('name', 'geo.position', '12.9915;77.5662');
    upsertMeta('name', 'ICBM', '12.9915, 77.5662');

    const crumbs = [...BREADCRUMBS[view]];
    if (view === 'service-detail') {
      crumbs.push({
        name: getPageSeo('service-detail', solutionId).title.split('|')[0].trim(),
        path: page.path,
      });
    }

    upsertJsonLd('florens-jsonld', buildAllJsonLd(page, crumbs));
  }, [view, solutionId]);

  return null;
}
