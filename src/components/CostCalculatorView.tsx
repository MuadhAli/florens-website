import React, { useState, useEffect } from 'react';
import { COUNTRY_RATES, CountryRate } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Users, 
  DollarSign, 
  Briefcase, 
  Calculator, 
  Globe, 
  Percent, 
  Info, 
  ShieldCheck, 
  ArrowRight, 
  X,
  Sparkles,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import LeadInquiryForm from './LeadInquiryForm';

import { ViewId } from '../types';

interface CostCalculatorViewProps {
  onNavigate?: (view: ViewId) => void;
}

export default function CostCalculatorView({ onNavigate = () => {} }: CostCalculatorViewProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('uk');
  const [headcount, setHeadcount] = useState<number>(3);
  const [salary, setSalary] = useState<number>(115000);
  const [benefitsTier, setBenefitsTier] = useState<'standard' | 'premium'>('standard');
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Find country details
  const countryData = COUNTRY_RATES.find(c => c.id === selectedCountry) || COUNTRY_RATES[0];
  
  // Rate modifiers
  const benefitsRate = benefitsTier === 'standard' ? 0.05 : 0.12;
  
  // Annualized calculations
  const totalBase = headcount * salary;
  const totalTax = totalBase * countryData.taxRate;
  const totalBenefits = totalBase * benefitsRate;
  const totalFee = headcount * countryData.monthlyFee * 12; // $599 etc. annualized
  
  const grandTotal = totalBase + totalTax + totalBenefits + totalFee;

  // Percentage shares
  const pBase = grandTotal > 0 ? (totalBase / grandTotal) * 100 : 0;
  const pTax = grandTotal > 0 ? (totalTax / grandTotal) * 100 : 0;
  const pBenefits = grandTotal > 0 ? (totalBenefits / grandTotal) * 100 : 0;
  const pFee = grandTotal > 0 ? (totalFee / grandTotal) * 100 : 0;

  // Format currencies nicely
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="animate-fade-in pt-24 px-6 md:px-16 max-w-7xl mx-auto pb-24 font-sans">
      
      {/* Hero Section with Breadcrumb */}
      <section className="relative bg-[#02050b] text-white pt-32 pb-20 px-6 md:px-16 overflow-hidden -mx-6 md:-mx-16 mb-12 mt-[-6rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#005eb5]/20 via-[#02050b] to-[#02050b]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-6"
          >
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('home')}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#005eb5] font-bold">Cost Modeling</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="p-1 px-2.5 bg-[#005eb5]/20 text-[#5c9efe] text-[10px] font-mono font-bold rounded flex items-center gap-1 border border-[#005eb5]/30">
              <Calculator className="w-3 h-3" /> ALGORITHMIC MODELING
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Project Total Employment Liability.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed"
          >
            Utilize our dynamic statutory forecasting engine to model the real financial cost of global expansion. Instantly simulate salaries, NIC burdens, and compliance fees in seconds.
          </motion.p>
        </div>
      </section>

      {/* Main Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column - Configuration Sidebar */}
        <section className="lg:col-span-4 bg-white border border-[#c5c6cc]/40 p-6 md:p-8 rounded-xl shadow-sm flex flex-col gap-6">
          <div className="border-b border-neutral-100 pb-3 mb-1 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-primary">Configuration</h2>
              <p className="text-neutral-400 text-[10px] mt-0.5">Parameters for workforce simulation</p>
            </div>
          </div>

          {/* Selector Target Jurisdiction */}
          <div className="flex flex-col gap-1.5 text-xs text-neutral-700">
            <label className="font-mono uppercase font-semibold text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#005eb5]" /> Target Jurisdiction
            </label>
            <div className="relative">
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-450 focus:border-[#005eb5] py-3.5 pl-3.5 pr-10 rounded-lg text-xs font-semibold text-primary transition focus:outline-none appearance-none cursor-pointer"
              >
                {COUNTRY_RATES.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name} ({country.taxLabel})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* FTE Headcount Slider */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline text-xs text-neutral-700">
              <label className="font-mono uppercase font-semibold text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#005eb5]" /> Headcount (FTEs)
              </label>
              <span className="font-mono text-xs text-secondary font-bold bg-[#005eb5]/10 px-2 py-0.5 rounded">
                {headcount} {headcount === 1 ? 'Person' : 'People'}
              </span>
            </div>
            
            <input 
              type="range"
              min="1"
              max="50"
              step="1"
              value={headcount}
              onChange={(e) => setHeadcount(parseInt(e.target.value) || 1)}
              className="w-full h-2 rounded-lg bg-neutral-200 cursor-pointer accent-[#005eb5]"
            />
          </div>

          {/* Avg Base Comp Salary numeric input */}
          <div className="flex flex-col gap-1.5 text-xs text-neutral-700">
            <label className="font-mono uppercase font-semibold text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#005eb5]" /> Avg. Base Salary (USD / Year)
            </label>
            <div className="relative flex items-center bg-[#f9f9ff] border border-neutral-250 focus-within:border-[#005eb5] focus-within:ring-1 focus-within:ring-[#005eb5]/20 rounded-lg transition-all pr-2">
              <span className="font-mono text-neutral-450 pl-3.5 pr-1 text-sm">$</span>
              <input 
                type="number"
                min="1000"
                max="500000"
                value={salary}
                onChange={(e) => setSalary(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-transparent py-3.5 text-xs text-primary focus:outline-none font-sans font-bold border-none"
                placeholder="e.g. 85000"
              />
            </div>
          </div>

          {/* Radio toggle for Supplemental Custom Benefits */}
          <div className="flex flex-col gap-3 text-xs text-neutral-700">
            <label className="font-mono uppercase font-semibold text-[9px] text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#005eb5]" /> Supplemental Benefits Tier
            </label>
            
            <div className="grid grid-cols-1 gap-2.5">
              <label 
                className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition ${
                  benefitsTier === 'standard' 
                    ? 'bg-[#005eb5]/5 border-[#005eb5]' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input 
                  type="radio"
                  name="benefits"
                  checked={benefitsTier === 'standard'}
                  onChange={() => setBenefitsTier('standard')}
                  className="text-secondary focus:ring-secondary border-neutral-300 w-4 h-4 bg-transparent cursor-pointer"
                />
                <div>
                  <span className="block font-bold text-primary">Standard Tier (5%)</span>
                  <span className="block text-[10px] text-neutral-500 mt-0.5">Statutory matching + basic medical insurance</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition ${
                  benefitsTier === 'premium' 
                    ? 'bg-[#005eb5]/5 border-[#005eb5]' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input 
                  type="radio"
                  name="benefits"
                  checked={benefitsTier === 'premium'}
                  onChange={() => setBenefitsTier('premium')}
                  className="text-secondary focus:ring-secondary border-neutral-300 w-4 h-4 bg-transparent cursor-pointer"
                />
                <div>
                  <span className="block font-bold text-primary">Premium Tier (12%)</span>
                  <span className="block text-[10px] text-neutral-500 mt-0.5">Full family coverage + supplementary pension matrix</span>
                </div>
              </label>
            </div>
          </div>

        </section>

        {/* Right column - Ledger & Visualization Sheet */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main cost accounting ledger card */}
          <div className="bg-white border border-[#c5c6cc]/40 p-6 md:p-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-neutral-150 pb-5 mb-6">
              <div>
                <h2 className="font-serif text-lg font-bold text-primary">Financial Ledger Projector</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-neutral-400 text-[10px] font-mono uppercase font-bold">Annual operating forecast ({countryData.name})</span>
                </div>
              </div>
              <div className="text-left sm:text-right mt-4 sm:mt-0">
                <span className="font-mono uppercase text-[9px] text-neutral-400 tracking-wider block mb-0.5">Total Annual Operating Run Rate</span>
                <span className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            {/* Premium colorful ratio bar chart */}
            <div className="relative mb-8 pt-2">
              <div className="flex justify-between font-mono text-[9px] text-neutral-400 font-bold uppercase mb-2">
                <span>Annualized Ratio Allocation</span>
                <span>Active Ledger Sync</span>
              </div>
              <div className="w-full h-8 flex rounded-xl overflow-hidden shadow-inner bg-neutral-100 border border-neutral-200/50">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out" 
                  style={{ width: `${pBase}%` }}
                  title={`Base Salary: ${pBase.toFixed(1)}%`}
                ></div>
                <div 
                  className="h-full bg-neutral-500 transition-all duration-500 ease-out animate-pulse" 
                  style={{ width: `${pTax}%` }}
                  title={`Statutory Taxes: ${pTax.toFixed(1)}%`}
                ></div>
                <div 
                  className="h-full bg-sky-400 transition-all duration-500 ease-out" 
                  style={{ width: `${pBenefits}%` }}
                  title={`Supplemental Benefits: ${pBenefits.toFixed(1)}%`}
                ></div>
                <div 
                  className="h-full bg-[#005eb5] transition-all duration-500 ease-out" 
                  style={{ width: `${pFee}%` }}
                  title={`Florens Infrastructure Fee: ${pFee.toFixed(1)}%`}
                ></div>
              </div>
            </div>

            {/* Cost Breakdown Rows */}
            <div className="flex flex-col font-sans text-xs text-neutral-700">
              <div className="flex justify-between py-2.5 border-b-2 border-primary/10 mb-1 opacity-70 font-mono text-[9px] uppercase tracking-widest font-bold">
                <span>Cost Center</span>
                <div className="flex w-2/3 justify-between">
                  <span className="text-right w-1/2">Ratio Share</span>
                  <span className="text-right w-1/2">Annualized Value</span>
                </div>
              </div>

              {/* Row 1 */}
              <div className="flex justify-between py-4 border-b border-neutral-100 items-center">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
                  <span className="font-semibold text-neutral-800 text-[11px]">Aggregate Base Wages</span>
                </div>
                <div className="flex w-2/3 justify-between">
                  <span className="text-right text-neutral-450 w-1/2 font-mono font-bold">
                    {pBase.toFixed(1)}%
                  </span>
                  <span className="text-right text-primary font-bold w-1/2">
                    {formatCurrency(totalBase)}
                  </span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between py-4 border-b border-neutral-100 items-center">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-3 h-3 rounded-full bg-neutral-500 flex-shrink-0"></div>
                  <span className="font-semibold text-neutral-800 text-[11px]">{countryData.taxLabel}</span>
                </div>
                <div className="flex w-2/3 justify-between">
                  <span className="text-right text-neutral-450 w-1/2 font-mono font-bold">
                    {pTax.toFixed(1)}%
                  </span>
                  <span className="text-right text-primary font-bold w-1/2">
                    {formatCurrency(totalTax)}
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between py-4 border-b border-neutral-100 items-center">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-3 h-3 rounded-full bg-sky-400 flex-shrink-0"></div>
                  <span className="font-semibold text-neutral-800 text-[11px]">Supplemental Benefits</span>
                </div>
                <div className="flex w-2/3 justify-between">
                  <span className="text-right text-neutral-450 w-1/2 font-mono font-bold">
                    {pBenefits.toFixed(1)}%
                  </span>
                  <span className="text-right text-primary font-bold w-1/2">
                    {formatCurrency(totalBenefits)}
                  </span>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex justify-between py-4 border-b border-neutral-100 items-center">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-3 h-3 rounded-full bg-[#005eb5] flex-shrink-0"></div>
                  <span className="font-bold text-[#005eb5] text-[11px]">Florens SLA / Platform Fee</span>
                </div>
                <div className="flex w-2/3 justify-between">
                  <span className="text-right text-neutral-450 w-1/2 font-mono font-bold">
                    {pFee.toFixed(1)}%
                  </span>
                  <span className="text-right text-primary font-bold w-1/2">
                    {formatCurrency(totalFee)}
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-6 flex items-start gap-2 p-3 bg-neutral-50 border border-neutral-200/50 rounded-lg text-neutral-500 text-[10px] leading-relaxed">
              <Info className="w-4 h-4 text-[#005eb5] flex-shrink-0 mt-0.5" />
              <p>
                *Taxes and statutory formulas are mapped in accordance with localized codes (e.g. NIC in the UK, social security in Germany). Administrative margins reflect default enterprise tiering.
              </p>
            </div>
          </div>

          {/* interactive projection metrics & warnings cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white border border-neutral-200 p-5 rounded-xl text-neutral-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#005eb5] font-bold uppercase mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#005eb5]" /> Compliance Guarantee
                </div>
                <h4 className="font-bold text-primary mb-1">Liability Indemnification</h4>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Florens is contractually co-liable as employer of record, guaranteeing error-free tax setup and full civil security.
                </p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-5 rounded-xl text-neutral-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#005eb5] font-bold uppercase mb-2">
                  <Percent className="w-4 h-4 text-[#005eb5]" /> Statutory rate notice
                </div>
                <h4 className="font-bold text-primary mb-1">{countryData.name} Tax Bracket</h4>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Calculated against localized co-employer flat tax schemes of <strong className="text-primary">{(countryData.taxRate * 100).toFixed(0)}%</strong>. Contact accounts for corporate bracket exemptions.
                </p>
              </div>
            </div>

          </div>

          {/* Refine this Projection CTA widget */}
          <div className="bg-gradient-to-r from-white via-white to-[#005eb5]/5 border border-secondary/20 p-8 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
            <div className="max-w-md">
              <h3 className="font-serif text-lg font-bold text-primary mb-1 flex items-center gap-1.5Shared flex-wrap">
                <Sparkles className="w-5 h-5 text-[#005eb5]" /> Refine this Projection
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Connect directly with our corporate general counsel and financial modeling planners to draft an official, localized budget for your next strategic board meeting.
              </p>
            </div>
            
            <button 
              onClick={() => setShowInquiryModal(true)}
              className="h-12 px-6 bg-primary text-white font-mono text-[10px] uppercase font-bold tracking-widest hover:bg-neutral-800 transition-all duration-305 whitespace-nowrap flex items-center gap-2 cursor-pointer rounded shadow-sm text-center"
            >
              Schedule Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </section>

      </div>

      {/* Audit Form Popup Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
            <button 
              onClick={() => setShowInquiryModal(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-primary transition z-40 p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
            <LeadInquiryForm 
              solutionId="eor" 
              solutionTitle={`EOR Strategic Blueprint (${countryData.name})`} 
              onClose={() => setShowInquiryModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
