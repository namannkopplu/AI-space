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
    <section id="explore" className="py-10 bg-[#050b18] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog & Directory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold border-l-2 border-blue-500 pl-3 text-white">
              {selectedCategory === 'All' ? 'Recommended Innovations' : `${selectedCategory} Innovations`}
            </h2>
            <p className="text-xs text-slate-400 mt-1 pl-3">
              Authentic tools with official verified links, exact pricing, user ratings, and live demo booking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick compare summary */}
            {compareList.length > 0 && (
              <button
                onClick={() => scrollToSection('compare')}
                className="px-3 py-1.5 rounded bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-colors flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Selected ({compareList.length}/3)</span>
              </button>
            )}

            <button
              onClick={() => openBookingModal(null)}
              className="px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Book Consultation</span>
            </button>

            <button
              onClick={openRegisterModal}
              className="px-3 py-1.5 rounded bg-slate-800/50 border border-white/5 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Register AI</span>
            </button>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => {
              const compared = isCompared(tool.id);
              const latestReview = tool.reviews && tool.reviews.length > 0 ? tool.reviews[0] : null;
              const bookmarked = isFavorite(tool.id);

              return (
                <div
                  key={tool.id}
                  id={`ai-card-${tool.slug}`}
                  className="bg-slate-900/50 border border-white/10 hover:border-blue-500/30 rounded-lg p-4 flex flex-col justify-between gap-3 transition-colors relative"
                >
                  {/* Top Badge & Category */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-300">
                          {tool.category}
                        </span>
                        {tool.badge && (
                          <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.2 rounded font-medium">
                            {tool.badge}
                          </span>
                        )}
                        {tool.isCommunityRegistered && (
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.2 rounded font-medium">
                            Community
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleFavoriteTool(tool.id)}
                          className="text-slate-500 hover:text-amber-400 transition-colors"
                          title={bookmarked ? 'Remove bookmark' : 'Bookmark this AI'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>

                        {/* Customer Rating */}
                        <button
                          onClick={() => openToolModal(tool)}
                          className="flex items-center gap-1 text-xs text-yellow-400 hover:underline"
                          title="View user reviews"
                        >
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-slate-200">{tool.rating}</span>
                          <span className="text-[10px] text-slate-500">({tool.reviewCount})</span>
                        </button>
                      </div>
                    </div>

                    {/* AI Name & Creator */}
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-bold text-white text-base">
                          {tool.name}
                        </h3>
                        <span className="text-[11px] text-slate-500 truncate">
                          {tool.companyName}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {tool.tagline}
                      </p>
                    </div>

                    {/* Work It Does Highlights */}
                    <div className="mt-2.5 pt-2 border-t border-white/5">
                      <ul className="space-y-1">
                        {tool.workItDoes.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing Summary */}
                    <div className="mt-2.5 flex items-center justify-between py-1.5 px-2 rounded bg-slate-950/60 border border-white/5 text-[11px]">
                      <span className="text-slate-400 font-medium">{tool.pricing.model}</span>
                      <span className="text-blue-300 font-medium truncate max-w-[170px]">
                        {tool.pricing.startingPrice || tool.pricing.freeTier}
                      </span>
                    </div>

                    {/* Latest Review Snippet */}
                    {latestReview && (
                      <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-400">
                        <p className="italic text-slate-300 line-clamp-1">
                          &ldquo;{latestReview.comment}&rdquo;
                        </p>
                        <span className="text-slate-500 block mt-0.5">
                          — {latestReview.author}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="mt-2 pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    
                    {/* Real Direct Link */}
                    <a
                      id={`open-link-${tool.slug}`}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold py-1.5 px-2 rounded transition-colors flex items-center justify-center gap-1 min-w-[90px]"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* Book Demo Button */}
                    <button
                      id={`book-demo-${tool.slug}`}
                      onClick={() => openBookingModal(tool)}
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] py-1.5 px-2 rounded transition-colors flex items-center gap-1"
                      title="Schedule live walkthrough"
                    >
                      <Calendar className="w-3 h-3 text-blue-400" />
                      <span>Demo</span>
                    </button>

                    {/* View Details / Reviews Modal */}
                    <button
                      id={`details-btn-${tool.slug}`}
                      onClick={() => openToolModal(tool)}
                      className="bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-[11px] py-1.5 px-2 rounded border border-white/5 transition-colors"
                    >
                      Reviews
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
                      className={`text-[11px] py-1.5 px-2 rounded border transition-colors flex items-center gap-1 ${
                        compared
                          ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-white/5'
                      }`}
                      title={compared ? 'Remove from comparison' : 'Add to 3-AI comparison'}
                    >
                      {compared ? (
                        <>
                          <Check className="w-3 h-3 text-blue-400" />
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
          <div className="text-center py-12 px-4 rounded-lg bg-slate-900/50 border border-white/10 max-w-md mx-auto">
            <Info className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No AI Found Matching Filter</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try searching for ChatGPT, Claude, NotebookLM, Agri AI, Climate.ai, LEO AI, Gemini, Meta AI, Grok, or Perplexity.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1.5 rounded bg-blue-600 text-white text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={openRegisterModal}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-medium"
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

