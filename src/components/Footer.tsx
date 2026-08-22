import React from 'react';
import {
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  Scale,
  Sparkles,
  Layers,
  ArrowUp,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useAIApp } from '../context/AIAppContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, scrollToSection, openRegisterModal } = useAIApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { label: 'Education (ChatGPT, Claude, NotebookLM)', cat: 'Education' },
    { label: 'Agriculture (Agri AI, Climate.ai)', cat: 'Agriculture' },
    { label: 'Image Generator (LEO AI, Google Gemini)', cat: 'Image Generator' },
    { label: 'Video Generation (Meta AI, Google Gemini)', cat: 'Video Generation' },
    { label: 'Chat Bot (Grok AI, Perplexity AI)', cat: 'Chat Bot' },
  ];

  return (
    <footer id="footer-section" className="bg-[#030712] border-t border-white/5 text-slate-400 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & About Us */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                AI
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight">
                  AI space
                </span>
                <p className="text-[10px] text-blue-400 font-medium">
                  Find AI, Trust AI. Be relevent.
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Founded in <strong className="text-slate-200">2026</strong>. AI space is the official verified platform dedicated to eliminating fake AI hype, providing transparent 3-way AI comparisons, authentic user reviews, and an innovation launchpad.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-blue-400">
                <Calendar className="w-3 h-3" /> Founded: 2026
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-green-400">
                <ShieldCheck className="w-3 h-3" /> 100% Vetted Catalog
              </span>
            </div>
          </div>

          {/* Col 3: Verified Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Vetted Categories
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              {categories.map((c) => (
                <li key={c.cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.cat);
                      scrollToSection('explore');
                    }}
                    className="hover:text-blue-400 transition-colors text-left text-slate-400 leading-snug"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button
                  onClick={() => scrollToSection('explore')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Layers className="w-3 h-3 text-slate-500" />
                  <span>AI Explore Catalog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('compare')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Scale className="w-3 h-3 text-slate-500" />
                  <span>Compare 3 AIs at Once</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('recommender')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Sparkles className="w-3 h-3 text-slate-500" />
                  <span>AI Smart Recommender</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  <span>Customer Reviews</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openRegisterModal}
                  className="hover:text-blue-300 transition-colors flex items-center gap-1.5 text-blue-400 font-semibold"
                >
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span>Register Innovation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Contact Info */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">
              Contact AI space
            </h4>
            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-900/60 border border-white/5 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500 block">Phone</span>
                <a
                  href="tel:9876543210"
                  className="text-white font-medium hover:text-blue-400 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <Phone className="w-3 h-3 text-blue-400" />
                  <span>9876543210</span>
                </a>
              </div>

              <div className="p-2 rounded bg-slate-900/60 border border-white/5 space-y-0.5">
                <span className="text-[10px] uppercase text-slate-500 block">Official Email</span>
                <a
                  href="mailto:AIspace283@gmail.com"
                  className="text-white font-medium hover:text-blue-400 transition-colors flex items-center gap-1.5 text-xs truncate"
                >
                  <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>AIspace283@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-500">
            <span>© 2026 <strong className="text-slate-400">AI space</strong></span>
            <span>•</span>
            <span className="text-blue-400">Find AI, Trust AI. Be relevent.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-slate-200 transition-colors text-slate-400"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-slate-200 transition-colors text-slate-400"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-slate-900 border border-white/10 hover:border-blue-500/40 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
