import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ViewId, SolutionId } from './types';
import { getPath, parsePath, isValidPath } from './navigation';
import SeoHead from './seo/SeoHead';
import HomeView from './components/HomeView';
import GlobalSolutionsView from './components/GlobalSolutionsView';
import SubsidiaryFormationView from './components/SubsidiaryFormationView';
import CostCalculatorView from './components/CostCalculatorView';
import ServiceDetailView from './components/ServiceDetailView';
import AboutUsView from './components/AboutUsView';
import WhyFlorensView from './components/WhyFlorensView';
import ContactUsView from './components/ContactUsView';
import NotFoundView from './components/NotFoundView';
import ChatWidget from './components/ChatWidget';
import { CONTACT, CONTACT_ADDRESS_FULL } from './contact';
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
  Layers,
  Award,
  BookOpen,
  Info,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { view: currentView, solutionId: activeSolutionId } = parsePath(location.pathname);
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Handle generic close actions on navigation
  const handleNavClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
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
      <SeoHead view={currentView} solutionId={activeSolutionId} />

      <header className="fixed top-0 left-0 right-0 h-20 bg-white/85 backdrop-blur-md border-b border-neutral-200/50 z-50 flex items-center justify-between px-6 md:px-16 transition-all duration-300 shadow-sm" role="banner">
        
        {/* Brand Logo & Wordmark */}
        <Link 
          to={getPath('home')} 
          onClick={handleNavClick}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-container"
        >
          <img src="/florens-logo-navbar.png" alt="Florens Consulting Services" className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" width="220" height="56" />
        </Link>

        {/* Desktop Nav Actions */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-sans font-semibold text-neutral-600" aria-label="Main navigation">
          
          <Link 
            to={getPath('home')}
            onClick={handleNavClick}
            className={`hover:text-primary transition-colors h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'home' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Home
          </Link>

          <Link 
            to={getPath('global-solutions')}
            onClick={handleNavClick}
            className={`hover:text-primary transition-colors h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'global-solutions' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Global Architectures
          </Link>

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
                    <Link 
                      to={getPath('service-detail', 'eor')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Employer of Record (EOR)</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Hire internationally without establishing a local entity.</span>
                      </div>
                    </Link>

                    <Link 
                      to={getPath('service-detail', 'peo')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Professional Employer Org</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Co-employment HR, benefits, and localized payroll.</span>
                      </div>
                    </Link>

                    <Link 
                      to={getPath('service-detail', 'contractor')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Contractor Management</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Onboard freelancers globally with zero misclassification risk.</span>
                      </div>
                    </Link>

                    <Link 
                      to={getPath('subsidiary-formation')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Subsidiary Formation</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Establish a permanent, compliant physical entity.</span>
                      </div>
                    </Link>
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
                    <Link 
                      to={getPath('about-us')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">About Us</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Learn about our mission to simplify global expansion.</span>
                      </div>
                    </Link>

                    <Link 
                      to={getPath('why-florens')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Why Florens</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Uncompromising excellence and absolute certainty.</span>
                      </div>
                    </Link>

                    <Link 
                      to={getPath('contact-us')}
                      onClick={handleNavClick}
                      className="text-left p-4 hover:bg-[#f0f3ff] transition-colors rounded-2xl group flex flex-col items-start gap-3 cursor-pointer border border-transparent hover:border-[#005eb5]/10 col-span-2 block"
                    >
                      <div className="p-2.5 bg-neutral-50 rounded-xl text-secondary group-hover:bg-[#005eb5] group-hover:text-white transition-colors shadow-sm">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-sans font-bold text-primary transition-colors">Contact Us</span>
                        <span className="block text-[11px] text-neutral-500 font-sans mt-1.5 leading-relaxed">Initiate a consultation with our global advisory desk.</span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            to={getPath('cost-calculator')}
            onClick={handleNavClick}
            className={`hover:text-primary transition h-20 flex items-center border-b-2 cursor-pointer ${currentView === 'cost-calculator' ? 'border-[#005eb5] text-primary' : 'border-transparent'}`}
          >
            Cost Modeling
          </Link>
        </nav>

        {/* Right Nav Action Trigger */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col text-right font-mono text-[9px] text-neutral-400 leading-snug">
            <span>SYSTEM MONITOR</span>
            <span className="text-[#005eb5] font-bold uppercase tracking-wider">{activeViewLabel()}</span>
          </div>
          <Link 
            to={getPath('cost-calculator')}
            className="bg-primary text-white text-[11px] font-mono font-bold uppercase tracking-widest h-11 flex items-center px-6 hover:bg-[#20293a] transition-colors cursor-pointer rounded-lg shadow-sm"
          >
            Initiate Calculator
          </Link>
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
              <Link to={getPath('home')} onClick={handleNavClick} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer block">
                Home
              </Link>
              <Link to={getPath('global-solutions')} onClick={handleNavClick} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer block">
                Global Architectures
              </Link>
              <Link to={getPath('cost-calculator')} onClick={handleNavClick} className="text-left w-full hover:text-secondary transition py-2 cursor-pointer block">
                Cost Modeling
              </Link>
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">General Solutions Dropdown</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <Link 
                  to={getPath('service-detail', 'eor')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer block"
                >
                  <FileText className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Employer of Record (EOR)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Hire internationally without establishing an entity.</span>
                  </div>
                </Link>
                
                <Link 
                  to={getPath('service-detail', 'peo')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer block"
                >
                  <Users className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Professional Employer Org (PEO)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Co-employment HR & localized payroll.</span>
                  </div>
                </Link>

                <Link 
                  to={getPath('service-detail', 'contractor')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer block"
                >
                  <Layers className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Contractor Management</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Onboard freelancers safely globally.</span>
                  </div>
                </Link>

                <Link 
                  to={getPath('subsidiary-formation')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-[#f0f3ff] rounded-lg text-left flex gap-3 transition border border-[#005eb5]/10 cursor-pointer md:col-span-2 block"
                >
                  <Building className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#005eb5] font-bold">Subsidiary Formation (India)</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Physical local entity establishment.</span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">Company Directory</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <Link 
                  to={getPath('about-us')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer block"
                >
                  <Info className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">About Us</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Our mission and vision.</span>
                  </div>
                </Link>
                
                <Link 
                  to={getPath('why-florens')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer block"
                >
                  <HelpCircle className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Why Florens</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Uncompromising excellence.</span>
                  </div>
                </Link>

                <Link 
                  to={getPath('contact-us')}
                  onClick={handleNavClick}
                  className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-left flex gap-3 transition cursor-pointer sm:col-span-2 block"
                >
                  <PhoneCall className="text-[#005eb5] w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-primary">Contact Us</strong>
                    <span className="block text-neutral-500 text-[10px] mt-0.5">Initiate a consultation.</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20" role="main" id="main-content">
        {currentView === 'home' && (
          <HomeView />
        )}

        {currentView === 'global-solutions' && (
          <GlobalSolutionsView />
        )}

        {currentView === 'subsidiary-formation' && (
          <SubsidiaryFormationView />
        )}

        {currentView === 'cost-calculator' && (
          <CostCalculatorView />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailView solutionId={activeSolutionId} />
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

        {currentView === 'not-found' && (
          <NotFoundView />
        )}
      </main>

      {/* Elegant Editorial Institutional Footer */}
      <footer className="border-t border-white/10 bg-[#02050b] text-white py-16 px-6 md:px-16 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          
          {/* Brand Left Columns */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/florens-logo-footer.png" alt="Florens Consulting Services Pvt. Ltd." className="h-14 w-auto object-contain opacity-95" width="220" height="56" loading="lazy" />
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
                <li><Link to="/" className="hover:text-white transition-colors">Corporate Home</Link></li>
                <li><Link to="/global-solutions" className="hover:text-white transition-colors">Global Solutions</Link></li>
                <li><Link to="/subsidiary-formation" className="hover:text-white transition-colors">Subsidiary Formation (India)</Link></li>
                <li><Link to="/cost-calculator" className="hover:text-white transition-colors">EOR Cost Modeling</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-4">Division Services</h4>
              <ul className="space-y-3 font-semibold text-neutral-300">
                <li><Link to="/services/eor" className="hover:text-[#5c9efe] transition-colors">Employer of Record</Link></li>
                <li><Link to="/services/peo" className="hover:text-[#5c9efe] transition-colors">International PEO &amp; HR</Link></li>
                <li><Link to="/services/contractor" className="hover:text-[#5c9efe] transition-colors">Independent Contractors</Link></li>
                <li><Link to="/about-us" className="hover:text-[#5c9efe] transition-colors">About Us</Link></li>
                <li><Link to="/why-florens" className="hover:text-[#5c9efe] transition-colors">Why Florens</Link></li>
                <li><Link to="/contact-us" className="hover:text-[#5c9efe] transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Right column */}
          <div className="md:col-span-3 flex flex-col gap-3 font-sans text-xs text-neutral-400">
            <h4 className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">Contact</h4>
            <p className="text-neutral-400 leading-relaxed">{CONTACT_ADDRESS_FULL}</p>
            <a href={`mailto:${CONTACT.email}`} className="text-[#5c9efe] hover:text-white transition-colors font-semibold">
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phoneTel}`} className="text-neutral-300 hover:text-white transition-colors font-semibold">
              Phone: {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#4ade80] transition-colors font-semibold"
            >
              WhatsApp: +91 {CONTACT.whatsappDisplay}
            </a>
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

      <ChatWidget />
    </div>
  );
}
