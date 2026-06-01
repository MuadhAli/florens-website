export type ViewId = 'home' | 'global-solutions' | 'subsidiary-formation' | 'cost-calculator' | 'service-detail' | 'contact-us' | 'about-us' | 'why-florens';

export type SolutionId = 'eor' | 'peo' | 'contractor' | 'subsidiary';

export interface ServiceDetail {
  id: SolutionId;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  detailedDescription: string;
  benefits: { title: string; desc: string }[];
  complianceHighlight: string;
  hotlinkImage?: string;
}

export interface InquiryMessage {
  name: string;
  email: string;
  company: string;
  targetCountry: string;
  headcount: string;
  solutionId: SolutionId;
  additionalInfo: string;
}

export interface CalculatorState {
  country: string;
  headcount: number;
  salary: number;
  benefitsTier: 'standard' | 'premium';
}
