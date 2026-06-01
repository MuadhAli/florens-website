import React, { useState } from 'react';
import { ViewId, SolutionId } from '../types';
import { THE_ARCHIVE } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Laptop, 
  Percent, 
  Info,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  ChevronRight
} from 'lucide-react';
import LeadInquiryForm from './LeadInquiryForm';

interface GlobalSolutionsViewProps {
  onNavigate: (view: ViewId, solutionId?: SolutionId) => void;
}

export default function GlobalSolutionsView({ onNavigate }: GlobalSolutionsViewProps) {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'emea' | 'apac' | 'americas'>('all');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Region pins to show over the world map
  const pins = {
    all: [
      { id: 'ny', top: '35%', left: '25%', name: 'New York Secretariat', details: 'AMER Central • Onboarding <48h' },
      { id: 'lon', top: '30%', left: '46%', name: 'London Node', details: 'EMEA HQ • 100% Statutory Compliance' },
      { id: 'fra', top: '32%', left: '50%', name: 'Frankfurt Hub', details: 'EU General Works Council Alignment' },
      { id: 'lag', top: '50%', left: '55%', name: 'Lagos Gateway', details: 'EOR Sub-Saharan Ledger Active' },
      { id: 'del', top: '45%', left: '68%', name: 'New Delhi Core', details: 'India Regional HQ • Turnkey Subsidiary' },
      { id: 'tok', top: '36%', left: '80%', name: 'Tokyo Registry', details: 'APAC North Node • Local Pension Compliance' },
      { id: 'sin', top: '52%', left: '74%', name: 'Singapore Regional APAC HQ', details: 'APAC Core Routing • Financial Hub' },
      { id: 'sp', top: '68%', left: '29%', name: 'São Paulo Terminal', details: 'LATAM Regional Compliance Gate' }
    ],
    emea: [
      { id: 'lon', top: '30%', left: '46%', name: 'London Node', details: 'EMEA HQ • 100% Statutory Compliance' },
      { id: 'fra', top: '32%', left: '50%', name: 'Frankfurt Hub', details: 'EU General Works Council Alignment' },
      { id: 'lag', top: '50%', left: '55%', name: 'Lagos Gateway', details: 'EOR Sub-Saharan Ledger Active' }
    ],
    apac: [
      { id: 'del', top: '45%', left: '68%', name: 'New Delhi Core', details: 'India Regional HQ • Turnkey Subsidiary' },
      { id: 'tok', top: '36%', left: '80%', name: 'Tokyo Registry', details: 'APAC North Node • Local Pension Compliance' },
      { id: 'sin', top: '52%', left: '74%', name: 'Singapore Regional APAC HQ', details: 'APAC Core Routing • Financial Hub' }
    ],
    americas: [
      { id: 'ny', top: '35%', left: '25%', name: 'New York Secretariat', details: 'AMER Central • Onboarding <48h' },
      { id: 'sp', top: '68%', left: '29%', name: 'São Paulo Terminal', details: 'LATAM Regional Compliance Gate' }
    ]
  };

  const regionDescriptions = {
    all: 'Global cross-border routing covering 150+ operational countries.',
    emea: 'Unified European & African compliance matching strict GDPR & GCC specifications.',
    apac: 'High-growth East Asian corridors and Indian footprint configurations.',
    americas: 'Secure US corporate routing combined with South American tax optimization.'
  };

  return (
    <div className="animate-fade-in pt-24 px-6 md:px-16 max-w-7xl mx-auto pb-24 font-sans text-neutral-800">
      
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
            <span className="text-[#005eb5] font-bold">Global Architectures</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="p-1 px-2.5 bg-[#005eb5]/20 text-[#5c9efe] text-[10px] font-mono font-bold rounded flex items-center gap-1 border border-[#005eb5]/30">
              <ShieldCheck className="w-3 h-3" /> ENTERPRISE JURISDICTIONAL MATRIX
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
          >
            The Architecture of Global Expansion.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed"
          >
            A mathematically precise, editorial-first approach to International PEO and HR Management. We provide the structural safeguards required for seamless cross-border regulatory operations.
          </motion.p>
        </div>
      </section>

      {/* Bento Grid layout */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Core EOR */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="md:col-span-8 bg-white border border-[#c5c6cc]/40 p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[360px]"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#005eb5]" /> Corporate Infrastructure
              </p>
              <h2 className="font-serif text-2xl text-primary font-bold mb-4">Employer of Record (EOR)</h2>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed mb-6">
                Deploy talent across 150+ jurisdictions without establishing local corporate entities. Our decentralized digital general ledger ensures absolute compliance, unified tax optimization, and precise cross-border payroll execution.
              </p>
            </div>
            
            <div className="pt-6 border-t border-neutral-100 flex gap-10">
              <div>
                <span className="font-mono text-xl md:text-2xl text-primary font-bold">150+</span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block mt-1">Active Jurisdictions</span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2xl text-primary font-bold">99.9%</span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block mt-1">Compliance Accuracy</span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2xl text-primary font-bold">&lt; 48h</span>
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block mt-1">SLA Setup Speed</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Global Payroll */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="md:col-span-4 bg-white border border-[#c5c6cc]/40 p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[360px]"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-3 flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-[#005eb5]" /> Unified Asset Management
              </p>
              <h3 className="font-serif text-xl text-primary font-bold mb-2">Global Payroll Ledger</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Unified multi-currency compliance and statutory disbursement, optimized to prevent exchange loss. Run calculations and schedule automated pay slips inside one single protocol.
              </p>
            </div>

            <button 
              onClick={() => onNavigate('cost-calculator')}
              className="mt-6 flex items-center justify-between w-full border-t border-neutral-100 pt-4 text-left font-mono text-xs uppercase tracking-widest text-[#005eb5] font-bold hover:text-primary transition group cursor-pointer"
            >
              Run Cost Calculator
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-6">
          <div>
            <h2 className="font-serif text-2xl text-primary font-bold">Operational Territories &amp; Secretariat Nodes</h2>
            <p className="text-neutral-500 text-xs mt-1">Click nodes or filter by dynamic regions below to query local statutory offices.</p>
          </div>
          <div className="flex gap-2 text-xs font-mono">
            {(['all', 'emea', 'apac', 'americas'] as const).map((region) => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  setActiveNode(null);
                }}
                className={`px-3 py-1.5 uppercase tracking-wider transition rounded-lg text-[10px] cursor-pointer ${
                  selectedRegion === region 
                    ? 'bg-[#005eb5] text-white font-bold shadow-sm' 
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Global Blueprint Map Container */}
        <div className="w-full h-[520px] bg-[#f0f3ff] border border-neutral-200 rounded-xl relative overflow-hidden shadow-inner flex flex-col justify-between">
          <img 
            alt="Global Map Overlay" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity filter saturate-50" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACRkgVrL4s5pZC_lWTEOdXeFWgJP7KnkVpo-xK2X9T721RzK7ecMalJzinZzKt0_7CKKyxtDVAWHthcz7G2bgN86cmD7umHjXP9clsskzIY5MqGwWfzlE0r8Y7dm0rR0b0oq_-yrmo04UHMNk3njpgF3ln_olhYCGwcg3SnERH0uxj3t7vB2Gz4aLxN8Wr-p9YwBKz-ntnTeATIAp0RxFgo7addqnZRwRmBjv7KdDbgPfIbEOBMjfCaViHvFg2vzMhgXJ0kQ7rZR8"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f9f9ff]/50 to-transparent pointer-events-none"></div>

          {/* Interactive Ping Pins over Map */}
          {pins[selectedRegion].map((pin) => (
            <div 
              key={pin.id} 
              className="absolute group z-10 cursor-pointer" 
              style={{ top: pin.top, left: pin.left }}
              onClick={() => setActiveNode(pin.id === activeNode ? null : pin.id)}
            >
              <div className="relative flex items-center justify-center">
                <span className={`absolute inline-flex h-6 w-6 rounded-full bg-[#005eb5]/30 animate-pulse transition ${activeNode === pin.id ? 'scale-150 bg-[#005eb5]/50' : ''}`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 bg-[#005eb5] border-2 border-white transition-transform ${activeNode === pin.id ? 'scale-125 bg-primary' : 'group-hover:scale-110'}`}></span>
                
                {/* Instant dynamic tooltips */}
                <div className="absolute bottom-6 bg-primary text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-100 pointer-events-none transition scale-90 group-hover:scale-100 uppercase tracking-wider flex items-center gap-1 border border-white/10 z-20">
                  <MapPin className="w-3 h-3 text-[#5c9efe]" /> {pin.name}
                </div>
              </div>
            </div>
          ))}

          {/* Active information drawer showing when a map node is selected */}
          <div className="absolute top-4 right-4 z-20 max-w-[280px]">
            <AnimatePresence>
              {activeNode && (() => {
                const nodeData = pins[selectedRegion].find(p => p.id === activeNode);
                if (!nodeData) return null;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="bg-[#05101e] text-white p-4 rounded-lg shadow-xl border border-white/10 font-sans text-xs"
                  >
                    <div className="flex justify-between items-center mb-1 border-b border-white/10 pb-1.5 font-mono text-[8px] text-neutral-400 uppercase tracking-widest font-bold">
                      <span>Node inspection</span>
                      <button onClick={() => setActiveNode(null)} className="text-white hover:text-[#5c9efe]">Close</button>
                    </div>
                    <strong className="block text-[#5c9efe] text-sm font-semibold">{nodeData.name}</strong>
                    <p className="text-[#c5c6cc] text-[11px] mt-1.5 leading-relaxed">{nodeData.details}</p>
                    <div className="w-full h-px bg-white/5 my-2"></div>
                    <span className="font-mono text-[8.5px] uppercase tracking-wider block text-emerald-400 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SECURE SYNC STABLE
                    </span>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Core watermark status overlay */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-lg border border-neutral-200/55 p-4 rounded-lg font-mono text-[9px] text-neutral-600 space-y-1 z-10 shadow-lg pointer-events-none">
            <div className="flex items-center gap-1.5 font-bold text-primary">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              FLORENS CENTRAL BACKBONE
            </div>
            <div>REGION INDEX: <span className="text-secondary font-bold uppercase">{selectedRegion} MATRIX ACTIVE</span></div>
            <div>COVERAGE: <span className="text-primary font-bold">{regionDescriptions[selectedRegion]}</span></div>
            <div>SECURE STATUS: DECENTRALIZED DATA VALIDATED</div>
          </div>
        </div>
      </section>

      {/* The Archive Section */}
      <section className="py-12 border-t border-neutral-200/50 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 max-w-sm">
            <h2 className="font-serif text-2xl text-primary font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#005eb5]" /> Corporate Document Archive
            </h2>
            <p className="text-neutral-500 text-xs leading-relaxed mb-6 font-sans">
              Indexed academic case studies, legal whitepapers, and geographic briefs detailing structural compliance implementations across volatile high-growth regional corridors.
            </p>
            <button 
              onClick={() => onNavigate('subsidiary-formation')}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-secondary uppercase font-bold tracking-widest hover:underline cursor-pointer"
            >
              Read India Focus PDF <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-100">
            {THE_ARCHIVE.map((doc) => (
              <div 
                key={doc.num}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:bg-neutral-50/70 p-4 -mx-4 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[11px] text-neutral-300 font-bold">{doc.num}</span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      {doc.title}
                    </h4>
                    <span className="font-sans text-[10px] text-neutral-400 uppercase mt-0.5 block tracking-wide font-medium">
                      {doc.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-400">{doc.period}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-secondary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-12">
        <div className="bg-secondary text-white rounded-xl p-12 text-center relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-pattern"></div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4 font-bold relative z-10 leading-tight">
            Initiate Expansion Protocol.
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-neutral-200/95 text-xs md:text-sm leading-relaxed relative z-10">
            Consult with our structural legal architects to design a compliant, highly optimized legal roadmap and setup rules for your cross-border personnel.
          </p>
          <button 
            onClick={() => setShowInquiryModal(true)}
            className="bg-white hover:bg-neutral-50 text-[#005eb5] h-12 px-8 inline-flex items-center justify-center font-mono text-xs uppercase font-bold tracking-widest relative z-10 transition cursor-pointer"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-primary/45 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
            <button 
              onClick={() => setShowInquiryModal(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-primary transition z-45 p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
            <LeadInquiryForm 
              solutionId="eor" 
              solutionTitle="EOR Operational Strategy" 
              onClose={() => setShowInquiryModal(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
