import React, { useState } from 'react';
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
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AITool } from '../types';

export const AICompareMatrix: React.FC = () => {
  const { tools, compareList, setCompareSlot, clearCompare, openToolModal } = useAIApp();

  // Ensure we have 3 slots populated (or fallback to defaults if fewer)
  const slot0 = compareList[0] || tools.find((t) => t.id === 'chatgpt') || tools[0];
  const slot1 = compareList[1] || tools.find((t) => t.id === 'claude') || tools[1] || tools[0];
  const slot2 = compareList[2] || tools.find((t) => t.id === 'notebooklm') || tools[2] || tools[0];

  const currentSlots: [AITool, AITool, AITool] = [slot0, slot1, slot2];

  const presets = [
    {
      title: 'Top Education Comparison',
      ids: ['chatgpt', 'claude', 'notebooklm']
    },
    {
      title: 'Visual & Video Studios',
      ids: ['leo-ai', 'google-gemini', 'meta-ai']
    },
    {
      title: 'Chatbots & Research Engines',
      ids: ['grok-ai', 'perplexity-ai', 'chatgpt']
    },
    {
      title: 'AgTech & Climate AI',
      ids: ['agri-ai', 'climate-ai', 'google-gemini']
    }
  ];

  const applyPreset = (ids: string[]) => {
    const selected = ids.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as AITool[];
    if (selected[0]) setCompareSlot(0, selected[0]);
    if (selected[1]) setCompareSlot(1, selected[1]);
    if (selected[2]) setCompareSlot(2, selected[2]);
  };

  return (
    <section id="compare" className="py-10 bg-[#050b18] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Head-to-Head Comparison</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold border-l-2 border-blue-500 pl-3 text-white">
              Compare 3 AIs at Once
            </h2>
            <p className="text-xs text-slate-400 mt-1 pl-3">
              Side-by-side transparent pricing, capabilities, customer ratings, and platform support.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px]">Presets:</span>
            {presets.map((p) => (
              <button
                key={p.title}
                onClick={() => applyPreset(p.ids)}
                className="px-2.5 py-1 rounded bg-slate-800/50 border border-white/5 hover:border-blue-500/30 text-slate-300 hover:text-blue-400 text-[11px] font-medium transition-colors"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Selectors Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {([0, 1, 2] as const).map((slotIdx) => {
            const currentTool = currentSlots[slotIdx];
            return (
              <div
                key={slotIdx}
                className="p-3 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-blue-400">
                    Slot {slotIdx + 1}
                  </span>
                  <span className="text-slate-500">
                    {currentTool.category}
                  </span>
                </div>

                <label htmlFor={`slot-${slotIdx}-select`} className="sr-only">
                  Choose AI for Slot {slotIdx + 1}
                </label>
                <select
                  id={`slot-${slotIdx}-select`}
                  value={currentTool.id}
                  onChange={(e) => {
                    const found = tools.find((t) => t.id === e.target.value);
                    if (found) setCompareSlot(slotIdx, found);
                  }}
                  className="w-full bg-slate-950 text-xs text-white py-1.5 px-2 rounded border border-white/10 focus:outline-none focus:border-blue-500"
                >
                  {tools.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category}) — by {t.companyName}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Comparison Table / Matrix Card */}
        <div className="rounded-lg bg-slate-900/50 border border-white/10 overflow-hidden">
          
          {/* Top Bar: Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-slate-900/80">
            <div className="p-4 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Matrix View
              </span>
              <h3 className="text-sm font-bold text-white">Feature & Spec Comparison</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Side-by-side analysis of 3 selected tools.
              </p>
            </div>

            {currentSlots.map((tool, idx) => (
              <div key={tool.id + idx} className="p-4 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-blue-500/10 text-blue-400">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                      <span className="text-slate-500 font-normal">({tool.reviewCount})</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white">{tool.name}</h4>
                  <p className="text-[11px] text-slate-500">by {tool.companyName}</p>
                  <p className="text-[11px] text-blue-300/90 mt-1 line-clamp-1">{tool.tagline}</p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Launch AI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => openToolModal(tool)}
                    className="py-1.5 px-2 bg-slate-800 text-slate-300 hover:text-white text-[11px] font-medium rounded border border-white/5 transition-colors"
                  >
                    Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Matrix Rows */}
          <div className="divide-y divide-white/5 text-xs">
            
            {/* Row 1: What it does */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Capabilities</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'work'} className="p-3.5 space-y-1.5">
                  {tool.workItDoes.map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 2: Pricing Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-slate-950/20">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pricing & Plans</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'price'} className="p-3.5 space-y-1 text-[11px]">
                  <div className="inline-block px-1.5 py-0.2 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400">
                    {tool.pricing.model}
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Free: </span>
                    {tool.pricing.freeTier}
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-500">Paid: </span>
                    {tool.pricing.startingPrice}
                  </div>
                  {tool.pricing.proTier && (
                    <div className="text-slate-400">
                      <span className="text-slate-500">Pro: </span>
                      {tool.pricing.proTier}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Row 3: Strengths */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                <span>Key Strengths</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'str'} className="p-3.5 space-y-1 text-[11px]">
                  {tool.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-300">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 4: Limitations / Considerations */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-slate-950/20">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Considerations</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'weak'} className="p-3.5 space-y-1 text-[11px]">
                  {tool.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-400">
                      <X className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 5: Best For */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Best For</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'best'} className="p-3.5 text-[11px] text-slate-300">
                  {tool.bestFor}
                </div>
              ))}
            </div>

            {/* Row 6: Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-slate-950/20">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                <span>Platforms</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'plat'} className="p-3.5 flex flex-wrap gap-1">
                  {tool.platforms.map((plat, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px]"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 7: Direct Action */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-3.5 bg-slate-950/40 text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>Direct Access</span>
              </div>
              {currentSlots.map((tool, idx) => (
                <div key={tool.id + idx + 'action'} className="p-3.5">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Launch {tool.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
