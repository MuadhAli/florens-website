import React from 'react';
import { ViewId, SolutionId } from '../types';
import { SOLUTIONS_DATA } from '../data';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Info,
  Calendar,
  Lock
} from 'lucide-react';
import LeadInquiryForm from './LeadInquiryForm';

interface ServiceDetailViewProps {
  solutionId: SolutionId;
  onNavigate?: (view: ViewId) => void;
}

export default function ServiceDetailView({ solutionId, onNavigate = () => {} }: ServiceDetailViewProps) {
  const detail = SOLUTIONS_DATA[solutionId];

  if (!detail) {
    return (
      <div className="pt-32 text-center text-xs font-mono text-neutral-400">
        ERROR: STRUCTURAL RESOLVER UNABLE TO INDEX {solutionId}
      </div>
    );
  }

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
            <span className="text-[#005eb5] font-bold">Services</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#005eb5] font-bold">{detail.title}</span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5c9efe] font-bold mb-4"
          >
            Corporate Division • {detail.title}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 max-w-4xl leading-tight"
          >
            {detail.subtitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl"
          >
            {detail.description}
          </motion.p>
        </div>
      </section>

      {/* Feature Split columns with illustrative image */}
      <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Features list (left 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#005eb5]" /> Corporate Guardrails &amp; Security
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.features.map((feature, i) => (
                <li key={i} className="flex gap-2.5 items-start text-xs text-neutral-600 bg-white border border-neutral-200/50 p-4 rounded-lg hover:border-neutral-300 transition shadow-sm">
                  <CheckCircle2 className="text-[#005eb5] w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#f0f3ff] p-6 rounded-lg border border-neutral-200/50 font-sans">
            <h3 className="font-mono text-[9px] uppercase text-neutral-400 font-bold tracking-widest mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#005eb5]" /> Architectural Blueprint Overview
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {detail.detailedDescription}
            </p>
          </div>

          <div className="border border-neutral-200 p-6 rounded-lg relative overflow-hidden bg-white/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#005eb5] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-widest mb-1">Territorial Statutory Integrity</h4>
              <p className="text-xs font-semibold text-primary">{detail.complianceHighlight}</p>
            </div>
          </div>
        </div>

        {/* Floating illustrative card on right side (right 5 cols) */}
        <div className="lg:col-span-5">
          <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-md bg-white mb-8">
            <div className="w-full h-[240px] overflow-hidden grayscale relative">
              <img 
                alt={detail.title}
                className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
                src={detail.hotlinkImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
              <span className="absolute bottom-4 left-4 font-mono text-[8px] text-white uppercase bg-primary/45 backdrop-blur-md px-2.5 py-1 tracking-widest font-bold flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#5c9efe]" /> FLR PROTOCOL: SECURE
              </span>
            </div>
            
            <div className="p-6 space-y-4 text-xs font-sans text-neutral-700">
              <h3 className="font-serif text-base font-bold text-primary">Strategic Operational Benefits</h3>
              <div className="space-y-4">
                {detail.benefits.map((b, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                    <strong className="text-primary font-serif italic text-sm text-[#005eb5]">{b.title}</strong>
                    <p className="text-neutral-500 text-[11px] leading-relaxed mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Embedded inquiry lead form */}
      <section className="py-8 border-t border-neutral-100 max-w-4xl mx-auto">
        <LeadInquiryForm solutionId={detail.id} solutionTitle={detail.title} />
      </section>
    </div>
  );
}
