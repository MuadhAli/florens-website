import { ServiceDetail, SolutionId } from './types';

export const SOLUTIONS_DATA: Record<SolutionId, ServiceDetail> = {
  eor: {
    id: 'eor',
    title: 'Employer of Record (EOR)',
    subtitle: 'Hire, Manage, Pay, and Remain Compliant, from Wherever You Are.',
    description: 'Deploy legal workforce resources instantly without incorporating. We handle complex local payroll, HR laws, and health insurance, keeping your company zero-risk.',
    features: [
      'Comprehensive IP Protection & Non-Disclosure frameworks',
      'Automated global contracts local-compliant out-of-the-box',
      'Localized benefits management (health, pension, allowances)',
      'Single monthly invoice covering global salaries, taxes, & fees'
    ],
    detailedDescription: `
      An Employer of Record (EOR) solves the core barrier of global expansion: the legal necessity to establish a physical local entity to hire teams locally.
      By utilizing Florens' pre-existing institutional corporate infrastructure, you can onboard employees in hours safely. Our digital ledger structure manages and assumes complete statutory liability for employee administration, ensuring perfect peace of mind.
    `,
    benefits: [
      { title: 'Zero Regulatory Risk', desc: 'Florens legally acts as the local employer, absorbing all regulatory, compliance, and legal audits.' },
      { title: 'Instant Onboarding', desc: 'Skip the 6-month entity setup queue and start operating next-day with standardized legal contracts.' },
      { title: 'Centralized Human Capital', desc: 'Sync multi-currency salary dispersals, local tax reporting, and regional holiday policies inside one dashboard.' }
    ],
    complianceHighlight: '100% compliant with local labour guidelines across 150+ operational territories with a 99.9% compliance record.',
    hotlinkImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmV4M9-YHt493wTdAR8zDrGuCizCN9Wpz1g8QRAxKu1BZDbwTPLp1fksAfZki51R0TncWwBVrkh8HckWTM2__PvTtDDUD_RlLRjtdR8_lIcjHcqQs619cvExaNkjC4VF5o_DHCwePHApxCuB_iFPQt-10Mt3YGhe9v3hYj2Q_9G83QVv6RDPsFcfLabRAMRhrGF19C5JZk1vX5yORe2aV-0V_YHaO9gb1M1Gw84oD4Lpps8FlgkUlORvOszsDPY3XZ-35yHaXAO9Q'
  },
  peo: {
    id: 'peo',
    title: 'International PEO & HR Specialist',
    subtitle: 'Expand Quickly, Efficiently, and Cost-effectively with Remunance.',
    description: 'Co-employment solutions built to coordinate localized payroll, specialized benefits, and unified compliance frameworks for established organizations.',
    features: [
      'Shared co-employment statutory burden allocation',
      'Unified enterprise health plans and group discounts',
      'Accurate processing of bonuses, commissions & expenses',
      'Integrated cross-border performance assessment metrics'
    ],
    detailedDescription: `
      Our International Professional Employer Organization (PEO) model is calibrated for organizations that want deep administrative integration over their global talent pools.
      Leveraging co-employment frameworks, Florens acts as your human capital partner, managing administrative overhead, statutory deductions, benefits administration, and risk mitigation, whilst leaving core product direction in your control.
    `,
    benefits: [
      { title: 'Enhanced Group Benefits', desc: 'Gain access to premium, lower-cost healthcare, pension schemes, and insurance programs via Florens scale.' },
      { title: 'Dedicated Local HR Architects', desc: 'Navigate localized union demands, complex tax adjustments, and severance negotiations with live regional experts.' },
      { title: 'Cost-Effective Scaling', desc: 'Optimize operation overheads with a clear, predictable pricing curve scale based on active headcount.' }
    ],
    complianceHighlight: 'Perfect statutory alignment and collective bargaining handling in EMEA and APAC jurisdictions.',
    hotlinkImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACRkgVrL4s5pZC_lWTEOdXeFWgJP7KnkVpo-xK2X9T721RzK7ecMalJzinZzKt0_7CKKyxtDVAWHthcz7G2bgN86cmD7umHjXP9clsskzIY5MqGwWfzlE0r8Y7dm0rR0b0oq_-yrmo04UHMNk3njpgF3ln_olhYCGwcg3SnERH0uxj3t7vB2Gz4aLxN8Wr-p9YwBKz-ntnTeATIAp0RxFgo7addqnZRwRmBjv7KdDbgPfIbEOBMjfCaViHvFg2vzMhgXJ0kQ7rZR8'
  },
  contractor: {
    id: 'contractor',
    title: 'Independent Contractor Solutions',
    subtitle: 'Compliant workforce solutions with no PE risks',
    description: 'Seamlessly onboard and compensate global freelancers and contractors. Systematically isolate and prevent Permanent Establishment (PE) misclassification risks.',
    features: [
      'Algorithmic contractor misclassification assessment algorithms',
      'Real-time multi-currency instant payout protocols',
      'Automated local W-8/W-9/1099 compliance logging',
      'Standardized IP assignment validation certificates'
    ],
    detailedDescription: `
      Engaging international freelancers is highly efficient, but exposes organizations to substantial tax audits and heavy classification lawsuits if miscategorized.
      Our Contractor Onboarding and Payment pipeline analyzes local tax rules to confirm contractor classification legitimacy, registers valid non-disclosure and intellectual property assignment documents, and distributes instant payouts flawlessly.
    `,
    benefits: [
      { title: 'PE Shielding Architecture', desc: 'Isolate operations from Permanent Establishment triggers through structurally sandboxed contracts.' },
      { title: 'Fraction-of-Second Payments', desc: 'Distribute secure international contractor fees in over 120 global currencies with rock-solid banking pipelines.' },
      { title: 'Self-Service Onboarding Portal', desc: 'Empower international contractors to file their tax forms, submit verified invoices, and choose their disbursement paths.' }
    ],
    complianceHighlight: 'Customized localized contracts audited to surpass IRS, GDPR, and regional classification rules.',
    hotlinkImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmV4M9-YHt493wTdAR8zDrGuCizCN9Wpz1g8QRAxKu1BZDbwTPLp1fksAfZki51R0TncWwBVrkh8HckWTM2__PvTtDDUD_RlLRjtdR8_lIcjHcqQs619cvExaNkjC4VF5o_DHCwePHApxCuB_iFPQt-10Mt3YGhe9v3hYj2Q_9G83QVv6RDPsFcfLabRAMRhrGF19C5JZk1vX5yORe2aV-0V_YHaO9gb1M1Gw84oD4Lpps8FlgkUlORvOszsDPY3XZ-35yHaXAO9Q'
  },
  subsidiary: {
    id: 'subsidiary',
    title: 'Subsidiary Formation Strategy',
    subtitle: 'Establish your India footprint with expert guidance.',
    description: 'Establish permanent institutional structures and physical foreign enterprises. Complete corporate incorporation, directorship rules alignment, and tax filings setups.',
    features: [
      'Full private limited (Pte Ltd) / LLP entity initialization',
      'Ministry of Corporate Affairs filing & registrar representations',
      'Statutory local resident director sponsorship services',
      'Corporate banking alignment and capitalization verification'
    ],
    detailedDescription: `
      When scaling long-term, creating a wholly-owned subsidiary represents the ultimate strategy to establish deep localized loyalty and capture maximum valuation.
      Florens provides structured, mathematically precise strategic consulting to guide you from initial documentation design to MCA statutory approval, corporate tax index setups (PAN/TAN/GST), and post-incumbency administrative activation.
    `,
    benefits: [
      { title: 'Statutory Directorship Alignment', desc: 'Access certified, compliant local proxy resident directors to satisfy statutory board guidelines.' },
      { title: 'Pre-vetted Statutory Templates', desc: 'Secure custom charter drafts (Articles of Association/Memorandum of Association) that optimize investment structures.' },
      { title: 'Full Financial Index Integration', desc: 'Set up local corporate financial accounting pipelines (GST, PAN, bank ledgers) under global GAAP/IFRS alignments.' }
    ],
    complianceHighlight: 'Strategic consulting for permanent entity structures in India and global financial capitals.',
    hotlinkImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmV4M9-YHt493wTdAR8zDrGuCizCN9Wpz1g8QRAxKu1BZDbwTPLp1fksAfZki51R0TncWwBVrkh8HckWTM2__PvTtDDUD_RlLRjtdR8_lIcjHcqQs619cvExaNkjC4VF5o_DHCwePHApxCuB_iFPQt-10Mt3YGhe9v3hYj2Q_9G83QVv6RDPsFcfLabRAMRhrGF19C5JZk1vX5yORe2aV-0V_YHaO9gb1M1Gw84oD4Lpps8FlgkUlORvOszsDPY3XZ-35yHaXAO9Q'
  }
};

export interface CountryRate {
  id: string;
  name: string;
  taxRate: number;
  taxLabel: string;
  monthlyFee: number;
}

export const COUNTRY_RATES: CountryRate[] = [
  { id: 'uk', name: 'United Kingdom', taxRate: 0.138, taxLabel: '13.8% NIC', monthlyFee: 599 },
  { id: 'de', name: 'Germany', taxRate: 0.21, taxLabel: '~21% Social', monthlyFee: 649 },
  { id: 'jp', name: 'Japan', taxRate: 0.15, taxLabel: '~15% Social', monthlyFee: 599 },
  { id: 'in', name: 'India', taxRate: 0.12, taxLabel: '12.0% PF/ESI', monthlyFee: 399 },
  { id: 'br', name: 'Brazil', taxRate: 0.28, taxLabel: '~28% INSS/FGTS', monthlyFee: 499 }
];

export const THE_ARCHIVE = [
  {
    num: '001',
    title: 'TechCorp EMEA Expansion',
    type: 'Case Study • Germany, UK',
    period: 'Q4 2023'
  },
  {
    num: '002',
    title: 'Navigating APAC Compliance Standards',
    type: 'Whitepaper • Singapore, Japan',
    period: 'Q1 2024'
  },
  {
    num: '003',
    title: 'Optimizing Distributed Engineering Teams',
    type: 'Analysis • India, Poland',
    period: 'Q2 2024'
  }
];
