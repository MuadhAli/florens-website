import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  ChevronRight,
  Users,
  Globe,
  Network,
  Award,
  Handshake,
} from 'lucide-react';

const REASONS = [
  {
    icon: Users,
    title: 'Client-Centric Approach',
    desc: 'We take the time to understand your business, challenges, and objectives before crafting tailored solutions.',
  },
  {
    icon: ShieldCheck,
    title: 'Industry Expertise',
    desc: 'Our team combines practical experience with strategic insight across business consulting, market expansion, compliance, and workforce solutions.',
  },
  {
    icon: Handshake,
    title: 'End-to-End Support',
    desc: 'From planning and market entry to execution and ongoing advisory, we stand by our clients at every stage of their journey.',
  },
  {
    icon: Globe,
    title: 'Global Perspective, Local Understanding',
    desc: 'We help businesses navigate diverse markets while ensuring compliance with local regulations and business practices.',
  },
  {
    icon: Network,
    title: 'Trusted Network of Advisors',
    desc: 'Our clients benefit from access to experienced professionals across legal, financial, investment, and business domains.',
  },
  {
    icon: Award,
    title: 'Commitment to Excellence',
    desc: 'We focus on delivering measurable results, sustainable growth, and long-term value for every client we serve.',
  },
];

export default function WhyFlorensView() {
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
            <span className="text-[#005eb5] font-bold">Why Florens</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Why Florens?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-3xl font-sans leading-relaxed"
          >
            Every business deserves a trusted partner who can simplify complexity, unlock opportunities, and accelerate growth.
          </motion.p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <p className="text-neutral-600 leading-relaxed text-lg max-w-4xl mb-12">
          At Florens Consulting Services Pvt. Ltd., we believe that every business deserves a trusted partner who can simplify complexity, unlock opportunities, and accelerate growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {REASONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50 hover:border-[#005eb5]/30 transition-colors"
            >
              <div className="w-12 h-12 bg-[#005eb5]/10 rounded-xl flex items-center justify-center text-[#005eb5] mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#02050b] text-white p-8 md:p-10 rounded-3xl">
          <p className="text-neutral-300 leading-relaxed text-lg">
            At Florens, we do more than provide consulting services—we build partnerships that empower businesses to grow with confidence, expand without boundaries, and succeed in an ever-evolving global marketplace.
          </p>
        </div>
      </section>
    </div>
  );
}
