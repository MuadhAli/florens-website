import React from 'react';
import { motion } from 'motion/react';
import { Building, Globe, ChevronRight } from 'lucide-react';

export default function AboutUsView() {
  return (
    <div className="w-full flex flex-col pb-24 bg-[#f9f9ff]">
      {/* Hero Section with Breadcrumb */}
      <section className="relative bg-[#02050b] text-white pt-32 pb-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#005eb5]/20 via-[#02050b] to-[#02050b]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-6"
          >
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#005eb5] font-bold">About Us</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Global Compliance &amp; Setup
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed"
          >
            We configure human capital architecture, secure intellectual property routing, and ensure statutory alignment across disparate jurisdictions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-neutral-600 leading-relaxed mb-4 text-lg">
              To empower businesses to build world-class global teams by simplifying international employment and ensuring total compliance.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-10">
              Florens was established to simplify the complex terrain of global expansion. We are committed to offering institutional-grade architectures that provide seamless employer of record solutions, contractor management, and subsidiary setups.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Vision</h2>
            <p className="text-neutral-600 leading-relaxed text-lg mb-4">
              To create a world where talent has no borders and every business can thrive in any market, regardless of geography.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              By combining profound local knowledge with an uncompromising dedication to compliance, we empower enterprises to traverse international borders effortlessly and confidently, redefining the future of work.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 h-full">
            <h3 className="text-2xl font-bold text-primary mb-6">How We Facilitate Expansion</h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              As an Employer of Record (EOR), we act as a strategic partner to simplify international growth by handling the complex administrative and legal requirements of global employment.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005eb5] mt-2 shrink-0"></span>
                <span className="text-neutral-600 text-sm"><strong>Compliance & Risk Mitigation:</strong> Ensuring adherence to local labor laws, tax regulations, and reducing risk of non-compliance penalties.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005eb5] mt-2 shrink-0"></span>
                <span className="text-neutral-600 text-sm"><strong>Employment Contracts:</strong> Drafting and managing contracts that are fully compliant with the laws of the host country.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005eb5] mt-2 shrink-0"></span>
                <span className="text-neutral-600 text-sm"><strong>Payroll & Benefits:</strong> Unified handling of payroll processing, tax filings, and the administration of localized benefits.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005eb5] mt-2 shrink-0"></span>
                <span className="text-neutral-600 text-sm"><strong>Speed to Market:</strong> Enabling businesses to enter new markets and hire talent in days or weeks, bypassing long entity setups.</span>
              </li>
            </ul>

            <div className="flex gap-4 mb-4 items-center pt-6 border-t border-neutral-100">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Worldwide Reach</h3>
            </div>
            <p className="text-neutral-600 mb-8 leading-relaxed text-sm">Our robust network covers over 150 jurisdictions, allowing you to access global talent and test new markets.</p>
            
            <div className="flex gap-4 mb-4 items-center">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Local Infrastructure</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed text-sm">A meticulously developed local presence ensures an absolute adherence to statutory laws and seamless scaling.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
