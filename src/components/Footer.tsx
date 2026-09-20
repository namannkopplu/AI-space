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
    <footer id="footer-section" className="bg-[#111111] border-t border-[rgba(255,255,255,0.08)] text-[#b1b1af] text-xs">
      {/* Main Footer Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & About Us */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#ffffff] text-[#111111] flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <span className="text-xl font-normal text-[#ffffff] tracking-tight block">
                  AI space
                </span>
                <p className="text-[11px] font-medium text-[#ffd7f0]">
                  Find AI, Trust AI. Be relevent.
                </p>
              </div>
            </div>

            <p className="text-[#b1b1af] leading-relaxed text-xs max-w-sm font-normal">
              Founded in <strong className="text-[#ffffff] font-medium">2026</strong>. AI space is the official verified platform dedicated to eliminating fake AI hype, providing transparent 3-way AI comparisons, authentic user reviews, and an innovation launchpad.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#272625] text-[#ffffff] font-mono text-[10px] border border-[rgba(255,255,255,0.08)]">
                <Calendar className="w-3 h-3 text-[#e8400d]" /> Founded: 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#272625] text-[#ffffff] font-mono text-[10px] border border-[rgba(255,255,255,0.08)]">
                <ShieldCheck className="w-3 h-3 text-[#b7efb2]" /> 100% Vetted Catalog
              </span>
            </div>
          </div>

          {/* Col 3: Verified Categories */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs text-[#ffffff] uppercase tracking-wider">
              Vetted Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.map((c) => (
                <li key={c.cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.cat);
                      scrollToSection('explore');
                    }}
                    className="hover:text-[#ffffff] text-[#b1b1af] transition-colors text-left leading-snug"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs text-[#ffffff] uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('explore')}
                  className="hover:text-[#ffffff] transition-colors flex items-center gap-2 text-[#b1b1af]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#b1b1af]" />
                  <span>AI Explore Catalog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('compare')}
                  className="hover:text-[#ffffff] transition-colors flex items-center gap-2 text-[#b1b1af]"
                >
                  <Scale className="w-3.5 h-3.5 text-[#b1b1af]" />
                  <span>Compare Models Head-to-Head</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('recommend')}
                  className="hover:text-[#ffffff] transition-colors flex items-center gap-2 text-[#b1b1af]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#b1b1af]" />
                  <span>AI Smart Match</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="hover:text-[#ffffff] transition-colors flex items-center gap-2 text-[#b1b1af]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b1b1af]" />
                  <span>Customer Reviews</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openRegisterModal}
                  className="hover:text-[#ffd7f0] transition-colors flex items-center gap-2 text-[#ffffff] font-medium"
                >
                  <Zap className="w-3.5 h-3.5 text-[#e8400d]" />
                  <span>Register Innovation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Contact Info */}
          <div className="space-y-3.5">
            <h4 className="font-mono text-xs text-[#ffffff] uppercase tracking-wider">
              Contact AI space
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-[8px] bg-[#272625] border border-[rgba(255,255,255,0.08)] space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#b1b1af] block">Phone</span>
                <a
                  href="tel:9876543210"
                  className="text-[#ffffff] font-medium hover:text-[#ffd7f0] transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e8400d]" />
                  <span>9876543210</span>
                </a>
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#272625] border border-[rgba(255,255,255,0.08)] space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#b1b1af] block">Official Email</span>
                <a
                  href="mailto:AIspace283@gmail.com"
                  className="text-[#ffffff] font-medium hover:text-[#ffd7f0] transition-colors flex items-center gap-1.5 text-xs truncate font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e8400d] shrink-0" />
                  <span>AIspace283@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#b1b1af] text-[11px]">
            <span>© 2026 <strong className="text-[#ffffff]">AI space</strong></span>
            <span>•</span>
            <span className="text-[#ffd7f0] italic">Find AI, Trust AI. Be relevent.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#ffffff] transition-colors text-[#b1b1af]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#ffffff] transition-colors text-[#b1b1af]"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="px-3.5 py-1.5 rounded-[8px] bg-[#272625] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] text-[#ffffff] flex items-center gap-1.5 transition-colors text-xs"
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
