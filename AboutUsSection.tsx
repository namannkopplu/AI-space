import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Scale,
  Zap,
  Globe2
} from 'lucide-react';
import { useAIApp } from '../context/AIAppContext';

export const AboutUsSection: React.FC = () => {
  const { openRegisterModal, scrollToSection } = useAIApp();

  return (
    <section id="about" className="py-12 bg-[#050b18] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Background</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold border-l-2 border-blue-500 pl-3 text-white">
            About AI space
          </h2>
          <p className="text-xs text-blue-400 font-medium mt-1 pl-3">
            &ldquo;Find AI, Trust AI. Be relevent.&rdquo;
          </p>
          <p className="text-xs text-slate-400 mt-2 pl-3 max-w-3xl leading-relaxed">
            Founded in <strong className="text-slate-200">2026</strong>, AI space was built on a simple principle:
            in an overwhelming sea of synthetic hype and clones, users need a clean, verified directory to discover authentic AI models, compare performance metrics side-by-side, and read genuine community reviews.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">Strictly Vetted Tools</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We never populate our catalog with fake clones. Every AI tool (ChatGPT, Claude, NotebookLM, Gemini, Leonardo, Meta AI, Grok, Perplexity, Agri AI, Climate.ai) links directly to official endpoints.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">3-Way Objective Comparison</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Side-by-side benchmarking of transparent pricing models, capabilities, exact free-tier quotas, and known trade-offs without marketing hype.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col gap-2">
            <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm">Innovation Registry</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Empowering top AI startups and engineering teams to launch and register new AI creations, making them discoverable and comparable to global users.
            </p>
          </div>

        </div>

        {/* Official Contact & Foundation Box */}
        <div id="contact" className="rounded-lg bg-slate-900/50 border border-white/10 p-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1 mb-1">
                <Globe2 className="w-3.5 h-3.5" /> Communications
              </span>
              <h3 className="text-lg font-bold text-white">
                Contact AI space Headquarters
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect with our editorial and verification team for model submissions, enterprise partnerships, or directory inquiries.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded bg-slate-950/60 border border-white/5">
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Phone</p>
                  <a href="tel:9876543210" className="text-xs font-bold text-white hover:text-blue-400 transition-colors">
                    9876543210
                  </a>
                </div>

                <div className="p-2.5 rounded bg-slate-950/60 border border-white/5">
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Email</p>
                  <a href="mailto:AIspace283@gmail.com" className="text-xs font-bold text-white hover:text-blue-400 transition-colors truncate block">
                    AIspace283@gmail.com
                  </a>
                </div>

                <div className="p-2.5 rounded bg-slate-950/60 border border-white/5">
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Founded</p>
                  <p className="text-xs font-bold text-white">2026</p>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="p-4 rounded bg-slate-950/60 border border-white/5 flex flex-col justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">Register an AI Solution</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Join our curated registry to get your AI tool analyzed, benchmarked, and discovered by researchers and businesses worldwide.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={openRegisterModal}
                  className="flex-1 py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Register Innovation</span>
                </button>
                <button
                  onClick={() => scrollToSection('explore')}
                  className="py-1.5 px-3 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-white/5 transition-colors"
                >
                  Explore AI
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
