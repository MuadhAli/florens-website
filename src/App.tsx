import React, { useState, useEffect, useRef } from 'react';
import { ViewId, SolutionId } from './types';
import HomeView from './components/HomeView';
import GlobalSolutionsView from './components/GlobalSolutionsView';
import SubsidiaryFormationView from './components/SubsidiaryFormationView';
import CostCalculatorView from './components/CostCalculatorView';
import ServiceDetailView from './components/ServiceDetailView';
import AboutUsView from './components/AboutUsView';
import WhyFlorensView from './components/WhyFlorensView';
import ContactUsView from './components/ContactUsView';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Building, 
  ChevronDown, 
  Menu, 
  X, 
  Users, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Terminal, 
  Layers,
  Award,
  BookOpen,
  Info,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewId>('home');
  const [activeSolutionId, setActiveSolutionId] = useState<SolutionId>('eor');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Quick navigation helper
  const handleNavigate = (view: ViewId, solutionId?: SolutionId) => {
    setCurrentView(view);
    if (solutionId) {
      setActiveSolutionId(solutionId);
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeViewLabel = () => {
    switch (currentView) {
      case 'home': return 'Home Ledger';
      case 'global-solutions': return 'Architecture';
      case 'subsidiary-formation': return 'Footprint Setup';
      case 'cost-calculator': return 'Modeling';
      case 'service-detail':
        if (activeSolutionId === 'eor') return 'EOR Protocol';
        if (activeSolutionId === 'peo') return 'PEO Framework';
        if (activeSolutionId === 'contractor') return 'Contractors';
        return 'Details';
      case 'about-us': return 'About Us';
      case 'why-florens': return 'Why Florens';
      case 'contact-us': return 'Contact Us';
      default: return 'Florens';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] font-sans flex flex-col justify-between selection:bg-[#005eb5]/10 selection:text-[#005eb5]">
      
      {/* Top Corporate Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/85 backdrop-blur-md border-b border-neutral-200/50 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-300 shadow-sm">
        
        {/* Brand Logo & Wordmark */}
        <div 
          onClick={() => handleNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-container"
        >
          <img src="/Florens Primary Logo - navbar.png" alt="Florens Logo" className="h-16 w-auto rounded-md object-contain transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col ml-1 hidden sm:flex">
            <span className="font-sans text-lg font-bold text-primary tracking-tight">Florens</span>
            <span className="font-sans text-[10px] text-[#005eb5] font-semibold uppercase tracking-wider">Consulting Services Private Limited</span>
          </div>
        </div>

        {/* Desktop Nav Actions */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-sans font-semibold text-neutral-600">
          
          <button 
            onClick={() => handleNavigate('home')}
            className={`hover:text-primary transition-colors h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'home' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Home
          </button>

          <button 
            onClick={() => handleNavigate('global-solutions')}
            className={`hover:text-primary transition-colors h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'global-solutions' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Global Architectures
          </button>

          {/* Solution Dropdown Wrapper */}
          <div 
            className="relative h-20 flex items-center" 
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className={`hover:text-primary transition-all h-20 flex items-center gap-1.5 cursor-pointer ${
                (currentView === 'service-detail' || currentView === 'subsidiary-formation') 
                  ? 'text-primary border-b-2 border-[#005eb5]' 
                  : 'border-b-2 border-transparent'
              }`}
              id="solutions-dropdown-trigger"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180 text-[#005eb5]' : 'text-neutral-400'}`} />
            </button>

            {/* Dropdown Menu block */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 w-[600px] bg-white border border-neutral-200/50 shadow-2xl p-4 rounded-3xl z-50 overflow-hidden"
                  id="solutions-dropdown-menu"
                >
                  <div className="p-2 border-b border-neutral-100 mb-3 flex items-center justify-between">
                    <span className="font-sans text-[11px] text-neutral-400 uppercase tracking-widest font-bold">Our Global Services</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
                      onClick={() => handleNavigate('service-detail', 'eor')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Employer of Record (EOR)</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Hire internationally without establishing a local entity.</span>
                      </div>
                    </motion.button>

                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                      onClick={() => handleNavigate('service-detail', 'peo')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Professional Employer Org</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Co-employment HR, benefits, and localized payroll.</span>
                      </div>
                    </motion.button>

                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                      onClick={() => handleNavigate('service-detail', 'contractor')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Contractor Management</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Onboard freelancers globally with zero misclassification risk.</span>
                      </div>
                    </motion.button>

                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                      onClick={() => handleNavigate('subsidiary-formation')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Subsidiary Formation</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Establish a permanent, compliant physical entity.</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About Us Dropdown Wrapper */}
          <div 
            className="relative h-20 flex items-center" 
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button 
              className={`hover:text-primary transition-all h-20 flex items-center gap-1.5 cursor-pointer border-b-2 border-transparent`}
            >
              About Us
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180 text-[#005eb5]' : 'text-neutral-400'}`} />
            </button>

            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-20 left-0 w-[600px] bg-white border border-neutral-200/50 shadow-2xl p-4 rounded-3xl z-50 overflow-hidden"
                >
                  <div className="p-2 border-b border-neutral-100 mb-3 flex items-center justify-between">
                    <span className="font-sans text-[11px] text-neutral-400 uppercase tracking-widest font-bold">Discover Florens</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#005eb5]"></span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
                      onClick={() => handleNavigate('about-us')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">About Us</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Learn about our mission to simplify global expansion.</span>
                      </div>
                    </motion.button>

                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                      onClick={() => handleNavigate('why-florens')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Why Florens</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Uncompromising excellence and absolute certainty.</span>
                      </div>
                    </motion.button>

                    <motion.button 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                      onClick={() => handleNavigate('contact-us')}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 col-span-2"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Contact Us</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Initiate a consultation with our global advisory desk.</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => handleNavigate('cost-calculator')}
            className={`hover:text-primary transition h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'cost-calculator' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Cost Modeling
          </button>
        </nav>

        {/* Right Nav Action Trigger */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col text-right font-mono text-[9px] text-neutral-400 leading-snug">
            <span>SYSTEM MONITOR</span>
            <span className="text-[#005eb5] font-bold uppercase tracking-wider">{activeViewLabel()}</span>
          </div>
          <button 
            onClick={() => handleNavigate('cost-calculator')}
            className="bg-primary text-white text-[11px] font-mono font-bold uppercase tracking-widest h-11 px-6 hover:bg-[#20293a] transition-colors cursor-pointer rounded-lg shadow-sm"
          >
            Initiate Calculator
          </button>
        </div>

        {/* Mobile Mini Menu Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-primary hover:bg-neutral-100 transition rounded-lg"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-white z-40 p-6 flex flex-col gap-6 lg:hidden shadow-inner overflow-y-auto pb-32"
          >
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Main Directory</p>
              <div className="h-px bg-neutral-100 mt-1"></div>
            </div>
            
            <div className="flex flex-col gap-4 font-serif text-2xl font-bold text-primary text-sans">
              <button onClick={() => handleNavigate('home')} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer">
                Home
              </button>
              <button onClick={() => handleNavigate('global-solutions')} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer">
                Global Architectures
              </button>
              <button onClick={() => handleNavigate('cost-calculator')} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer">
                Cost Modeling
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">General Solutions Dropdown</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <button 
                  onClick={() => handleNavigate('service-detail', 'eor')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer"
                >
                  <FileText className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Employer of Record (EOR)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Hire internationally without establishing an entity.</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleNavigate('service-detail', 'peo')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer"
                >
                  <Users className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Professional Employer Org (PEO)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Co-employment HR & localized payroll.</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavigate('service-detail', 'contractor')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer"
                >
                  <Layers className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Contractor Management</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Onboard freelancers safely globally.</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavigate('subsidiary-formation')}
                  className="p-4 bg-neutral-50 hover:bg-[#f0f3ff] rounded-lg text-left flex gap-3 transition border border-[#005eb5]/10 cursor-pointer md:col-span-2"
                >
                  <Building className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#005eb5] font-bold">Subsidiary Formation (India)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Physical local entity establishment.</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Company Directory</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <button 
                  onClick={() => handleNavigate('about-us')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer"
                >
                  <Info className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">About Us</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Our mission and vision.</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleNavigate('why-florens')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer"
                >
                  <HelpCircle className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Why Florens</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Uncompromising excellence.</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavigate('contact-us')}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer sm:col-span-2"
                >
                  <PhoneCall className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Contact Us</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Initiate a consultation.</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Render router */}
      <main className="flex-grow pt-20">
        {currentView === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentView === 'global-solutions' && (
          <GlobalSolutionsView onNavigate={handleNavigate} />
        )}

        {currentView === 'subsidiary-formation' && (
          <SubsidiaryFormationView onNavigate={handleNavigate} />
        )}

        {currentView === 'cost-calculator' && (
          <CostCalculatorView onNavigate={handleNavigate} />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailView solutionId={activeSolutionId} onNavigate={handleNavigate} />
        )}

        {currentView === 'about-us' && (
          <AboutUsView />
        )}

        {currentView === 'why-florens' && (
          <WhyFlorensView />
        )}

        {currentView === 'contact-us' && (
          <ContactUsView />
        )}
      </main>

      {/* Elegant Editorial Institutional Footer */}
      <footer className="border-t border-white/10 bg-[#02050b] text-white py-16 px-6 md:px-16 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          
          {/* Brand Left Columns */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/Florens Primary Logo - footer.png" alt="Florens Logo" className="h-16 w-auto rounded object-contain opacity-90" />
            </div>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-sm">
              An institutional-grade global expansion platform. We configure human capital architecture, secure intellectual property routing, and ensure statutory alignment across disparate jurisdictions.
            </p>
          </div>

          {/* Directory middle Columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 font-sans text-xs">
            <div>
              <h4 className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-4">Core Directory</h4>
              <ul className="space-y-3 font-semibold text-neutral-300">
                <li><button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">Corporate Home</button></li>
                <li><button onClick={() => handleNavigate('global-solutions')} className="hover:text-white transition-colors cursor-pointer text-left">Global Solutions</button></li>
                <li><button onClick={() => handleNavigate('subsidiary-formation')} className="hover:text-white transition-colors cursor-pointer text-left">Subsidiary Formation (India)</button></li>
                <li><button onClick={() => handleNavigate('cost-calculator')} className="hover:text-white transition-colors cursor-pointer text-left">EOR Cost Modeling</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-4">Division Services</h4>
              <ul className="space-y-3 font-semibold text-neutral-300">
                <li><button onClick={() => handleNavigate('service-detail', 'eor')} className="hover:text-[#5c9efe] transition-colors cursor-pointer text-left">Employer of Record</button></li>
                <li><button onClick={() => handleNavigate('service-detail', 'peo')} className="hover:text-[#5c9efe] transition-colors cursor-pointer text-left">International PEO &amp; HR</button></li>
                <li><button onClick={() => handleNavigate('service-detail', 'contractor')} className="hover:text-[#5c9efe] transition-colors cursor-pointer text-left">Independent Contractors</button></li>
                <li><p className="text-neutral-500 select-none">Institutional Trust Desk</p></li>
              </ul>
            </div>
          </div>

          {/* Secure details Right columns */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-[9px] text-neutral-400">
            <h4 className="uppercase tracking-widest font-bold text-neutral-500 mb-1">Audit Ledger status</h4>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5 text-[#5c9efe]" /> LEDGER STAMP:</span>
              <strong className="text-white">FLR-2026.5</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SYSTEM ENCRYPTION:</span>
              <strong className="text-emerald-500 uppercase">SECURE STATUS</strong>
            </div>
            <div className="flex justify-between py-1.5 font-bold">
              <span>SLA GUARANTEE:</span>
              <span className="text-[#5c9efe]">99.9% ACCURACY</span>
            </div>
          </div>

        </div>

        {/* Legal copyright bar */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-baseline gap-4 font-mono text-[9px] text-neutral-500">
          <span>© 2026 FLORENS CONSULTING SERVICES PRIVATE LIMITED. ALL LEDGER INDICES PRESERVED.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF COMPLIANCE</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY BLUEPRINT</span>
          </div>
        </div>

      </footer>

    </div>
  );
}
