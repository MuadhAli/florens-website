import { CONTACT, CONTACT_ADDRESS_FULL } from '../contact';

/** Production site URL — set VITE_SITE_URL in .env when deploying */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://florensservices.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Florens Consulting Services Pvt. Ltd.';
export const SITE_NAME_SHORT = 'Florens Consulting';
export const SITE_TAGLINE =
  'Business consulting, global expansion, EOR, PEO, and workforce solutions in Bengaluru, India.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/florens-logo-navbar.png`;

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'Florens Consulting Services Private Limited',
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  email: CONTACT.email,
  telephone: CONTACT.phoneTel,
  address: {
    streetAddress: `${CONTACT.address.line1}, ${CONTACT.address.line2}`,
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560010',
    addressCountry: 'IN',
  },
  fullAddress: CONTACT_ADDRESS_FULL,
  geo: {
    latitude: 12.9915,
    longitude: 77.5662,
  },
  sameAs: [] as string[],
};

export const DEFAULT_KEYWORDS = [
  'Florens Consulting',
  'Florens Consulting Services',
  'business consulting India',
  'global expansion consulting',
  'employer of record India',
  'EOR services India',
  'international PEO',
  'contractor management global',
  'subsidiary formation India',
  'market entry consulting',
  'workforce solutions Bengaluru',
  'business advisory Karnataka',
  'Rajajinagar consulting firm',
].join(', ');
