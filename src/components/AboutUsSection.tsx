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
  Globe2,
  ArrowRight
} from 'lucide-react';
import { useAIApp } from '../context/AIAppContext';

export const AboutUsSection: React.FC = () => {
  const { openRegisterModal, scrollToSection } = useAIApp();

  return (
    <section id="about" className="py-20 bg-[#f6f5f3] border-t border-[rgba(17,17,17,0.08)] relative text-[#111111]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Amplemarket Typographic Restraint */}
        <div className="mb-12 pb-6 border-b border-[rgba(17,17,17,0.08)]">
          <div className="flex items-center gap-2 text-[#e8400d] text-xs font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e8400d]" />
            <span>Platform Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#111111] tracking-[-0.04em] leading-[1.1]">
            About AI space
          </h2>
          <p className="text-sm font-medium text-[#e8400d] mt-1.5 tracking-tight">
            &ldquo;Find AI, Trust AI. Be relevent.&rdquo;
          </p>
          <p className="text-sm text-[#6d6c6b] mt-2 max-w-3xl leading-relaxed font-normal">
            Founded in <strong className="text-[#111111] font-semibold">2026</strong>, AI space was built on an uncompromising principle:
            in an overwhelming sea of synthetic hype and clones, users need a clean, verified directory to discover authentic AI models, compare performance metrics side-by-side, and read genuine community reviews.
          </p>
        </div>

        {/* 3 Pillar Cards — 12px Radius Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          
          <div className="p-6 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] flex flex-col gap-3.5 shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px]">
            <div className="w-10 h-10 rounded-[8px] bg-[#b7efb2] text-[#111111] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-xl font-normal text-[#111111] tracking-tight">Strictly Vetted Tools</h3>
            <p className="text-xs text-[#6d6c6b] leading-relaxed">
              We never populate our catalog with fake clones. Every AI tool (ChatGPT, Claude, NotebookLM, Gemini, Leonardo, Meta AI, Grok, Perplexity, Agri AI, Climate.ai) links directly to official endpoints.
            </p>
          </div>

          <div className="p-6 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] flex flex-col gap-3.5 shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px]">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffd7f0] text-[#111111] flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-xl font-normal text-[#111111] tracking-tight">Objective Comparison</h3>
            <p className="text-xs text-[#6d6c6b] leading-relaxed">
              Side-by-side benchmarking of transparent pricing models, capabilities, exact free-tier quotas, and known trade-offs without marketing hype.
            </p>
          </div>

          <div className="p-6 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] flex flex-col gap-3.5 shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px]">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffef99] text-[#111111] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#111111]" />
            </div>
            <h3 className="text-xl font-normal text-[#111111] tracking-tight">Innovation Registry</h3>
            <p className="text-xs text-[#6d6c6b] leading-relaxed">
              Empowering top AI startups and engineering teams to launch and register new AI creations, making them discoverable and comparable to global users.
            </p>
          </div>

        </div>

        {/* Official Contact & Foundation Box — Charcoal #272625 Frame */}
        <div id="contact" className="rounded-[12px] bg-[#272625] text-[#ffffff] p-8 sm:p-10 shadow-[rgba(17,17,17,0.12)_0px_20px_50px_-10px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ffd7f0] flex items-center gap-1.5 mb-2">
                <Globe2 className="w-3.5 h-3.5 text-[#ffd7f0]" /> Communications
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#ffffff] tracking-tight">
                Contact AI space Headquarters
              </h3>
              <p className="text-xs text-[#b1b1af] mt-2 leading-relaxed">
                Connect with our editorial and verification team for model submissions, enterprise partnerships, or directory inquiries.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)]">
                  <p className="text-[10px] text-[#b1b1af] font-mono uppercase">Phone</p>
                  <a href="tel:9876543210" className="text-xs font-medium text-[#ffffff] hover:text-[#ffd7f0] transition-colors mt-1 block font-mono">
                    9876543210
                  </a>
                </div>

                <div className="p-4 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)]">
                  <p className="text-[10px] text-[#b1b1af] font-mono uppercase">Email</p>
                  <a href="mailto:AIspace283@gmail.com" className="text-xs font-medium text-[#ffffff] hover:text-[#ffd7f0] transition-colors truncate block mt-1 font-mono">
                    AIspace283@gmail.com
                  </a>
                </div>

                <div className="p-4 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)]">
                  <p className="text-[10px] text-[#b1b1af] font-mono uppercase">Founded</p>
                  <p className="text-xs font-medium text-[#ffffff] mt-1 font-mono">2026</p>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="p-6 sm:p-7 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.1)] flex flex-col justify-between gap-5">
              <div>
                <h4 className="text-xl font-normal text-[#ffffff] tracking-tight">Register an AI Solution</h4>
                <p className="text-xs text-[#b1b1af] mt-1.5 leading-relaxed">
                  Join our curated registry to get your AI tool analyzed, benchmarked, and discovered by researchers and businesses worldwide.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openRegisterModal}
                  className="flex-1 py-2.5 px-4 rounded-[8px] bg-[#ffffff] hover:bg-[#ecebea] text-[#111111] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Register Innovation</span>
                </button>
                <button
                  onClick={() => scrollToSection('explore')}
                  className="py-2.5 px-5 rounded-[8px] bg-transparent text-[#ffffff] hover:bg-[rgba(255,255,255,0.1)] text-xs font-normal border border-[rgba(255,255,255,0.2)] transition-colors"
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
