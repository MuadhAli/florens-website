import React from 'react';
import { motion } from 'motion/react';
import { Building, Globe, ChevronRight, Target, Sparkles } from 'lucide-react';

export default function AboutUsView() {
  return (
    <div className="w-full flex flex-col pb-24 bg-[#f9f9ff]">
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
            About Florens
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-3xl font-sans leading-relaxed"
          >
            A multidisciplinary business consulting firm helping organizations expand, optimize, and succeed in today&apos;s dynamic global marketplace.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-neutral-200/50 mb-12">
          <p className="text-neutral-600 leading-relaxed text-lg mb-6">
            Florens Consulting Services Pvt. Ltd. is a multidisciplinary business consulting firm dedicated to helping organizations expand, optimize, and succeed in today&apos;s dynamic global marketplace. We specialize in delivering strategic solutions across business advisory, market entry support, workforce solutions, trade facilitation, international partnerships, and operational excellence.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-6">
            With a strong network of industry experts, financial professionals, legal advisors, and global business partners, Florens serves as a trusted growth partner for businesses seeking sustainable expansion and long-term value creation. Our approach combines deep industry knowledge, practical execution, and a commitment to delivering measurable results.
          </p>
          <p className="text-neutral-600 leading-relaxed mb-6">
            At Florens, we believe that every business has unique opportunities waiting to be unlocked. Whether supporting startups, SMEs, multinational corporations, or investors, our team works closely with clients to identify opportunities, overcome challenges, and build scalable growth strategies.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Driven by integrity, innovation, and excellence, we strive to bridge markets, connect businesses, and create meaningful partnerships that foster economic growth and business success across borders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary">Our Mission</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To empower businesses with strategic guidance, innovative solutions, and global connectivity that drive sustainable growth and lasting success.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary">Our Vision</h2>
            </div>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To become a leading international consulting and business solutions partner, recognized for creating value, enabling opportunities, and transforming business potential into measurable achievements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">What We Deliver</h2>
            <ul className="space-y-4">
              {[
                'Business advisory and strategic consulting',
                'Market entry support and expansion planning',
                'Workforce solutions and global employment',
                'Trade facilitation and international partnerships',
                'Operational excellence and compliance guidance',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#005eb5] mt-2 shrink-0"></span>
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 h-full">
            <h3 className="text-2xl font-bold text-primary mb-6">Who We Serve</h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              From startups and SMEs to multinational corporations and investors, Florens partners with organizations at every stage of growth to unlock opportunity and build lasting value.
            </p>

            <div className="flex gap-4 mb-4 items-center pt-6 border-t border-neutral-100">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Global Perspective</h3>
            </div>
            <p className="text-neutral-600 mb-8 leading-relaxed text-sm">
              We help businesses navigate diverse markets while ensuring compliance with local regulations and business practices.
            </p>

            <div className="flex gap-4 mb-4 items-center">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Trusted Network</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed text-sm">
              Our clients benefit from access to experienced professionals across legal, financial, investment, and business domains worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
