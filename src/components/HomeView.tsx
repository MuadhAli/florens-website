import React, { useState, useEffect } from 'react';
import { ViewId, SolutionId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Building, 
  Wallet, 
  Shield, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Activity, 
  ChevronLeft,
  Briefcase,
  Layers,
  Sparkles,
  Percent
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewId, solutionId?: SolutionId) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 2 : 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel Section */}
      <section 
        className="relative h-[85vh] min-h-[550px] w-full overflow-hidden bg-gradient-to-br from-[#020813] via-[#05101e] to-[#0a1b32] pt-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fine background grid overlay on Hero */}
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        
        {/* Slide 1 */}
        <AnimatePresence mode="wait">
          {currentSlide === 1 && (
            <motion.div 
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  alt="Architectural corporate structure" 
                  className="w-full h-full object-cover opacity-15 grayscale" 
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020813] via-[#020813]/85 to-transparent"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto text-white">
                <div className="max-w-2xl">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5c9efe] animate-pulse"></span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5c9efe] font-bold border-l-2 border-[#005eb5] pl-3">
                      Foreign Enterprise Deployment
                    </p>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] font-bold text-neutral-50 tracking-tight"
                  >
                    Risk-free EOR.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-150 to-[#5c9efe]">Absolute Compliance.</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-sans text-sm md:text-base text-neutral-300 mb-10 max-w-lg leading-relaxed"
                  >
                    Deploy your global workforce with the institutional authority of a digital ledger. We abstract the legal complexities into a single, seamless, and compliant index.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button
                      onClick={() => onNavigate('global-solutions')}
                      className="bg-[#005eb5] text-white h-12 px-8 flex items-center justify-center text-xs font-mono font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#005eb5]/20 hover:scale-[1.02] active:scale-95 text-center"
                    >
                      Expand Globally
                    </button>
                    <button
                      onClick={() => onNavigate('cost-calculator')}
                      className="border border-white/30 text-white h-12 px-8 flex items-center justify-center text-xs font-mono font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 cursor-pointer hover:border-white/60 text-center"
                    >
                      EOR Calculator
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Slide 2 */}
          {currentSlide === 2 && (
            <motion.div 
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0 z-0 bg-[#02050b]">
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#1e293b 1.5px, transparent 1.5px)', 
                    backgroundSize: '24px 24px', 
                    opacity: 0.4 
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#020813] via-[#020813]/90 to-transparent"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto text-white">
                <div className="max-w-2xl font-sans">
                  <motion.div 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5c9efe] animate-pulse"></span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5c9efe] font-bold border-l-2 border-[#005eb5] pl-3">
                      Domestic SME Operations
                    </p>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] font-bold text-neutral-50 tracking-tight"
                  >
                    Precision Payroll.<br />
                    <span className="text-[#5c9efe]">Flawless Execution.</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-sans text-sm md:text-base text-neutral-300 mb-10 max-w-lg leading-relaxed"
                  >
                    Consolidate domestic payroll and HR compliance into a mathematically precise platform designed for professional financial controllers and enterprise boards.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex gap-4"
                  >
                    <button
                      onClick={() => onNavigate('service-detail', 'peo')}
                      className="bg-[#005eb5] text-white h-12 px-8 flex items-center justify-center text-xs font-mono font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95 text-center"
                    >
                      Streamline Operations
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-10 right-6 md:right-16 z-20 flex gap-3 items-center">
          <button 
            onClick={() => setCurrentSlide(currentSlide === 1 ? 2 : 1)}
            aria-label="Previous slide"
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            aria-label="View slide 1 marker" 
            className={`w-10 h-1 transition-all duration-300 ${currentSlide === 1 ? 'bg-[#005eb5] w-16' : 'bg-neutral-600'} cursor-pointer`} 
            onClick={() => setCurrentSlide(1)}
          ></button>
          <button 
            aria-label="View slide 2 marker" 
            className={`w-10 h-1 transition-all duration-300 ${currentSlide === 2 ? 'bg-[#005eb5] w-16' : 'bg-neutral-600'} cursor-pointer`} 
            onClick={() => setCurrentSlide(2)}
          ></button>

          <button 
            onClick={() => setCurrentSlide(currentSlide === 1 ? 2 : 1)}
            aria-label="Next slide"
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3 Separate Metrics Cards Overlapping the Hero */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-16 -mt-20 mb-16 flex flex-col sm:flex-row gap-5 items-start">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#02050b]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-full sm:w-64"
        >
          <p className="font-mono text-neutral-400 text-[9px] tracking-wider uppercase mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#5c9efe]" /> Active Entities
          </p>
          <p className="font-serif text-4xl font-bold text-white">1,402</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[#02050b]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-full sm:w-64"
        >
          <p className="font-mono text-neutral-400 text-[9px] tracking-wider uppercase mb-2">Jurisdictions</p>
          <p className="font-serif text-4xl font-bold text-white">150+</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-[#02050b]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-full sm:w-64"
        >
          <p className="font-mono text-neutral-400 text-[9px] tracking-wider uppercase mb-2">Compliance Rate</p>
          <p className="font-serif text-4xl font-bold text-emerald-400">99.9%</p>
        </motion.div>
      </div>

      {/* Trust & Authority Marquee */}
      <section className="border-y border-neutral-200/50 bg-white py-12 overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-6 mb-4">
          <p className="font-mono text-[9px] text-neutral-400 text-center uppercase tracking-widest font-semibold">
            Institutional Custody & Trust Entrusted By Industry Leaders
          </p>
        </div>
        <div className="flex w-max marquee-content opacity-40 hover:opacity-75 transition-opacity duration-300">
          <div className="flex justify-around items-center px-4 gap-12 font-serif text-base font-bold text-primary italic tracking-wider whitespace-nowrap">
            <span>Microsoft India Global</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Globex Enterprise Services</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Stripe APAC Solutions</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Intel Tech Ventures</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Initech Corporate Holding</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Veer Capital Advisors</span>
            <span className="text-[#005eb5]/70">★</span>
          </div>
          <div className="flex justify-around items-center px-4 gap-12 font-serif text-base font-bold text-primary italic tracking-wider whitespace-nowrap pr-12">
            <span>Microsoft India Global</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Globex Enterprise Services</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Stripe APAC Solutions</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Intel Tech Ventures</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Initech Corporate Holding</span>
            <span className="text-[#005eb5]/70">★</span>
            <span>Veer Capital Advisors</span>
            <span className="text-[#005eb5]/70">★</span>
          </div>
        </div>
      </section>

      {/* Service Matrix Grid (Asymmetric) */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-grid-pattern relative">
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 px-2.5 bg-[#005eb5]/10 text-[#005eb5] text-[10px] font-mono font-bold rounded">THE INDEX</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Structural Integrity for Scaling Organizations.
          </h2>
          <p className="text-neutral-500 text-xs mt-3 leading-relaxed font-sans">
            Whether establishing a physical footprint or taking over global co-employment liabilities, Florens deploys optimized regional legal schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Card 1: Large International PEO & EOR */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: "0 14px 30px -15px rgba(0, 50, 150, 0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-8 bg-white border-2 border-[#c5c6cc]/60 p-10 hover:bg-[#fafbff] flex flex-col justify-between min-h-[380px] rounded-3xl shadow-sm transition-colors duration-300"
          >
            <div>
              <div className="text-secondary mb-6 flex">
                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                  <Globe className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-primary font-bold mb-4">International PEO &amp; EOR</h3>
              <p className="font-sans text-sm text-neutral-600 max-w-xl leading-relaxed">
                Immediate compliance across 150+ jurisdictions. We assume the full civil and legal co-employment liability burden, enabling you to onboard talent structurally independent of domestic company filings.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100/70">
              <button 
                onClick={() => onNavigate('global-solutions')}
                className="font-mono text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all duration-300 cursor-pointer"
              >
                View Global Solutions 
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Small Subsidiary Formation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: "0 14px 30px -15px rgba(0, 50, 150, 0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="md:col-span-4 bg-white border-2 border-[#c5c6cc]/60 p-8 hover:bg-[#fafbff] flex flex-col justify-between min-h-[380px] rounded-3xl shadow-sm transition-colors duration-300"
          >
            <div>
              <div className="text-secondary mb-6 flex">
                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary mr-2">
                  <Building className="w-7 h-7" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase">India Hub</span>
                </div>
              </div>
              <h3 className="font-serif text-xl text-primary font-bold mb-3">Subsidiary Formation</h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                Architectural groundwork for permanent board establishments in India and beyond. Turnkey corporate registrations, tax setup, and compliant resident director delegation.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100">
              <button 
                onClick={() => onNavigate('subsidiary-formation')}
                className="font-mono text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-pointer"
              >
                Explore Footprint Setup 
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Small Card Bottom Left (Corporate Accounting) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: "0 14px 30px -15px rgba(0, 50, 150, 0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-5 bg-white border-2 border-[#c5c6cc]/60 p-8 hover:bg-[#fafbff] flex flex-col justify-between min-h-[320px] rounded-3xl shadow-sm transition-colors duration-300"
          >
            <div>
              <div className="text-secondary mb-5 flex">
                <div className="p-2.5 bg-secondary/10 rounded-2xl text-secondary">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-primary font-bold mb-3">Corporate Accounting</h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed mb-6">
                Rigorous statutory general ledger management adhering completely to localized tax codes and corporate regulatory declarations.
              </p>
            </div>
            <div>
              <div className="w-full h-px bg-neutral-100 mb-3"></div>
              <p className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> GAAP / IFRS COMPLIANT
              </p>
            </div>
          </motion.div>

          {/* Card 4: Medium Card Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, boxShadow: "0 14px 30px -15px rgba(0, 50, 150, 0.12)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="md:col-span-7 bg-white border-2 border-[#c5c6cc]/60 p-8 hover:bg-[#fafbff] flex flex-col justify-between min-h-[320px] relative overflow-hidden rounded-3xl shadow-sm transition-colors duration-300"
          >
            <div className="relative z-10">
              <div className="text-secondary mb-5 flex">
                <div className="p-2.5 bg-secondary/10 rounded-2xl text-secondary">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-primary font-bold mb-3">Domestic Compliance</h3>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-md">
                Protect your domestic entity with reliable, error-free domestic compliance structures. High-precision monthly state filings, tax declarations, and payroll audits customized to evolving legislation.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <button 
                onClick={() => onNavigate('service-detail', 'contractor')}
                className="font-mono text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition duration-300 cursor-pointer"
              >
                Independent Contractors 
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Parallax Feature Section */}
      <section 
        className="relative py-40 px-6 md:px-16 flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-[#05101e]/85 backdrop-blur-[2px]"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#5c9efe]"></span>
              <span className="font-mono text-xs text-[#5c9efe] font-bold uppercase tracking-[0.2em]">
                Global Scale, Local Precision
              </span>
              <span className="h-px w-8 bg-[#5c9efe]"></span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
              Unlocking borders with zero physical footprint.
            </h2>
            
            <p className="font-sans text-lg md:text-xl text-neutral-300 mb-12 max-w-3xl leading-relaxed">
              Our infrastructure allows you to compliantly employ elite tier talent across 150+ countries. Bypass the burden of incorporating foreign entities or managing localized regulatory risk entirely.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                <Globe className="w-8 h-8 text-[#5c9efe] mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-white">150+ Countries</h4>
                <p className="text-sm text-neutral-400">Immediate access to global talent pools.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                <Shield className="w-8 h-8 text-[#5c9efe] mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-white">100% Compliant</h4>
                <p className="text-sm text-neutral-400">Full statutory liability coverage.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:bg-white/10 transition-colors">
                <Sparkles className="w-8 h-8 text-[#5c9efe] mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-white">Zero Setup</h4>
                <p className="text-sm text-neutral-400">No local entity or banking required.</p>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('global-solutions')}
              className="group bg-[#005eb5] text-white h-14 px-10 flex items-center justify-center text-sm font-mono font-bold uppercase tracking-widest hover:bg-[#004b93] transition-all duration-300 cursor-pointer shadow-xl shadow-[#005eb5]/20 rounded-sm"
            >
              Discover the Framework
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-24 px-6 md:px-16 bg-white relative overflow-hidden border-t border-neutral-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="p-1 px-3 bg-[#005eb5]/10 text-[#005eb5] text-[10px] font-mono font-bold rounded uppercase tracking-widest">Endorsements</span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold mt-5 mb-4 tracking-tight">Trusted by Global Innovators</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-sans text-sm md:text-base leading-relaxed">
              Hear how Florens has streamlined international expansion and mitigated co-employment risks for leading enterprise organizations across 150+ countries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "VP of HR, TechFlow", quote: "Florens completely abstracted our international compliance burden. We hired our European engineering team in days instead of months, without a single local entity." },
              { name: "Michael Chang", role: "CFO, GlobalScape", quote: "The corporate accounting precision and localized benefits management are unmatched. Their platform is mathematically sound and essential to our daily operations." },
              { name: "Elena Rodriguez", role: "Director of Operations", quote: "Setting up our Indian subsidiary was incredibly seamless. Florens handled the complex ministerial filings, resident directors, and local tax structures flawlessly." }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0, 94, 181, 0.1)" }}
                className="bg-[#f9f9ff] p-8 md:p-10 rounded-3xl border border-neutral-200/60 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Globe className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6 text-[#5c9efe] text-lg">
                    {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <p className="font-sans text-sm text-neutral-600 leading-relaxed italic mb-8">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#005eb5] flex items-center justify-center text-white font-bold font-serif text-lg shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary">{testimonial.name}</h4>
                      <span className="text-[10px] text-[#005eb5] font-mono font-bold uppercase tracking-wider">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Interactive Framework Showcase */}
      <section className="bg-neutral-900 text-white py-24 px-6 md:px-16 overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-[9px] text-[#5c9efe] font-bold uppercase tracking-widest mb-3 inline-block border-b-2 border-[#005eb5] pb-1">
              DECISION ENGINE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              EOR vs. Subsidiary Setup: At a Glance
            </h2>
            <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed mb-8">
              Confused between co-employment liability delegation or incorporating directly? Our compliance algorithms advise key operational filters:
            </p>
            
            <div className="space-y-4 font-sans text-xs">
              <div className="flex gap-4 p-4 rounded bg-white/5 border border-white/10 hover:border-white/20 transition">
                <div className="text-[#5c9efe] font-mono text-sm font-bold">01</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Onboarding Speed &amp; SLA</h4>
                  <p className="text-neutral-400 leading-relaxed">EOR activates compliant personnel in &lt; 48 hours, while direct entities require weeks of ministerial filing indices.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 rounded bg-white/5 border border-white/10 hover:border-white/20 transition">
                <div className="text-[#5c9efe] font-mono text-sm font-bold">02</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Statutory Liabilities &amp; Board Responsibility</h4>
                  <p className="text-neutral-400 leading-relaxed">Under Subsidiary structures, resident directors carry full regulatory and criminal co-liability for tax audits.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#020813] border border-white/10 p-8 rounded-3xl shadow-2xl relative font-sans">
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Operational Audit Filter</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            
            <div className="space-y-4 text-xs font-mono">
              <div className="bg-white/5 p-4 rounded border border-white/5">
                <div className="text-[#5c9efe] font-bold uppercase mb-1 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5" /> STATUTORY TAX SAVINGS
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">EOR avoids corporate income tax liabilities under local Permanent Establishment definitions in over 90 operations.</p>
              </div>

              <div className="bg-white/5 p-4 rounded border border-white/5">
                <div className="text-[#5c9efe] font-bold uppercase mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> HUMAN CAPITAL RETENTION
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">Local supplemental benefits tiers match elite domestic conglomerate offerings perfectly, reducing churn to zero.</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => onNavigate('cost-calculator')}
                className="bg-[#005eb5] text-white font-mono text-xs font-bold uppercase px-6 py-3 tracking-widest hover:bg-opacity-90 transition w-full cursor-pointer text-center"
              >
                Launch Decision Matrix
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
