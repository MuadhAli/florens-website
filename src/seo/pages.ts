import { ViewId, SolutionId } from '../types';
import { SOLUTIONS_DATA } from '../data';
import { SITE_NAME, SITE_NAME_SHORT, SITE_TAGLINE, SITE_URL } from './site';

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogType?: 'website' | 'article';
}

function servicePath(id: SolutionId) {
  return `/services/${id}`;
}

const PAGES: Record<Exclude<ViewId, 'service-detail'>, PageSeo> = {
  home: {
    path: '/',
    title: `${SITE_NAME_SHORT} | Business Consulting & Global Expansion`,
    description: `${SITE_TAGLINE} Employer of Record (EOR), PEO, contractor management, and subsidiary formation.`,
    keywords:
      'Florens, Florens Consulting Services, business consulting Bengaluru, global expansion, EOR India, PEO, workforce solutions',
    ogType: 'website',
  },
  'global-solutions': {
    path: '/global-solutions',
    title: `Global Architectures & Expansion | ${SITE_NAME_SHORT}`,
    description:
      'Explore Florens global architectures: compliant international hiring, payroll, HR, and cross-border workforce strategies.',
    keywords:
      'global business architecture, international workforce, global HR consulting, Florens global solutions',
  },
  'subsidiary-formation': {
    path: '/subsidiary-formation',
    title: `Subsidiary Formation India | ${SITE_NAME_SHORT}`,
    description:
      'Establish a compliant India subsidiary with Florens — MCA filings, directorship, banking, and statutory alignment in Bengaluru.',
    keywords:
      'subsidiary formation India, company incorporation Bengaluru, India entity setup, Florens subsidiary',
  },
  'cost-calculator': {
    path: '/cost-calculator',
    title: `EOR Cost Calculator | ${SITE_NAME_SHORT}`,
    description:
      'Model international employment costs with Florens EOR cost calculator. Compare payroll, tax, and fees across countries.',
    keywords:
      'EOR cost calculator, international payroll cost, employer of record pricing, Florens calculator',
  },
  'about-us': {
    path: '/about-us',
    title: `About Us | ${SITE_NAME}`,
    description:
      'Florens Consulting Services Pvt. Ltd. — multidisciplinary business consulting for market entry, workforce solutions, trade facilitation, and operational excellence.',
    keywords:
      'about Florens, Florens mission vision, business consulting firm India, multidisciplinary consulting Bengaluru',
  },
  'why-florens': {
    path: '/why-florens',
    title: `Why Choose Florens? | ${SITE_NAME_SHORT}`,
    description:
      'Client-centric consulting, industry expertise, end-to-end support, global perspective, and measurable results. Discover why businesses trust Florens.',
    keywords:
      'why Florens, trusted business consultant India, client-centric consulting, global market entry partner',
  },
  'contact-us': {
    path: '/contact-us',
    title: `Contact Us | ${SITE_NAME_SHORT} Bengaluru`,
    description:
      'Contact Florens Consulting in Bengaluru. Email business@florensservices.com, call 090712 05087, or WhatsApp +91 6361890855.',
    keywords:
      'contact Florens, Florens Bengaluru office, business consulting contact India, florensservices email',
  },
  'not-found': {
    path: '/404',
    title: `Page Not Found | ${SITE_NAME_SHORT}`,
    description: 'The page you are looking for does not exist.',
    keywords: '404, page not found',
  },
};

const SERVICE_SEO: Record<SolutionId, PageSeo> = {
  eor: {
    path: servicePath('eor'),
    title: `Employer of Record (EOR) | ${SITE_NAME_SHORT}`,
    description: SOLUTIONS_DATA.eor.description,
    keywords:
      'employer of record, EOR India, hire internationally without entity, global payroll EOR, Florens EOR',
  },
  peo: {
    path: servicePath('peo'),
    title: `International PEO & HR | ${SITE_NAME_SHORT}`,
    description: SOLUTIONS_DATA.peo.description,
    keywords:
      'international PEO, professional employer organization, global HR payroll, co-employment, Florens PEO',
  },
  contractor: {
    path: servicePath('contractor'),
    title: `Contractor Management | ${SITE_NAME_SHORT}`,
    description: SOLUTIONS_DATA.contractor.description,
    keywords:
      'contractor management, global freelancers compliance, misclassification risk, Florens contractors',
  },
  subsidiary: {
    path: '/subsidiary-formation',
    title: `Subsidiary Formation | ${SITE_NAME_SHORT}`,
    description: SOLUTIONS_DATA.subsidiary.description,
    keywords: 'subsidiary formation, India company setup, Florens',
  },
};

export function getPageSeo(view: ViewId, solutionId: SolutionId = 'eor'): PageSeo {
  if (view === 'service-detail') {
    return SERVICE_SEO[solutionId] ?? SERVICE_SEO.eor;
  }
  return PAGES[view];
}

export function getCanonicalUrl(path: string): string {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
  return normalized === '/' ? SITE_URL : `${SITE_URL}${normalized}`;
}

export const SITEMAP_PATHS = [
  '/',
  '/global-solutions',
  '/subsidiary-formation',
  '/cost-calculator',
  '/about-us',
  '/why-florens',
  '/contact-us',
  '/services/eor',
  '/services/peo',
  '/services/contractor',
] as const;
