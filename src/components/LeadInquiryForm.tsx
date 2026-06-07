import React, { useState } from 'react';
import { SolutionId } from '../types';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  Send, 
  ArrowRight, 
  Building, 
  Globe, 
  User, 
  Mail, 
  MessageSquare,
  Users,
  Terminal,
  Clock,
  Check
} from 'lucide-react';

interface LeadInquiryFormProps {
  solutionId: SolutionId;
  solutionTitle: string;
  onClose?: () => void;
}

export default function LeadInquiryForm({ solutionId, solutionTitle, onClose }: LeadInquiryFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    country: 'India',
    headcount: '5',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ledgerIndex] = useState(() => `FLR-${Math.floor(Math.random() * 90000) + 10000}`);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          solutionTitle,
          ledgerIndex,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmitted(true);
      } else {
        setSubmitError(json.error || 'Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-md border border-neutral-200/80 p-8 rounded-xl shadow-lg text-center max-w-xl mx-auto my-4 transition-all duration-300 font-sans"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-sm animate-bounce">
          <CheckCircle className="w-6 h-6" />
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-primary mb-3">Transmission Secure</h3>
        
        <p className="text-neutral-600 mb-6 text-xs md:text-sm leading-relaxed">
          Your human capital parameters regarding <strong className="text-[#005eb5]">{solutionTitle}</strong> have been indexed into our central ledger. A Florens compliance architect will contact you directly within 4 hours.
        </p>

        <div className="bg-neutral-50 border border-neutral-200/60 p-5 rounded-lg text-left mb-6 font-mono text-[11px] text-neutral-700 space-y-2.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 bg-[#005eb5]/10 text-[#005eb5] text-[7.5px] font-bold uppercase tracking-widest rounded-bl">
            Secured ledger status
          </div>
          <div className="flex justify-between border-b border-neutral-100 pb-2 mb-1">
            <span className="text-neutral-400 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#005eb5]" /> SYSTEM LEDGER INDEX:
            </span>
            <strong className="text-[#005eb5]">{ledgerIndex}</strong>
          </div>
          <div><strong className="text-neutral-400">REQUESTER NAME:</strong> {formState.name}</div>
          <div><strong className="text-neutral-400">CORPORATE ENTITY:</strong> {formState.company}</div>
          <div><strong className="text-neutral-400">DISPATCH EMAIL:</strong> {formState.email}</div>
          <div><strong className="text-neutral-400">EXPANSION ZONE:</strong> {formState.country}</div>
          <div><strong className="text-neutral-400">SCALE METRIC:</strong> {formState.headcount} Compliant FTEs</div>
          {formState.notes && (
            <div className="mt-2 text-neutral-500 border-t border-dashed border-neutral-200 pt-2 font-sans italic">
              "{formState.notes}"
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-mono mb-6 uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#005eb5]" /> PROTOCOL SECURE • TAT EST: &lt; 4 HOURS
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormState({ name: '', email: '', company: '', country: 'India', headcount: '5', notes: '' });
            }}
            className="px-5 py-2.5 text-xs font-mono border border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50 uppercase tracking-widest text-neutral-700 transition rounded-lg cursor-pointer"
          >
            Inquire Again
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-mono bg-primary text-white hover:bg-[#1e293b] uppercase tracking-widest transition rounded-lg cursor-pointer"
            >
              Close Ledger
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-[#c5c6cc]/40 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-sans">
      <div className="border-b border-neutral-100 pb-4 mb-6 flex justify-between items-start">
        <div>
          <p className="font-mono text-[9px] text-[#005eb5] mb-1 uppercase tracking-widest font-bold">Inquiry Protocol Ledger</p>
          <h3 className="font-serif text-xl font-bold text-primary">Align with Our Compliance Architects</h3>
          <p className="text-neutral-500 text-[11px] mt-1 pr-6 leading-relaxed">Configure your scenario to generate localized corporate and tax setup guidelines.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-neutral-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#005eb5]" /> Full Name
            </label>
            <input
              required
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs text-primary transition font-semibold focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#005eb5]" /> Corporate Email
            </label>
            <input
              required
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="j.doe@company.com"
              className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs text-primary transition font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 col-span-1">
            <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-[#005eb5]" /> Company Name
            </label>
            <input
              required
              type="text"
              value={formState.company}
              onChange={(e) => setFormState({ ...formState, company: e.target.value })}
              placeholder="Globex Holding"
              className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs text-primary transition font-semibold focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#005eb5]" /> Target Jurisdiction
            </label>
            <select
              value={formState.country}
              onChange={(e) => setFormState({ ...formState, country: e.target.value })}
              className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs font-semibold text-primary transition focus:outline-none cursor-pointer"
            >
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
              <option value="India">India (Footprint Focus)</option>
              <option value="Brazil">Brazil</option>
              <option value="Singapore">Singapore</option>
              <option value="Other / Global">Other Global Hub</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#005eb5]" /> Headcount (FTEs)
            </label>
            <input
              type="number"
              min="1"
              max="500"
              value={formState.headcount}
              onChange={(e) => setFormState({ ...formState, headcount: e.target.value })}
              className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs font-bold text-primary transition focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono uppercase text-[9px] text-neutral-400 font-bold tracking-wider flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#005eb5]" /> Case Context / Structural Constraints
          </label>
          <textarea
            rows={3}
            value={formState.notes}
            onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
            placeholder="Specify directorship needs, targeted timelines, or supplemental employee benefits goals..."
            className="w-full bg-[#f9f9ff] border border-neutral-200 hover:border-neutral-300 focus:border-[#005eb5] focus:ring-1 focus:ring-[#005eb5]/15 p-3 rounded-lg text-xs text-primary transition font-medium focus:outline-none placeholder-neutral-400 resize-none"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[#005eb5] hover:bg-opacity-95 text-white py-3.5 font-mono font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 text-center rounded-lg hover:scale-[1.01]"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full mr-1"></span>
              Synchronizing Ledger Metrics...
            </>
          ) : (
            <>
              Initialize Integration Inquiry
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {submitError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-sans flex items-start gap-2">
            <span className="font-bold text-red-500 shrink-0">⚠</span>
            <span>{submitError}</span>
          </div>
        )}

      </form>
    </div>
  );
}
