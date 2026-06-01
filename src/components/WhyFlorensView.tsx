import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronRight, Zap, Target } from 'lucide-react';

export default function WhyFlorensView() {
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
            <span className="text-[#005eb5] font-bold">Why Florens</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Uncompromising Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed"
          >
            A partner you can trust. We provide absolute certainty and risk mitigation for your global expansion efforts.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 hover:border-[#005eb5]/30 transition-colors">
            <div className="w-12 h-12 bg-[#005eb5]/10 rounded-xl flex items-center justify-center text-[#005eb5] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Impeccable Compliance</h3>
            <p className="text-neutral-600 leading-relaxed text-sm">
              We monitor every regulatory change and enforce uncompromising compliance standards across all jurisdictions to safeguard your enterprise operations.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 hover:border-[#005eb5]/30 transition-colors">
            <div className="w-12 h-12 bg-[#005eb5]/10 rounded-xl flex items-center justify-center text-[#005eb5] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Agile Execution</h3>
            <p className="text-neutral-600 leading-relaxed text-sm">
              Deploy your workforce quickly. Our seamless digital onboarding systems cut deployment time from months to mere days without sacrificing diligence.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 hover:border-[#005eb5]/30 transition-colors">
            <div className="w-12 h-12 bg-[#005eb5]/10 rounded-xl flex items-center justify-center text-[#005eb5] mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Strategic Partnership</h3>
            <p className="text-neutral-600 leading-relaxed text-sm">
              We do not just execute transactions; we provide continuous advisory services to align your human capital strategy with your long-term vision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
