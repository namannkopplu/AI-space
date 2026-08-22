import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Search,
  Scale,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';

export const Hero: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
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
      className="relative pt-10 pb-16 overflow-hidden bg-[#050b18]"
    >
      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Founded 2026 • Verified AI Intelligence Hub</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Find AI, Trust AI.{' '}
          <span className="text-blue-400">
            Be relevent.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong className="text-blue-300 font-semibold">AI space</strong>. Discover authentic, vetted AI tools across 
          Education, Agriculture, Image & Video Generation, and Chat Bots. Compare 3 AIs side-by-side with verified customer reviews.
        </p>

        {/* Minimalist Search Bar Component */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-xl shadow-lg p-1.5 focus-within:border-blue-500/50 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              id="hero-main-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for different AI (ChatGPT, Agri AI, LEO AI, Gemini...)"
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 px-3 py-2 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 hover:text-white text-xs mr-1"
              >
                Clear
              </button>
            ) : null}
            <button
              id="hero-search-explore-btn"
              onClick={() => scrollToSection('explore')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Explore AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Suggestions Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-400 mr-1 text-[11px]">
              <TrendingUp className="w-3 h-3 text-blue-400" /> Suggestions:
            </span>
            {quickSearchTags.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setSearchQuery(item.label);
                  scrollToSection('explore');
                }}
                className="px-2.5 py-1 rounded-md bg-slate-800/50 border border-white/5 text-slate-300 hover:text-blue-400 hover:border-blue-500/30 text-[11px] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto text-left">
          
          {/* Card 1: 3-Way Comparison */}
          <button
            onClick={() => scrollToSection('compare')}
            className="group p-4 rounded-lg bg-slate-900/50 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-sm">
                Compare 3 AIs at Once
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Side-by-side matrix of features, exact pricing, strengths, and work capabilities.
            </p>
          </button>

          {/* Card 2: 5 Vetted Categories */}
          <button
            onClick={() => scrollToSection('explore')}
            className="group p-4 rounded-lg bg-slate-900/50 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-sm">
                Domain Categories
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Strictly verified tools for Education, Agriculture, Image & Video Generation, and Chat Bots.
            </p>
          </button>

          {/* Card 3: Peer & Customer Reviews */}
          <button
            onClick={() => scrollToSection('reviews')}
            className="group p-4 rounded-lg bg-slate-900/50 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-sm">
                Customer Reviews
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Verified testimonials and user ratings with pros, cons, and honest feedback on every AI.
            </p>
          </button>

          {/* Card 4: Top Business Launch */}
          <button
            onClick={openRegisterModal}
            className="group p-4 rounded-lg bg-slate-900/50 border border-white/10 hover:border-blue-500/30 transition-all text-left flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-sm">
                Register Your AI
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Launch your innovation to global users. Get ranked, vetted, and compared.
            </p>
          </button>

        </div>
      </div>
    </section>
  );
};
