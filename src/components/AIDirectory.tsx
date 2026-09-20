import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  ExternalLink,
  Scale,
  Check,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Briefcase,
  Layers,
  MessageSquareQuote,
  Zap,
  Info,
  Calendar,
  Bookmark
} from 'lucide-react';
import { AITool } from '../types';
import { getCategoryPastel } from '../lib/taxonomy';

export const AIDirectory: React.FC = () => {
  const {
    tools,
    searchQuery,
    selectedCategory,
    openToolModal,
    addToCompare,
    removeFromCompare,
    isCompared,
    compareList,
    scrollToSection,
    openRegisterModal
  } = useAIApp();
  const { openBookingModal } = useBooking();
  const { isFavorite, toggleFavoriteTool } = useAuth();

  // Filter tools strictly based on user criteria
  const filteredTools = tools.filter((tool) => {
    // 1. Category Filter
    let matchesCategory = true;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Registered Innovation') {
      matchesCategory = tool.isCommunityRegistered === true || tool.category === 'Registered Innovation';
    } else {
      matchesCategory =
        tool.category === selectedCategory ||
        (tool.secondaryCategories && tool.secondaryCategories.includes(selectedCategory as any));
    }

    // 2. Search Query Filter
    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      matchesSearch =
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.companyName.toLowerCase().includes(q) ||
        tool.workItDoes.some((w) => w.toLowerCase().includes(q)) ||
        tool.strengths.some((s) => s.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="explore" className="py-20 bg-[#f6f5f3] min-h-[600px] text-[#111111]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Amplemarket Typographic Restraint (Weight 400 at 44-56px) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[rgba(17,17,17,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#e8400d] text-xs font-mono uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8400d]" />
              <span>Verified Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#111111] tracking-[-0.04em] leading-[1.1]">
              {selectedCategory === 'All' ? 'Curated Model Directory' : `${selectedCategory} Models`}
            </h2>
            <p className="text-sm text-[#6d6c6b] mt-2 font-normal max-w-xl">
              Authentic tools with official verified links, exact pricing, user ratings, and live demo booking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick compare summary */}
            {compareList.length > 0 && (
              <button
                onClick={() => scrollToSection('compare')}
                className="px-3.5 py-2 rounded-[8px] bg-[#ffd7f0] text-[#111111] text-xs font-medium hover:bg-[#ffc6ea] transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Selected ({compareList.length})</span>
              </button>
            )}

            <button
              onClick={() => openBookingModal(null)}
              className="px-3.5 py-2 rounded-[8px] bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-normal transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>Book Demo</span>
            </button>

            <button
              onClick={openRegisterModal}
              className="px-3.5 py-2 rounded-[8px] bg-[#111111] text-[#ffffff] hover:bg-[#272625] text-xs font-medium transition-colors flex items-center gap-1.5 shadow-none"
            >
              <Zap className="w-3.5 h-3.5 text-[#ffffff]" />
              <span>Register AI</span>
            </button>
          </div>
        </div>

        {/* Tools Grid — Amplemarket Light Feature Cards (12px radius, hairline border, 20px padding) */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => {
              const compared = isCompared(tool.id);
              const latestReview = tool.reviews && tool.reviews.length > 0 ? tool.reviews[0] : null;
              const bookmarked = isFavorite(tool.id);
              const pastel = getCategoryPastel(tool.category);

              return (
                <div
                  key={tool.id}
                  id={`ai-card-${tool.slug}`}
                  className="bg-[#ffffff] border border-[rgba(17,17,17,0.08)] hover:border-[rgba(17,17,17,0.2)] rounded-[12px] p-5 flex flex-col justify-between gap-4 transition-all shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px] relative hover:-translate-y-0.5"
                >
                  {/* Top Badge & Category — Pastel Taxonomy Fill */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span 
                          style={{ backgroundColor: pastel.bg, color: pastel.text }}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-[6px] tracking-tight"
                        >
                          {tool.category}
                        </span>
                        {tool.badge && (
                          <span className="text-[10px] bg-[#f6f5f3] text-[#6d6c6b] px-2 py-0.5 rounded-[6px] font-mono border border-[rgba(17,17,17,0.06)]">
                            {tool.badge}
                          </span>
                        )}
                        {tool.isCommunityRegistered && (
                          <span className="text-[10px] bg-[#ffd7f0] text-[#111111] px-2 py-0.5 rounded-[6px] font-mono">
                            Community
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleFavoriteTool(tool.id)}
                          className="text-[#b1b1af] hover:text-[#e8400d] transition-colors p-1"
                          title={bookmarked ? 'Remove bookmark' : 'Bookmark this AI'}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#e8400d] text-[#e8400d]' : ''}`} />
                        </button>

                        {/* Customer Rating */}
                        <button
                          onClick={() => openToolModal(tool)}
                          className="flex items-center gap-1 text-xs text-[#111111] hover:underline"
                          title="View user reviews"
                        >
                          <Star className="w-3.5 h-3.5 fill-[#e8400d] text-[#e8400d]" />
                          <span className="font-semibold text-[#111111] font-mono">{tool.rating}</span>
                          <span className="text-[11px] text-[#6d6c6b]">({tool.reviewCount})</span>
                        </button>
                      </div>
                    </div>

                    {/* AI Name & Creator */}
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">
                          {tool.name}
                        </h3>
                        <span className="text-xs text-[#6d6c6b] font-normal truncate">
                          {tool.companyName}
                        </span>
                      </div>
                      <p className="text-xs text-[#6d6c6b] mt-1.5 line-clamp-2 leading-relaxed">
                        {tool.tagline}
                      </p>
                    </div>

                    {/* Work It Does Highlights */}
                    <div className="mt-3.5 pt-3 border-t border-[rgba(17,17,17,0.06)]">
                      <ul className="space-y-1.5">
                        {tool.workItDoes.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="text-xs text-[#6d6c6b] flex items-start gap-2">
                            <span className="text-[#e8400d] mt-0.5">•</span>
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Summary */}
                    <div className="mt-3.5 flex items-center justify-between py-2 px-3 rounded-[8px] bg-[#f6f5f3] text-xs font-mono">
                      <span className="text-[#6d6c6b]">{tool.pricing.model}</span>
                      <span className="text-[#111111] font-medium truncate max-w-[170px]">
                        {tool.pricing.startingPrice || tool.pricing.freeTier}
                      </span>
                    </div>

                    {/* Latest Review Snippet */}
                    {latestReview && (
                      <div className="mt-3 pt-2.5 border-t border-[rgba(17,17,17,0.06)] text-[11px] text-[#6d6c6b]">
                        <p className="italic text-[#111111] line-clamp-1">
                          &ldquo;{latestReview.comment}&rdquo;
                        </p>
                        <span className="text-[#6d6c6b] block mt-0.5 text-[10px]">
                          — {latestReview.author}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions Bottom — 8px Border Radius */}
                  <div className="mt-2 pt-3 border-t border-[rgba(17,17,17,0.06)] flex flex-wrap items-center gap-2">
                    
                    {/* Primary Action Button: Explore */}
                    <a
                      id={`open-link-${tool.slug}`}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#111111] hover:bg-[#272625] text-[#ffffff] text-xs font-normal py-2 px-3 rounded-[8px] transition-colors flex items-center justify-center gap-1.5 min-w-[85px]"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3 text-[#ffffff]" />
                    </a>

                    {/* Book Demo Button */}
                    <button
                      id={`book-demo-${tool.slug}`}
                      onClick={() => openBookingModal(tool)}
                      className="bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs py-2 px-3 rounded-[8px] transition-colors flex items-center gap-1"
                      title="Schedule live walkthrough"
                    >
                      <Calendar className="w-3 h-3 text-[#e8400d]" />
                      <span>Demo</span>
                    </button>

                    {/* View Details / Reviews Modal */}
                    <button
                      id={`details-btn-${tool.slug}`}
                      onClick={() => openToolModal(tool)}
                      className="bg-[#f6f5f3] hover:bg-[#ecebea] text-[#111111] text-xs py-2 px-2.5 rounded-[8px] border border-[rgba(17,17,17,0.08)] transition-colors"
                    >
                      Audit
                    </button>

                    {/* Add / Remove from Compare Slot */}
                    <button
                      id={`compare-toggle-${tool.slug}`}
                      onClick={() => {
                        if (compared) {
                          removeFromCompare(tool.id);
                        } else {
                          const added = addToCompare(tool);
                          if (!added && compareList.length >= 3) {
                            scrollToSection('compare');
                          }
                        }
                      }}
                      className={`text-xs py-2 px-2.5 rounded-[8px] border transition-colors flex items-center gap-1 ${
                        compared
                          ? 'bg-[#ffd7f0] text-[#111111] border-[#ffd7f0] font-medium'
                          : 'bg-transparent text-[#6d6c6b] hover:text-[#111111] border-[rgba(17,17,17,0.12)]'
                      }`}
                      title={compared ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      {compared ? (
                        <>
                          <Check className="w-3 h-3 text-[#111111]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Scale className="w-3 h-3" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] max-w-md mx-auto shadow-sm">
            <Info className="w-8 h-8 text-[#e8400d] mx-auto mb-2" />
            <h3 className="text-base font-normal text-[#111111]">No Record Found Matching Query</h3>
            <p className="text-xs text-[#6d6c6b] mt-1">
              Try searching for ChatGPT, Claude, NotebookLM, Agri AI, Climate.ai, LEO AI, Gemini, Meta AI, Grok, or Perplexity.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-[8px] bg-[#111111] text-[#ffffff] text-xs font-medium"
              >
                Reset
              </button>
              <button
                onClick={openRegisterModal}
                className="px-4 py-2 rounded-[8px] bg-[#ecebea] text-[#111111] text-xs font-normal"
              >
                Register AI
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
