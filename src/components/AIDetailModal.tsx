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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeToolModal();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#070e1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/60 border-b border-white/5 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {tool.category}
              </span>
              {tool.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {tool.badge}
                </span>
              )}
              <span className="text-[11px] text-slate-500">
                Released: <strong className="text-slate-300">{tool.releaseYear}</strong>
              </span>
            </div>

            <h2 className="text-xl font-bold text-white">
              {tool.name}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Developed by <strong className="text-slate-300">{tool.companyName}</strong>
            </p>
            <p className="text-xs text-blue-400 font-medium mt-1">
              {tool.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteTool(tool.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800 border-white/5 text-slate-400 hover:text-white'
              }`}
              title={bookmarked ? 'Saved to Favorites' : 'Save to Favorites'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              id="close-detail-modal-btn"
              onClick={closeToolModal}
              className="p-1.5 rounded-lg bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 overflow-y-auto space-y-6 divide-y divide-white/5 text-xs">
          
          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-white/5 text-yellow-400 font-semibold text-xs">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>{tool.rating} / 5.0</span>
                <span className="text-slate-500 font-normal text-[11px]">({tool.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Book Demo Button */}
              <button
                onClick={() => {
                  closeToolModal();
                  openBookingModal(tool);
                }}
                className="px-3.5 py-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Book Live Demo</span>
              </button>

              {/* Direct Link */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Launch {tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Compare toggle */}
              <button
                onClick={() => {
                  addToCompare(tool);
                  closeToolModal();
                  scrollToSection('compare');
                }}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                  compared
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{compared ? 'In Comparison' : 'Add to Compare'}</span>
              </button>
            </div>
          </div>


          {/* Section: Overview & Work it Does */}
          <div className="pt-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1">
                <Briefcase className="w-3.5 h-3.5" /> Overview & Scope of Work
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {tool.workItDoes.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-slate-900/60 border border-white/5 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span className="text-[11px] text-slate-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Transparent Pricing */}
          <div className="pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5 mb-2">
              <DollarSign className="w-3.5 h-3.5" /> Pricing Model & Plans
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded bg-slate-900/60 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                  Model
                </span>
                <p className="text-xs font-bold text-white">{tool.pricing.model}</p>
                <p className="text-[11px] text-slate-400 mt-1">{tool.pricing.freeTier}</p>
              </div>

              <div className="p-3 rounded bg-slate-900/60 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                  Base Plan
                </span>
                <p className="text-xs font-bold text-white">{tool.pricing.startingPrice}</p>
                {tool.pricing.proTier && (
                  <p className="text-[11px] text-slate-400 mt-1">{tool.pricing.proTier}</p>
                )}
              </div>

              <div className="p-3 rounded bg-slate-900/60 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                  Enterprise
                </span>
                <p className="text-[11px] text-slate-400">
                  {tool.pricing.enterprise || 'Commercial volume available upon inquiry.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Strengths & Weaknesses */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-slate-900/60 border border-white/5 space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-green-400 flex items-center gap-1">
                <ThumbsUp className="w-3 h-3 text-green-400" /> Key Strengths
              </h4>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {tool.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-green-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded bg-slate-900/60 border border-white/5 space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <ThumbsDown className="w-3 h-3 text-amber-400" /> Known Limitations
              </h4>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {tool.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Customer Reviews & Write a Review */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Community Reviews ({tool.reviews.length})
                </h3>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-2">
              {tool.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded bg-slate-900/40 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white">{rev.author}</span>
                      <span className="text-[10px] text-slate-500 ml-1.5">({rev.role})</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${
                            i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {(rev.pros || rev.cons) && (
                    <div className="pt-1 flex flex-wrap gap-3 text-[10px]">
                      {rev.pros && (
                        <span className="text-green-400">
                          <strong>Pros:</strong> {rev.pros}
                        </span>
                      )}
                      {rev.cons && (
                        <span className="text-amber-400">
                          <strong>Cons:</strong> {rev.cons}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="p-4 rounded bg-slate-900/60 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Submit Feedback for {tool.name}
              </h4>

              {submittedMessage && (
                <div className="p-2 mb-3 rounded bg-green-950/60 border border-green-700 text-green-300 text-xs flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Review recorded successfully!</span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-2.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Dr. Alex Morgan"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Your Role *</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Agricultural Researcher"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs font-medium"
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
                  <label className="block text-slate-400 mb-1 text-[11px]">Review *</label>
                  <textarea
                    required
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={`How did ${tool.name} perform for your specific tasks?`}
                    className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Key Pros</label>
                    <input
                      type="text"
                      value={pros}
                      onChange={(e) => setPros(e.target.value)}
                      placeholder="e.g. Fast speeds, accurate citations"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Key Cons</label>
                    <input
                      type="text"
                      value={cons}
                      onChange={(e) => setCons(e.target.value)}
                      placeholder="e.g. Free tier rate limits"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>AI space Verified Profile</span>
          <button
            onClick={closeToolModal}
            className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
