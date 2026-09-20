import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  MessageSquareQuote,
  Star,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getCategoryPastel } from '../lib/taxonomy';

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
    <section id="reviews" className="py-20 bg-[#ffffff] border-t border-[rgba(17,17,17,0.08)] text-[#111111]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Amplemarket Typographic Restraint */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[rgba(17,17,17,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#e8400d] text-xs font-mono uppercase tracking-wider mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>Verified Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#111111] tracking-[-0.04em] leading-[1.1]">
              Customer Reviews on Every AI
            </h2>
            <p className="text-sm text-[#6d6c6b] mt-2 font-normal max-w-xl">
              Real researchers, agronomists, creative directors, developers, and students sharing verified evaluations.
            </p>
          </div>

          {/* Filter Reviews by AI: 8px Border Radius */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#6d6c6b]" />
            <select
              id="reviews-filter-select"
              aria-label="Filter reviews by AI tool"
              value={selectedFilterTool}
              onChange={(e) => setSelectedFilterTool(e.target.value)}
              className="bg-[#ffffff] text-xs text-[#111111] py-2 px-3.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
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

        {/* Reviews Grid — Amplemarket Testimonial Cards (12px radius, hairline border, white canvas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => {
            const pastel = getCategoryPastel(rev.toolCategory);
            return (
              <div
                key={rev.id}
                className="p-6 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] flex flex-col justify-between gap-4 shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px] hover:border-[rgba(17,17,17,0.2)] transition-colors"
              >
                <div>
                  {/* Header: Tool tag + Star rating */}
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => openToolModal(rev.toolObject)}
                      style={{ backgroundColor: pastel.bg, color: pastel.text }}
                      className="text-xs font-medium px-2.5 py-1 rounded-[6px] tracking-tight hover:opacity-90 flex items-center gap-1.5 transition-opacity"
                    >
                      <span>{rev.toolName}</span>
                      <span className="text-[10px] opacity-75 font-mono">({rev.toolCategory})</span>
                    </button>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-[#e8400d] text-[#e8400d]'
                              : 'text-[#ecebea]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs text-[#111111] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {/* Pros and Cons if present */}
                  {(rev.pros || rev.cons) && (
                    <div className="mt-3.5 pt-3 border-t border-[rgba(17,17,17,0.06)] space-y-2 text-xs">
                      {rev.pros && (
                        <div className="flex items-start gap-2 text-[#111111]">
                          <ThumbsUp className="w-3.5 h-3.5 text-[#e8400d] shrink-0 mt-0.5" />
                          <span><strong className="text-[#111111] font-medium">Pros:</strong> {rev.pros}</span>
                        </div>
                      )}
                      {rev.cons && (
                        <div className="flex items-start gap-2 text-[#6d6c6b]">
                          <ThumbsDown className="w-3.5 h-3.5 text-[#b1b1af] shrink-0 mt-0.5" />
                          <span><strong className="text-[#111111] font-medium">Cons:</strong> {rev.cons}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Author & Verification Footer */}
                <div className="pt-3.5 border-t border-[rgba(17,17,17,0.06)] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-medium text-[#111111]">{rev.author}</h4>
                    <p className="text-[11px] text-[#6d6c6b]">{rev.role}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#111111] bg-[#b7efb2] px-2.5 py-1 rounded-[6px] font-mono">
                    <ShieldCheck className="w-3 h-3 text-[#111111]" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
