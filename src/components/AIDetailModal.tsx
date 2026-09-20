import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  X,
  ExternalLink,
  Star,
  Check,
  Briefcase,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Plus,
  Scale,
  Calendar,
  Layers,
  Laptop,
  Users,
  Tag,
  Bookmark
} from 'lucide-react';
import { getCategoryPastel } from '../lib/taxonomy';

export const AIDetailModal: React.FC = () => {
  const { activeToolModal, closeToolModal, addUserReview, addToCompare, isCompared, scrollToSection } = useAIApp();
  const { openBookingModal } = useBooking();
  const { isFavorite, toggleFavoriteTool, userProfile } = useAuth();

  // Review Form state
  const [author, setAuthor] = useState(userProfile?.displayName || '');
  const [role, setRole] = useState(userProfile?.role || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!activeToolModal) return null;

  const tool = activeToolModal;
  const compared = isCompared(tool.id);
  const bookmarked = isFavorite(tool.id);
  const pastel = getCategoryPastel(tool.category);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addUserReview(tool.id, {
      author: author.trim(),
      role: role.trim() || 'Verified User',
      rating,
      comment: comment.trim(),
      pros: pros.trim() || undefined,
      cons: cons.trim() || undefined
    });

    setAuthor(userProfile?.displayName || '');
    setRole(userProfile?.role || '');
    setComment('');
    setPros('');
    setCons('');
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4000);
  };

  return (
    <div
      id="ai-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto text-[#111111]"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeToolModal();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.16)_0px_24px_64px_0px] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.08)] flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span 
                style={{ backgroundColor: pastel.bg, color: pastel.text }}
                className="px-2.5 py-0.5 rounded-[4px] text-xs font-medium"
              >
                {tool.category}
              </span>
              {tool.badge && (
                <span className="px-2.5 py-0.5 rounded-[4px] text-xs font-mono text-[#6d6c6b] bg-[#ffffff] border border-[rgba(17,17,17,0.08)]">
                  {tool.badge}
                </span>
              )}
              <span className="text-xs text-[#6d6c6b] font-mono">
                Released: <strong className="text-[#111111]">{tool.releaseYear}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal text-[#111111] tracking-[-0.03em]">
              {tool.name}
            </h2>
            <p className="text-xs text-[#6d6c6b] mt-0.5">
              Developed by <strong className="text-[#111111] font-medium">{tool.companyName}</strong>
            </p>
            <p className="text-xs text-[#e8400d] font-medium mt-1">
              {tool.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteTool(tool.id)}
              className={`p-2 rounded-[8px] border transition-colors ${
                bookmarked
                  ? 'bg-[#ffd7f0] text-[#111111] border-[#ffd7f0]'
                  : 'bg-[#ffffff] border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111]'
              }`}
              title={bookmarked ? 'Saved to Favorites' : 'Save to Favorites'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#e8400d] text-[#e8400d]' : ''}`} />
            </button>
            <button
              id="close-detail-modal-btn"
              onClick={closeToolModal}
              className="p-2 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 divide-y divide-[rgba(17,17,17,0.08)] text-xs">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#f6f5f3] text-[#111111] font-semibold text-xs">
                <Star className="w-3.5 h-3.5 fill-[#e8400d] text-[#e8400d]" />
                <span>{tool.rating} / 5.0</span>
                <span className="text-[#6d6c6b] font-normal text-[11px]">({tool.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Book Demo Button */}
              <button
                onClick={() => {
                  closeToolModal();
                  openBookingModal(tool);
                }}
                className="px-4 py-2 rounded-[8px] bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-normal flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Book Live Demo</span>
              </button>

              {/* Direct Link */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] text-xs font-normal flex items-center gap-1.5 transition-colors"
              >
                <span>Launch {tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#ffffff]" />
              </a>

              {/* Compare toggle */}
              <button
                onClick={() => {
                  addToCompare(tool);
                  closeToolModal();
                  scrollToSection('compare');
                }}
                className={`px-4 py-2 rounded-[8px] text-xs font-normal flex items-center gap-1.5 transition-colors ${
                  compared
                    ? 'bg-[#ffd7f0] text-[#111111] border border-[#ffd7f0]'
                    : 'bg-transparent text-[#6d6c6b] hover:text-[#111111] border border-[rgba(17,17,17,0.14)]'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
              </button>
            </div>
          </div>

          {/* Section: Overview & Work it Does */}
          <div className="pt-5 space-y-3">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] flex items-center gap-1.5 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#e8400d]" /> Overview & Scope of Work
              </h3>
              <p className="text-xs text-[#6d6c6b] leading-relaxed font-normal">
                {tool.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
              {tool.workItDoes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8400d] mt-1.5 shrink-0" />
                  <span className="text-xs text-[#111111] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Transparent Pricing */}
          <div className="pt-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] flex items-center gap-1.5 mb-3">
              <DollarSign className="w-3.5 h-3.5 text-[#e8400d]" /> Pricing Model & Plans
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)]">
                <span className="text-[10px] uppercase font-mono text-[#6d6c6b] block mb-1">
                  Model
                </span>
                <p className="text-xs font-medium text-[#111111]">{tool.pricing.model}</p>
                <p className="text-[11px] text-[#6d6c6b] mt-1">{tool.pricing.freeTier}</p>
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)]">
                <span className="text-[10px] uppercase font-mono text-[#6d6c6b] block mb-1">
                  Base Plan
                </span>
                <p className="text-xs font-medium text-[#111111]">{tool.pricing.startingPrice}</p>
                {tool.pricing.proTier && (
                  <p className="text-[11px] text-[#6d6c6b] mt-1">{tool.pricing.proTier}</p>
                )}
              </div>

              <div className="p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)]">
                <span className="text-[10px] uppercase font-mono text-[#6d6c6b] block mb-1">
                  Enterprise
                </span>
                <p className="text-[11px] text-[#6d6c6b]">
                  {tool.pricing.enterprise || 'Commercial volume available upon inquiry.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Strengths & Weaknesses */}
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-[#e8400d]" /> Key Strengths
              </h4>
              <ul className="space-y-1.5 text-xs text-[#111111]">
                {tool.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#e8400d] shrink-0 mt-0.5" />
                    <span className="text-[#6d6c6b]">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6d6c6b] flex items-center gap-1.5">
                <ThumbsDown className="w-3.5 h-3.5 text-[#6d6c6b]" /> Known Limitations
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6d6c6b]">
                {tool.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b1b1af] mt-1.5 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Customer Reviews & Write a Review */}
          <div className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#e8400d]" /> Community Reviews ({tool.reviews.length})
                </h3>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-2.5">
              {tool.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-[#111111]">{rev.author}</span>
                      <span className="text-[10px] text-[#6d6c6b] font-mono ml-1.5">({rev.role})</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? 'fill-[#e8400d] text-[#e8400d]' : 'text-[#ecebea]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#111111] italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {(rev.pros || rev.cons) && (
                    <div className="pt-1 flex flex-wrap gap-3 text-xs">
                      {rev.pros && (
                        <span className="text-[#111111]">
                          <strong className="text-[#e8400d]">Pros:</strong> {rev.pros}
                        </span>
                      )}
                      {rev.cons && (
                        <span className="text-[#6d6c6b]">
                          <strong className="text-[#111111]">Cons:</strong> {rev.cons}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="p-5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-[#e8400d]" /> Submit Feedback for {tool.name}
              </h4>

              {submittedMessage && (
                <div className="p-3 mb-3 rounded-[8px] bg-[#b7efb2] text-[#111111] text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#111111]" />
                  <span className="font-medium">Review recorded successfully!</span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1 text-xs">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Dr. Alex Morgan"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1 text-xs">Your Role *</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Agricultural Researcher"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1 text-xs">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3 - Average)</option>
                      <option value={2}>⭐⭐ (2 - Below Expectations)</option>
                      <option value={1}>⭐ (1 - Poor)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#6d6c6b] mb-1 text-xs">Review *</label>
                  <textarea
                    required
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={`How did ${tool.name} perform for your specific tasks?`}
                    className="w-full bg-[#ffffff] text-[#111111] p-3 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1 text-xs">Key Pros</label>
                    <input
                      type="text"
                      value={pros}
                      onChange={(e) => setPros(e.target.value)}
                      placeholder="e.g. Fast speeds, accurate citations"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1 text-xs">Key Cons</label>
                    <input
                      type="text"
                      value={cons}
                      onChange={(e) => setCons(e.target.value)}
                      placeholder="e.g. Free tier rate limits"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs transition-colors"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f6f5f3] border-t border-[rgba(17,17,17,0.08)] flex items-center justify-between text-xs text-[#6d6c6b] font-mono">
          <span>AI space Verified Profile</span>
          <button
            onClick={closeToolModal}
            className="px-4 py-2 rounded-[8px] bg-[#ffffff] text-[#111111] hover:bg-[#ecebea] border border-[rgba(17,17,17,0.1)] text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
