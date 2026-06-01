import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import LeadInquiryForm from './LeadInquiryForm';

export default function ContactUsView() {
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
            <span className="text-[#005eb5] font-bold">Contact Us</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Initiate Consultation
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed"
          >
            Connect with our global advisors to map out your compliant expansion strategy.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Get in Touch</h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Our institutional desk is available 24/5 to assist with your operational queries and structuring needs.
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5] shrink-0 mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Corporate Headquarters</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  123 Financial District<br />
                  Suite 4500<br />
                  New York, NY 10004
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5] shrink-0 mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Email Connect</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  inquiries@florens.com<br />
                  support@florens.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#005eb5]/10 rounded-xl text-[#005eb5] shrink-0 mt-1">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Direct Line</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  +1 (800) 555-FLRN<br />
                  Mon-Fri 9AM-6PM EST
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200/50">
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Send an Inquiry</h3>
            <LeadInquiryForm solutionId="eor" />
          </div>

        </div>
      </section>
    </div>
  );
}
