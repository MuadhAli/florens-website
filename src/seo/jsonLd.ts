import { PageSeo } from './pages';
import { ORGANIZATION, SITE_NAME, SITE_URL } from './site';

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: ORGANIZATION.logo,
    description:
      'Multidisciplinary business consulting firm for global expansion, EOR, PEO, contractor management, and subsidiary formation.',
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORGANIZATION.address.streetAddress,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ORGANIZATION.geo.latitude,
      longitude: ORGANIZATION.geo.longitude,
    },
    areaServed: ['IN', 'Worldwide'],
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: ORGANIZATION.email,
      telephone: ORGANIZATION.telephone,
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function buildWebPageJsonLd(page: PageSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function buildAllJsonLd(page: PageSeo, breadcrumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(),
      buildWebPageJsonLd(page),
      buildBreadcrumbJsonLd(breadcrumbs),
    ],
  };
}
