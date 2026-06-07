import { ViewId, SolutionId } from './types';
import { SITEMAP_PATHS } from './seo/pages';

const VALID_PATHS = new Set<string>(SITEMAP_PATHS);

export function getPath(view: ViewId, solutionId: SolutionId = 'eor'): string {
  switch (view) {
    case 'home':
      return '/';
    case 'global-solutions':
      return '/global-solutions';
    case 'subsidiary-formation':
      return '/subsidiary-formation';
    case 'cost-calculator':
      return '/cost-calculator';
    case 'about-us':
      return '/about-us';
    case 'why-florens':
      return '/why-florens';
    case 'contact-us':
      return '/contact-us';
    case 'service-detail':
      return `/services/${solutionId}`;
    default:
      return '/';
  }
}

export function parsePath(pathname: string): { view: ViewId; solutionId: SolutionId } {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/') return { view: 'home', solutionId: 'eor' };
  if (path === '/global-solutions') return { view: 'global-solutions', solutionId: 'eor' };
  if (path === '/subsidiary-formation') return { view: 'subsidiary-formation', solutionId: 'eor' };
  if (path === '/cost-calculator') return { view: 'cost-calculator', solutionId: 'eor' };
  if (path === '/about-us') return { view: 'about-us', solutionId: 'eor' };
  if (path === '/why-florens') return { view: 'why-florens', solutionId: 'eor' };
  if (path === '/contact-us') return { view: 'contact-us', solutionId: 'eor' };

  const serviceMatch = path.match(/^\/services\/(eor|peo|contractor)$/);
  if (serviceMatch) {
    return { view: 'service-detail', solutionId: serviceMatch[1] as SolutionId };
  }

  return { view: 'not-found', solutionId: 'eor' };
}

export function isValidPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  return VALID_PATHS.has(path);
}
