import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Scale,
  ExternalLink,
  Star,
  Check,
  X,
  Sparkles,
  DollarSign,
  Briefcase,
  ThumbsUp,
  AlertCircle,
  Users,
  Laptop,
  ArrowRight,
  RotateCcw,
  Plus
} from 'lucide-react';
import { AITool } from '../types';
import { getCategoryPastel } from '../lib/taxonomy';

export const AICompareMatrix: React.FC = () => {
  const {
    tools,
    compareSlots,
    setCompareSlot,
    clearCompare,
    openToolModal
  } = useAIApp();

  // Active models selected in the 3 compare options
  const activeTools = compareSlots.filter((t): t is AITool => t !== null);

  const isComparingTwo = activeTools.length === 2;

  const gridClass = activeTools.length === 2
    ? 'grid grid-cols-1 md:grid-cols-3'
    : activeTools.length === 3
    ? 'grid grid-cols-1 md:grid-cols-4'
    : 'grid grid-cols-1 md:grid-cols-2';

  const slotConfigs = [
    {
      title: '1st Model',
      tag: '1st',
      placeholder: '-- Select 1st Model --',
      emptyHint: 'Choose a model or add from the catalog below'
    },
    {
      title: '2nd Model',
      tag: '2nd',
      placeholder: '-- Select 2nd Model --',
      emptyHint: 'Choose a model or add from the catalog below'
    },
    {
      title: '3rd Model',
      tag: '3rd',
      placeholder: '-- Select 3rd Model (or leave empty) --',
      emptyHint: 'Choose a 3rd model, or leave empty to compare 2'
    }
  ];

  const loadSampleTwo = () => {
    const t1 = tools.find((t) => t.id === 'chatgpt') || tools[0];
    const t2 = tools.find((t) => t.id === 'claude') || tools[1];
    setCompareSlot(0, t1);
    setCompareSlot(1, t2);
    setCompareSlot(2, null);
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('explore');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="compare" className="py-20 bg-[#ffffff] border-t border-[rgba(17,17,17,0.08)] relative text-[#111111]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Amplemarket Typographic Restraint */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[rgba(17,17,17,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#e8400d] text-xs font-mono uppercase tracking-wider mb-2">
              <Scale className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>Head-to-Head Evaluation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#111111] tracking-[-0.04em] leading-[1.1]">
              Compare AI Models
            </h2>
            <p className="text-sm text-[#6d6c6b] mt-2 font-normal max-w-xl">
              Select models to evaluate side-by-side. Choose a 1st, 2nd, and 3rd model from the options below or add directly from the directory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#6d6c6b]">
              {activeTools.length > 0 ? (
                <>
                  Active: <strong className="text-[#111111]">{activeTools.length} model{activeTools.length === 1 ? '' : 's'}</strong> selected
                </>
              ) : (
                <span className="text-[#6d6c6b]">All options clear</span>
              )}
            </span>
            {activeTools.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-mono transition-colors"
                title="Clear all compare options"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 User-Selectable Compare Options (12px radius cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((slotIdx) => {
            const currentTool = compareSlots[slotIdx];
            const isSlotOccupied = Boolean(currentTool);
            const cfg = slotConfigs[slotIdx];
            const pastel = currentTool ? getCategoryPastel(currentTool.category) : null;

            return (
              <div
                key={slotIdx}
                className={`p-5 rounded-[12px] transition-all ${
                  isSlotOccupied
                    ? 'bg-[#ffffff] border border-[rgba(17,17,17,0.12)] shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px]'
                    : 'bg-[#f6f5f3] border-dashed border-[rgba(17,17,17,0.14)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#111111] tracking-tight">
                      {cfg.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#111111] px-2 py-0.5 rounded-[6px] bg-[#ecebea]">
                      {cfg.tag}
                    </span>
                  </div>
                  {isSlotOccupied && (
                    <button
                      type="button"
                      onClick={() => setCompareSlot(slotIdx, null)}
                      className="text-[11px] font-mono text-[#6d6c6b] hover:text-[#e8400d] flex items-center gap-1 transition-colors"
                      title={`Clear ${cfg.title}`}
                    >
                      <X className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="mb-2">
                  <label htmlFor={`compare-slot-select-${slotIdx}`} className="text-[11px] text-[#6d6c6b] block mb-1.5">
                    {isSlotOccupied ? 'Selected Model' : `Choose ${cfg.title}`}
                  </label>
                  <select
                    id={`compare-slot-select-${slotIdx}`}
                    value={currentTool?.id || ''}
                    onChange={(e) => {
                      const selectedVal = e.target.value;
                      if (!selectedVal) {
                        setCompareSlot(slotIdx, null);
                      } else {
                        const found = tools.find((t) => t.id === selectedVal);
                        if (found) setCompareSlot(slotIdx, found);
                      }
                    }}
                    className={`w-full bg-[#ffffff] text-xs py-2 px-3 rounded-[8px] border transition-colors focus:outline-none ${
                      isSlotOccupied
                        ? 'text-[#111111] border-[rgba(17,17,17,0.2)] hover:border-[#111111] focus:border-[#111111]'
                        : 'text-[#6d6c6b] border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:border-[#111111]'
                    }`}
                  >
                    <option value="">
                      {cfg.placeholder}
                    </option>
                    {tools.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category}) — by {t.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                {isSlotOccupied ? (
                  <div className="flex items-center justify-between pt-2.5 border-t border-[rgba(17,17,17,0.06)] text-[11px]">
                    <span 
                      style={{ backgroundColor: pastel?.bg, color: pastel?.text }}
                      className="px-2 py-0.5 rounded-[4px] font-medium"
                    >
                      {currentTool?.category}
                    </span>
                    <span className="text-[#111111] shrink-0 font-medium font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#e8400d] text-[#e8400d]" /> {currentTool?.rating}
                    </span>
                  </div>
                ) : (
                  <div className="pt-2.5 border-t border-dashed border-[rgba(17,17,17,0.1)] text-[11px] text-[#6d6c6b]">
                    {cfg.emptyHint}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix or Clean Empty Prompt when fewer than 2 models selected */}
        {activeTools.length < 2 ? (
          <div className="rounded-[12px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] p-12 text-center">
            <div className="w-12 h-12 rounded-[8px] bg-[#ffffff] text-[#111111] flex items-center justify-center mx-auto mb-3 border border-[rgba(17,17,17,0.08)] shadow-sm">
              <Scale className="w-6 h-6 text-[#e8400d]" />
            </div>
            <h3 className="text-xl font-normal text-[#111111] tracking-tight mb-2">Select Models to Compare</h3>
            <p className="text-xs text-[#6d6c6b] max-w-md mx-auto mb-6 leading-relaxed">
              {activeTools.length === 0
                ? 'All comparison slots are currently clear. Choose models using the 1st, 2nd, and 3rd options above, or click "Add to Compare" on any card in the catalog.'
                : `You have selected 1 model (${activeTools[0].name}). Add a 2nd model (and optionally a 3rd) to generate the comparison matrix.`}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={scrollToDirectory}
                className="px-5 py-2.5 bg-[#111111] hover:bg-[#272625] text-[#ffffff] text-xs font-normal rounded-[8px] transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={loadSampleTwo}
                className="px-5 py-2.5 bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-normal rounded-[8px] transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#e8400d]" />
                <span>Quick Fill (ChatGPT & Claude)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] overflow-hidden shadow-[rgba(17,17,17,0.02)_0px_4px_16px_0px]">
            
            {/* Top Row: Selected Model Cards */}
            <div className={`${gridClass} border-b border-[rgba(17,17,17,0.08)] divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)] bg-[#f6f5f3]`}>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#e8400d] mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e8400d]" /> Side-by-Side Matrix
                </span>
                <h3 className="text-xl font-normal tracking-tight text-[#111111]">
                  {isComparingTwo ? 'Head-to-Head Comparison' : '3 Models Comparison'}
                </h3>
                <p className="text-xs text-[#6d6c6b] mt-1 font-normal">
                  Comparing {activeTools.length} selected models side-by-side.
                </p>
              </div>

              {activeTools.map((tool, idx) => {
                const pastel = getCategoryPastel(tool.category);
                return (
                  <div key={tool.id + idx} className="p-6 flex flex-col justify-between gap-3 bg-[#ffffff] relative group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          style={{ backgroundColor: pastel.bg, color: pastel.text }}
                          className="text-[10px] px-2.5 py-0.5 rounded-[4px] font-medium"
                        >
                          {tool.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#111111] font-semibold font-mono">
                          <Star className="w-3.5 h-3.5 fill-[#e8400d] text-[#e8400d]" />
                          <span>{tool.rating}</span>
                          <span className="text-[#6d6c6b] font-normal">({tool.reviewCount})</span>
                        </div>
                      </div>

                      <h4 className="text-xl font-normal tracking-[-0.02em] text-[#111111]">{tool.name}</h4>
                      <p className="text-xs text-[#6d6c6b]">by {tool.companyName}</p>
                      <p className="text-xs text-[#6d6c6b] mt-1.5 line-clamp-2">{tool.tagline}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-[rgba(17,17,17,0.06)]">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 bg-[#111111] hover:bg-[#272625] text-[#ffffff] text-xs font-normal rounded-[8px] text-center flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Launch AI</span>
                        <ExternalLink className="w-3 h-3 text-[#ffffff]" />
                      </a>
                      <button
                        onClick={() => openToolModal(tool)}
                        className="py-2 px-3 bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-normal rounded-[8px] transition-colors"
                      >
                        Reviews
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Matrix Rows */}
            <div className="divide-y divide-[rgba(17,17,17,0.08)] text-xs">
              
              {/* Capabilities */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#e8400d]" />
                  <span>Capabilities</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'work'} className="p-5 space-y-2 bg-[#ffffff]">
                    {tool.workItDoes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#6d6c6b]">
                        <span className="text-[#e8400d] mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Pricing & Plans */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#e8400d]" />
                  <span>Pricing & Plans</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'price'} className="p-5 space-y-2 text-xs font-mono bg-[#ffffff]">
                    <div className="inline-block px-2.5 py-0.5 rounded-[4px] text-[10px] font-medium bg-[#f6f5f3] text-[#111111] border border-[rgba(17,17,17,0.08)]">
                      {tool.pricing.model}
                    </div>
                    <div className="text-[#111111]">
                      <span className="text-[#6d6c6b]">Free: </span>
                      {tool.pricing.freeTier}
                    </div>
                    <div className="text-[#111111]">
                      <span className="text-[#6d6c6b]">Paid: </span>
                      {tool.pricing.startingPrice}
                    </div>
                    {tool.pricing.proTier && (
                      <div className="text-[#6d6c6b]">
                        <span className="text-[#6d6c6b]">Pro: </span>
                        {tool.pricing.proTier}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Strengths */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-[#e8400d]" />
                  <span>Key Strengths</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'str'} className="p-5 space-y-2 text-xs bg-[#ffffff]">
                    {tool.strengths.map((str, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#111111]">
                        <div className="w-4 h-4 rounded-full bg-[#b7efb2] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#111111]" />
                        </div>
                        <span className="text-[#6d6c6b]">{str}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Considerations */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#e8400d]" />
                  <span>Considerations</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'weak'} className="p-5 space-y-2 text-xs bg-[#ffffff]">
                    {tool.weaknesses.map((w, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#6d6c6b]">
                        <div className="w-4 h-4 rounded-full bg-[#ecebea] flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 text-[#6d6c6b]" />
                        </div>
                        <span>{w}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Best For */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#e8400d]" />
                  <span>Best For</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'best'} className="p-5 text-xs text-[#6d6c6b] leading-relaxed bg-[#ffffff]">
                    {tool.bestFor}
                  </div>
                ))}
              </div>

              {/* Platforms */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-[#e8400d]" />
                  <span>Platforms</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'plat'} className="p-5 flex flex-wrap gap-2 bg-[#ffffff]">
                    {tool.platforms.map((plat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-[6px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)] text-[#111111] text-[11px] font-mono"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Direct Access */}
              <div className={`${gridClass} divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)]`}>
                <div className="p-5 bg-[#f6f5f3] text-xs font-medium text-[#111111] flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-[#e8400d]" />
                  <span>Direct Access</span>
                </div>
                {activeTools.map((tool, idx) => (
                  <div key={tool.id + idx + 'action'} className="p-5 bg-[#ffffff]">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Launch {tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ffffff]" />
                    </a>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
