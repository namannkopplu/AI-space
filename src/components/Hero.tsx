import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Search,
  Scale,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Activity,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    scrollToSection,
    openRegisterModal
  } = useAIApp();

  const quickSearchTags = [
    { label: 'ChatGPT', cat: 'Education' },
    { label: 'Claude', cat: 'Education' },
    { label: 'NotebookLM', cat: 'Education' },
    { label: 'Agri AI', cat: 'Agriculture' },
    { label: 'Climate.ai', cat: 'Agriculture' },
    { label: 'LEO AI', cat: 'Image Generator' },
    { label: 'Google Gemini', cat: 'Image Generator' },
    { label: 'Meta AI', cat: 'Video Generation' },
    { label: 'Grok AI', cat: 'Chat Bot' },
    { label: 'Perplexity AI', cat: 'Chat Bot' },
  ];

  return (
    <section
      id="home"
      className="relative pt-16 pb-24 overflow-hidden bg-[#ffffff] text-[#111111]"
    >
      {/* Amplemarket Phoenix Orange Atmospheric Backdrop Wash */}
      <div 
        className="absolute top-0 left-0 right-0 h-[480px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(120% 100% at 50% -10%, rgb(232, 64, 13) 0%, rgb(255, 238, 216) 45%, rgb(208, 178, 255) 80%, rgba(255, 255, 255, 0) 100%)'
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* White Pill Badge with Phoenix Orange Mark */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[rgba(17,17,17,0.08)] shadow-[rgba(17,17,17,0.04)_0px_2px_6px_0px] text-[#111111] text-xs font-normal">
            <span className="w-2 h-2 rounded-full bg-[#e8400d]" />
            <span className="font-normal text-[#111111]">
              Founded 2026 • Verified AI Intelligence Directory
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle — Amplemarket 84px / 56px Typographic Restraint & Poster Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black uppercase text-[#111111] tracking-[-0.04em] leading-[0.92] mb-5">
            AI <span className="text-[#e8400d]">SPACE</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6d6c6b] max-w-2xl mx-auto leading-relaxed font-normal tracking-[-0.01em]">
            Find trusted and verified AI. Explore, compare, and test authentic AI innovations across Education, Agriculture, Imagery, and Autonomous Agents.
          </p>
        </div>

        {/* Inline Capture / Search Input — White background, 1px border, 12px radius, Ink button */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center bg-[#ffffff] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus-within:border-[#111111] rounded-[12px] p-1.5 transition-all shadow-[rgba(17,17,17,0.04)_0px_4px_12px_0px]">
            <Search className="w-4 h-4 text-[#6d6c6b] ml-3.5 shrink-0" />
            <input
              id="hero-main-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog (ChatGPT, Claude, Agri AI, Gemini...)"
              className="w-full bg-transparent text-sm text-[#111111] placeholder-[#6d6c6b] px-3 py-2.5 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 rounded-[8px] text-[#6d6c6b] hover:text-[#111111] text-xs mr-1 transition-colors"
              >
                Clear
              </button>
            )}
            {/* Primary Action Button: Ink #111111 fill, 8px radius */}
            <button
              id="hero-search-explore-btn"
              onClick={() => scrollToSection('explore')}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal rounded-[8px] text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-none active:scale-98"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Suggestions Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-[#6d6c6b]">
            <span className="flex items-center gap-1 text-[#6d6c6b] mr-1 text-[11px] font-mono">
              <TrendingUp className="w-3 h-3 text-[#e8400d]" /> Index:
            </span>
            {quickSearchTags.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setSearchQuery(item.label);
                  scrollToSection('explore');
                }}
                className="px-3 py-1 rounded-full bg-[#f6f5f3] hover:bg-[#ecebea] border border-[rgba(17,17,17,0.06)] text-[#111111] text-[11px] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amplemarket Dark Media Frame Showcase (Charcoal #272625 with 12px radius) */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="bg-[#272625] text-[#ffffff] rounded-[12px] p-6 sm:p-8 shadow-[rgba(17,17,17,0.12)_0px_26px_60px_-6px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-[rgba(255,255,255,0.1)] gap-4">
              <div>
                <div className="text-[#ffd7f0] text-xs uppercase tracking-wider font-mono flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#ffd7f0]" />
                  <span>Verified Model Index • 2026 Audit Complete</span>
                </div>
                <div className="text-3xl sm:text-4xl font-normal text-[#ffffff] tracking-[-0.03em] mt-1 flex items-baseline gap-3">
                  <span>99.82%</span>
                  <span className="text-xs font-normal text-[#b1b1af]">uptime across 15+ benchmarked systems</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono text-[#ffffff] bg-[#111111] border border-[rgba(255,255,255,0.15)]">
                  Live Status: Healthy
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-[#111111] bg-[#b7efb2]">
                  Zero Hallucination Flags
                </span>
              </div>
            </div>

            {/* Performance Arc */}
            <div className="py-6 border-b border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between text-xs text-[#b1b1af] mb-2 font-mono">
                <span>BENCHMARK TRAJECTORY (MMLU / GSM8K / REASONING)</span>
                <span className="text-[#ffef99]">VERIFIED COMPLIANCE</span>
              </div>
              <div className="relative h-14 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 60">
                  <defs>
                    <linearGradient id="ampleArc" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e8400d" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#ffef99" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#b7efb2" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 50 Q 60 45, 120 36 T 240 22 T 340 10 T 400 4"
                    fill="none"
                    stroke="url(#ampleArc)"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Compact Verified Rows on Dark Frame */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <div>
                  <div className="text-[#ffffff] font-normal">ChatGPT Plus / 4o</div>
                  <div className="text-[11px] text-[#b1b1af]">Education & Logic</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[#ffffff]">$20.00</div>
                  <div className="text-[10px] text-[#b7efb2]">Verified</div>
                </div>
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <div>
                  <div className="text-[#ffffff] font-normal">Claude 3.5 Sonnet</div>
                  <div className="text-[11px] text-[#b1b1af]">Coding & Synthesis</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[#ffffff]">$20.00</div>
                  <div className="text-[10px] text-[#b7efb2]">Verified</div>
                </div>
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#111111] border border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <div>
                  <div className="text-[#ffffff] font-normal">Agri AI Precision</div>
                  <div className="text-[11px] text-[#b1b1af]">Field & Crop AI</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[#ffffff]">Free / Tiered</div>
                  <div className="text-[10px] text-[#ffef99]">Demo Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amplemarket Pastel Category Showcase Tiles (4 Pillars, Flat Fills, 12px Radius) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1200px] mx-auto text-left">
          
          {/* Tile 1: Petal Pink #ffd7f0 (Compare) */}
          <button
            onClick={() => scrollToSection('compare')}
            className="p-5 rounded-[12px] bg-[#ffd7f0] text-[#111111] transition-transform hover:-translate-y-0.5 text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-[8px] bg-[#111111] text-[#ffffff] flex items-center justify-center mb-3">
                <Scale className="w-4 h-4 text-[#ffffff]" />
              </div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#111111] opacity-75 mb-1">
                Head-to-Head
              </div>
              <h3 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">
                Side-by-Side Compare
              </h3>
            </div>
            <p className="text-xs text-[#111111] opacity-80 mt-2 leading-relaxed">
              Compare 2 or 3 models head-to-head across pricing, limits, and domain specialties.
            </p>
          </button>

          {/* Tile 2: Mint Green #b7efb2 (Education & Taxonomy) */}
          <button
            onClick={() => scrollToSection('explore')}
            className="p-5 rounded-[12px] bg-[#b7efb2] text-[#111111] transition-transform hover:-translate-y-0.5 text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-[8px] bg-[#111111] text-[#ffffff] flex items-center justify-center mb-3">
                <Layers className="w-4 h-4 text-[#ffffff]" />
              </div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#111111] opacity-75 mb-1">
                Curated Taxonomy
              </div>
              <h3 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">
                Domain Categories
              </h3>
            </div>
            <p className="text-xs text-[#111111] opacity-80 mt-2 leading-relaxed">
              Vetted entries spanning Education, Agriculture, Imagery, Video, and Chat Bots.
            </p>
          </button>

          {/* Tile 3: Canary Yellow #ffef99 (Reviews) */}
          <button
            onClick={() => scrollToSection('reviews')}
            className="p-5 rounded-[12px] bg-[#ffef99] text-[#111111] transition-transform hover:-translate-y-0.5 text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-[8px] bg-[#111111] text-[#ffffff] flex items-center justify-center mb-3">
                <Award className="w-4 h-4 text-[#ffffff]" />
              </div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#111111] opacity-75 mb-1">
                Authentic Quotes
              </div>
              <h3 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">
                User Reviews
              </h3>
            </div>
            <p className="text-xs text-[#111111] opacity-80 mt-2 leading-relaxed">
              Real researchers and students sharing unvarnished evaluations of model performance.
            </p>
          </button>

          {/* Tile 4: Soft Violet #e2ddfd (Register) */}
          <button
            onClick={openRegisterModal}
            className="p-5 rounded-[12px] bg-[#e2ddfd] text-[#111111] transition-transform hover:-translate-y-0.5 text-left flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-[8px] bg-[#111111] text-[#ffffff] flex items-center justify-center mb-3">
                <Zap className="w-4 h-4 text-[#ffffff]" />
              </div>
              <div className="text-[11px] uppercase tracking-wider font-mono text-[#111111] opacity-75 mb-1">
                Launchpad
              </div>
              <h3 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">
                Register Innovation
              </h3>
            </div>
            <p className="text-xs text-[#111111] opacity-80 mt-2 leading-relaxed">
              Submit your model to the global 2026 directory. Gain institutional visibility and demos.
            </p>
          </button>

        </div>
      </div>
    </section>
  );
};
