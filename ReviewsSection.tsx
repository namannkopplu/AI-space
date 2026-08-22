import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  MessageSquareQuote,
  Star,
  ShieldCheck,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { AITool } from '../types';

export const ReviewsSection: React.FC = () => {
  const { tools, openToolModal } = useAIApp();
  const [selectedFilterTool, setSelectedFilterTool] = useState<string>('all');

  // Collect all reviews from all tools
  const allReviewsWithTool = tools.flatMap((tool) =>
    tool.reviews.map((rev) => ({
      ...rev,
      toolName: tool.name,
      toolCategory: tool.category,
      toolId: tool.id,
      toolObject: tool
    }))
  );

  const filteredReviews = selectedFilterTool === 'all'
    ? allReviewsWithTool
    : allReviewsWithTool.filter((r) => r.toolId === selectedFilterTool);

  return (
    <section id="reviews" className="py-10 bg-[#050b18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Verified Testimonials</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold border-l-2 border-blue-500 pl-3 text-white">
              Customer Reviews on Every AI
            </h2>
            <p className="text-xs text-slate-400 mt-1 pl-3">
              Real researchers, farmers, creative artists, developers, and students sharing honest feedback.
            </p>
          </div>

          {/* Filter Reviews by AI */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              id="reviews-filter-select"
              aria-label="Filter reviews by AI tool"
              value={selectedFilterTool}
              onChange={(e) => setSelectedFilterTool(e.target.value)}
              className="bg-slate-900 text-xs text-slate-300 py-1.5 px-2.5 rounded border border-white/10 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Tools ({allReviewsWithTool.length} reviews)</option>
              {tools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.reviews.length} reviews)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between gap-3 hover:border-blue-500/30 transition-colors"
            >
              <div>
                {/* Header: Tool tag + Star rating */}
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => openToolModal(rev.toolObject)}
                    className="text-xs font-semibold text-blue-400 hover:underline"
                  >
                    <span>{rev.toolName}</span>
                    <span className="text-[10px] text-slate-500 ml-1">({rev.toolCategory})</span>
                  </button>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-[11px] text-slate-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Pros and Cons if present */}
                {(rev.pros || rev.cons) && (
                  <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1 text-[10px]">
                    {rev.pros && (
                      <div className="flex items-start gap-1 text-green-400">
                        <ThumbsUp className="w-2.5 h-2.5 shrink-0 mt-0.5" />
                        <span><strong className="text-green-300">Pros:</strong> {rev.pros}</span>
                      </div>
                    )}
                    {rev.cons && (
                      <div className="flex items-start gap-1 text-amber-400">
                        <ThumbsDown className="w-2.5 h-2.5 shrink-0 mt-0.5" />
                        <span><strong className="text-amber-300">Cons:</strong> {rev.cons}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div>
                  <h4 className="font-medium text-slate-200">{rev.author}</h4>
                  <p className="text-[10px] text-slate-500">{rev.role}</p>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded font-medium">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
