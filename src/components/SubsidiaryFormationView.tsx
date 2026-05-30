import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Gavel, 
  DollarSign, 
  FileText, 
  Layers, 
  ClipboardCheck, 
  CheckCircle,
  Clock, 
  X, 
  ChevronRight, 
  Sliders, 
  Info,
  BookOpen,
  Milestone
} from 'lucide-react';
import LeadInquiryForm from './LeadInquiryForm';

export default function SubsidiaryFormationView() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [showFactSheet, setShowFactSheet] = useState(false);

  // Complete interactive phase checklists & dynamic values
  const phases = [
    {
      num: 'Phase 01',
      title: 'Structural Consultation',
      desc: 'Strategic alignment on entity type (Private Limited, LLP, Branch Office) based on your capital structure and operational intent in the jurisdiction.',
      timeEstimate: '1 - 2 Business Days',
      checklist: [
        'Analyze parent company shareholder structure suitability',
        'Identify domestic capital contribution tax routing constraints',
        'Assess board of directors delegation and residency demands',
        'Formulate corporate purpose & legal draft guidelines'
      ]
    },
    {
      num: 'Phase 02',
      title: 'Documentation Indexing',
      desc: 'Precise collation of KYC, apostilled resolutions, and foundational drafts (MOA/AOA). Indexed against statutory checklists to prevent application rejection.',
      timeEstimate: '3 - 5 Business Days',
      checklist: [
        'Obtain apostilled board resolution granting subsidiary setup',
        'Compile certified true copies of parent incorporation files',
        'Apostille individual identifiers of foreign directors',
        'Draft final Menorandum & Articles of Association (MOA/AOA)'
      ]
    },
    {
      num: 'Phase 03',
      title: 'Statutory Registration',
      desc: 'Filing with the Ministry of Corporate Affairs (MCA). Real-time tracking of name approval, DIN generation, and certificate of incorporation issuance.',
      timeEstimate: '5 - 7 Business Days',
      checklist: [
        'Secure corporate name reservation filing approvals',
        'Generate Resident Director Identification Numbers (DIN)',
        'Submit digital signature certificate registration profiles',
        'Acquire final statutory Certificate of Incorporation (COI)'
      ]
    },
    {
      num: 'Phase 04',
      title: 'Post-Incumbency Activation',
      desc: 'Opening of corporate bank accounts, PAN/TAN registration, and GST enrollment to transition from a legal entity to an operational vehicle.',
      timeEstimate: '4 - 6 Business Days',
      checklist: [
        'Apply for Permanent Account Number (PAN) & Tax Account Number (TAN)',
        'Integrate physical office proof & local commercial registry',
        'Establish institutional corporate bank account channels',
        'Initialize local Goods & Services Tax (GST) activation'
      ]
    }
  ];

  return (
    <div className="animate-fade-in pt-24 px-6 md:px-16 max-w-7xl mx-auto pb-24">
      
      {/* Editorial Header & Staircase Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 pb-16">
        
        {/* Left Columns - Copywriting */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="p-1 px-2.5 bg-[#005eb5]/10 text-[#005eb5] text-[10px] font-mono font-bold rounded">
              ENTITY SETUP &amp; STRATEGY
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-5xl text-primary font-bold mb-6 leading-[1.12]"
          >
            Establish institutional presence with absolute certainty.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed mb-10 max-w-xl"
          >
            Navigate complex regulatory environments with our mathematically precise formation framework. We manage the statutory ledger from initial documentation to post-incorporation compliance.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#005eb5] text-white h-12 px-8 flex items-center justify-center font-mono text-xs uppercase font-bold tracking-widest hover:bg-opacity-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#005eb5]/10 active:scale-95 text-center"
            >
              Initiate Formation
            </button>
            <button
              onClick={() => setShowFactSheet(!showFactSheet)}
              className="border border-neutral-300 hover:border-neutral-500 text-primary h-12 px-8 flex items-center justify-center font-mono text-xs uppercase font-bold tracking-widest hover:bg-neutral-50 transition-all duration-300 cursor-pointer text-center"
            >
              {showFactSheet ? 'Hide Fact Sheet' : 'View Fact Sheet'}
            </button>
          </motion.div>
        </div>

        {/* Right Columns - High-Key Architectural Image & Timeline badge */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="w-full h-[400px] border border-neutral-200 overflow-hidden relative rounded-xl shadow-md">
            <img 
              alt="Minimal staircase architectural view" 
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
            />
            <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none"></div>
            
            {/* Minimalist Floating Badge on Staircase */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-neutral-200/80 p-5 rounded-lg max-w-[240px] shadow-xl pointer-events-none"
            >
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">Standard Lifecycle</span>
              <p className="font-serif text-3xl font-bold text-primary">14 Days</p>
              <p className="font-sans text-[10px] text-neutral-500 leading-normal mt-1">
                Average statutory incorporation turnaround from paperwork validation to local Ministry registry stamp.
              </p>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Fact Sheet Overlay Drawer */}
      <AnimatePresence>
        {showFactSheet && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#f0f3ff] border border-neutral-200/80 p-8 rounded-lg mb-16 overflow-hidden"
          >
            <div className="flex justify-between items-baseline mb-6 border-b border-neutral-200/50 pb-3">
              <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#005eb5]" /> Pre-Incorporation Fact Sheet
              </h3>
              <span className="font-mono text-[9px] text-[#005eb5] font-bold uppercase tracking-widest bg-[#005eb5]/10 px-2.5 py-1 rounded">
                INDEX: INR-01A
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-700 font-sans">
              <div className="bg-white p-4 rounded-lg border border-neutral-200/50">
                <h4 className="font-mono font-bold text-neutral-500 mb-2 uppercase tracking-wider text-[10px]">Required Documents</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
                  <li>Apostilled utility bank logs</li>
                  <li>Certified board resolution draft</li>
                  <li>Active DIN/PAN registry filings</li>
                  <li>Digital signatures validation</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200/50">
                <h4 className="font-mono font-bold text-neutral-500 mb-2 uppercase tracking-wider text-[10px]">Tax Registrations</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
                  <li>PAN (Permanent Account No.)</li>
                  <li>TAN (Tax Deduction No.)</li>
                  <li>GST Identification setup</li>
                  <li>Provident Fund code activation</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200/50">
                <h4 className="font-mono font-bold text-neutral-500 mb-2 uppercase tracking-wider text-[10px]">Entity Setup Types</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
                  <li>Private Limited (Pvt Ltd)</li>
                  <li>Limited Liability Partnership (LLP)</li>
                  <li>Statutory Branch Secretariat</li>
                  <li>Representative Liaison</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-neutral-200/50">
                <h4 className="font-mono font-bold text-neutral-500 mb-2 uppercase tracking-wider text-[10px]">SLA &amp; Guarantees</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-neutral-600">
                  <li>Name reservation &lt; 48h</li>
                  <li>Draft constitution approval &lt; 5d</li>
                  <li>Statutory filing verification</li>
                  <li>Errors and omission indemnity</li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Interactive Phase Selector Section & Timeline checklist */}
      <section className="py-16 border-t border-neutral-100 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: General Info and Detail Panel reflecting Active Phase */}
        <div className="lg:col-span-4 lg:pr-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-[#005eb5] font-mono text-[10px] font-bold uppercase tracking-wider">
              <Milestone className="w-4 h-4" /> Live Lifecycle Navigator
            </div>
            <h2 className="font-serif text-2xl text-primary font-bold mb-4">Formation Ledger</h2>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
              A deterministic, four-phase protocol designed to eliminate regulatory friction. Select any milestone block on the right to load localized legal checkpoints and action lists.
            </p>
          </div>
          
          {/* Active Detail Showcase Panel */}
          <motion.div 
            key={activePhase}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-[#f9f9ff] border-2 border-dashed border-[#005eb5]/20 rounded-xl mt-6 font-sans relative"
          >
            <div className="absolute top-4 right-4 bg-[#005eb5] text-white text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold">
              Active Stage Focus
            </div>
            <p className="font-mono text-[10px] text-neutral-400 font-bold uppercase mb-1">
              Checkpoints ({phases[activePhase - 1].num})
            </p>
            <h4 className="font-serif text-lg font-bold text-primary mb-3">
              {phases[activePhase - 1].title}
            </h4>
            
            <div className="space-y-3 mt-4">
              {phases[activePhase - 1].checklist.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs text-neutral-600">
                  <span className="p-0.5 bg-emerald-150 text-emerald-650 rounded-full mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-100 text-emerald-600" />
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-neutral-200/50 my-4"></div>
            <div className="flex justify-between font-mono text-[9px] text-neutral-400 font-semibold uppercase">
              <span>Average TAT:</span>
              <strong className="text-primary">{phases[activePhase - 1].timeEstimate}</strong>
            </div>
          </motion.div>
        </div>

        {/* Right Side Phase Buttons */}
        <div className="lg:col-span-8 flex flex-col gap-4 justify-center">
          {phases.map((phase, i) => {
            const phaseNum = i + 1;
            const isSelected = activePhase === phaseNum;
            return (
              <motion.div
                whileHover={{ x: 6 }}
                key={phase.num}
                onClick={() => setActivePhase(phaseNum)}
                className={`border p-6 rounded-xl cursor-pointer transition-all duration-300 relative ${
                  isSelected 
                    ? 'bg-white border-[#005eb5] shadow-md pl-8 border-l-4' 
                    : 'bg-white border-neutral-200/70 hover:border-neutral-300 pl-6'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${isSelected ? 'text-[#005eb5] font-bold' : 'text-neutral-400'}`}>
                    {phase.num}
                  </span>
                  
                  <div className="flex gap-2 items-center">
                    <span className="font-mono text-[9px] text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {phase.timeEstimate}
                    </span>
                    {isSelected && (
                      <span className="font-mono text-[9px] bg-[#005eb5]/10 text-[#005eb5] px-2 py-0.5 rounded uppercase font-bold">
                        INDEXED FOCUS
                      </span>
                    )}
                  </div>
                </div>
                
                <h4 className="font-serif text-lg font-bold text-primary mb-2 flex items-center gap-2">
                  {phaseNum === 1 && <Sliders className="w-4 h-4 text-neutral-400" />}
                  {phaseNum === 2 && <FileText className="w-4 h-4 text-neutral-400" />}
                  {phaseNum === 3 && <Gavel className="w-4 h-4 text-neutral-400" />}
                  {phaseNum === 4 && <Building className="w-4 h-4 text-neutral-400" />}
                  {phase.title}
                </h4>
                
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {phase.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Regulatory Parameters Directory */}
      <section className="py-16 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-[#005eb5] font-semibold uppercase tracking-widest">Compliance Directory</p>
            <h2 className="font-serif text-2xl text-primary font-bold mt-1">Regulatory Parameters &amp; Constraints</h2>
          </div>
          <button 
            onClick={() => setShowFactSheet(true)}
            className="font-mono text-[10px] text-[#005eb5] hover:text-primary uppercase font-bold tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            Download Full Matrix <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Panels grid with Lucide icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
          
          {/* Card A: Directorship Rules */}
          <div className="bg-white border border-neutral-200/80 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
              <Gavel className="text-[#005eb5] w-4 h-4" />
              <h3 className="font-mono uppercase font-bold text-primary tracking-wider text-[11px]">Directorship Rules</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Minimum Directors</span>
                <span className="font-mono font-bold text-primary">02</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Resident Requirement</span>
                <span className="font-mono font-bold text-primary">01 (Min)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Foreign Directors</span>
                <span className="font-mono font-bold text-[#005eb5]">Permitted</span>
              </div>
            </div>
          </div>

          {/* Card B: Capital Structure */}
          <div className="bg-white border border-neutral-200/80 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
              <DollarSign className="text-[#005eb5] w-4 h-4" />
              <h3 className="font-mono uppercase font-bold text-primary tracking-wider text-[11px]">Capital Structure</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Min. Paid-up Capital</span>
                <span className="font-mono font-bold text-primary">None</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Authorized Capital</span>
                <span className="font-mono font-bold text-primary">Flexible</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">FDI Route</span>
                <span className="font-mono font-bold text-[#005eb5]">Automatic*</span>
              </div>
            </div>
          </div>

          {/* Card C: Statutory Filings */}
          <div className="bg-white border border-neutral-200/80 p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
              <ClipboardCheck className="text-[#005eb5] w-4 h-4" />
              <h3 className="font-mono uppercase font-bold text-primary tracking-wider text-[11px]">Statutory Filings</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Annual Return</span>
                <span className="font-mono font-bold text-primary">Form MGT-7</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-50">
                <span className="text-neutral-500">Financial Statements</span>
                <span className="font-mono font-bold text-primary">Form AOC-4</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Statutory Audit</span>
                <span className="font-mono font-bold text-primary">Mandatory</span>
              </div>
            </div>
          </div>

        </div>
        <p className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider mt-4">
          *AUTOMATIC FDI ROUTE RESTRICTIONS SUBJECT TO MINISTRY DECREE 8B LIMITATIONS.
        </p>
      </section>

      {/* Inquiry Drawer / Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[#05101e]/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-primary transition z-40 p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5 font-bold" />
            </button>
            <LeadInquiryForm 
              solutionId="subsidiary" 
              solutionTitle="Subsidiary Formation Setup" 
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
