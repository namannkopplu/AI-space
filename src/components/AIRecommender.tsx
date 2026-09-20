import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Compass,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
  Sparkles,
  Zap,
  Scale,
  Target
} from 'lucide-react';
import { getCategoryPastel } from '../lib/taxonomy';

export const AIRecommender: React.FC = () => {
  const { tools, openToolModal, addToCompare, scrollToSection } = useAIApp();
  const [selectedGoal, setSelectedGoal] = useState<string>('study');
  const [pricingPreference, setPricingPreference] = useState<'all' | 'free-only'>('all');

  const goals = [
    { id: 'study', label: 'Study, Exams & Thesis Research', category: 'Education' },
    { id: 'farming', label: 'Crop Yields & Field Weather', category: 'Agriculture' },
    { id: 'design', label: 'Generate Assets & Brand Visuals', category: 'Image Generator' },
    { id: 'media', label: 'Create Marketing & Social Videos', category: 'Video Generation' },
    { id: 'assistant', label: 'Live Q&A, Web Chat & Brainstorming', category: 'Chat Bot' },
  ];

  const currentGoalConfig = goals.find((g) => g.id === selectedGoal) || goals[0];

  const recommendedTools = tools
    .filter((tool) => {
      const matchesCategory =
        tool.category === currentGoalConfig.category ||
        (tool.secondaryCategories &&
          tool.secondaryCategories.includes(currentGoalConfig.category as any));

      if (pricingPreference === 'free-only') {
        const hasFree =
          tool.pricing.freeTier.toLowerCase() !== 'no' &&
          tool.pricing.freeTier.toLowerCase() !== 'none';
        return matchesCategory && hasFree;
      }
      return matchesCategory;
    })
    .slice(0, 3);

  return (
    <section id="recommend" className="py-20 bg-[#f6f5f3] border-t border-[rgba(17,17,17,0.08)] text-[#111111]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Amplemarket Typographic Restraint */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[rgba(17,17,17,0.08)] gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#e8400d] text-xs font-mono uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-[#e8400d]" />
              <span>Goal Matching</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#111111] tracking-[-0.04em] leading-[1.1]">
              Find AI For Your Task
            </h2>
            <p className="text-sm text-[#6d6c6b] mt-2 font-normal max-w-xl">
              Tell us what you are trying to accomplish, and the system recommends the most reliable vetted engines.
            </p>
          </div>

          {/* Pricing Preference Toggle: 8px Border Radius */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6d6c6b] font-mono">Filter:</span>
            <div className="p-1 bg-[#ffffff] border border-[rgba(17,17,17,0.08)] rounded-[8px] flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setPricingPreference('all')}
                className={`px-3 py-1.5 rounded-[6px] text-xs transition-colors ${
                  pricingPreference === 'all'
                    ? 'bg-[#111111] text-[#ffffff] font-medium'
                    : 'text-[#6d6c6b] hover:text-[#111111]'
                }`}
              >
                All Models
              </button>
              <button
                onClick={() => setPricingPreference('free-only')}
                className={`px-3 py-1.5 rounded-[6px] text-xs transition-colors ${
                  pricingPreference === 'free-only'
                    ? 'bg-[#111111] text-[#ffffff] font-medium'
                    : 'text-[#6d6c6b] hover:text-[#111111]'
                }`}
              >
                Free-Tier Only
              </button>
            </div>
          </div>
        </div>

        {/* Goal Selector Buttons — 12px Radius Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const pastel = getCategoryPastel(goal.category);
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                style={{
                  backgroundColor: isSelected ? pastel.bg : '#ffffff',
                  color: '#111111'
                }}
                className={`p-4 rounded-[12px] text-left transition-all flex flex-col justify-between gap-2.5 border ${
                  isSelected
                    ? 'border-[rgba(17,17,17,0.2)] shadow-[rgba(17,17,17,0.04)_0px_4px_12px_0px]'
                    : 'border-[rgba(17,17,17,0.08)] hover:border-[rgba(17,17,17,0.18)]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono uppercase tracking-wider text-[10px] text-[#111111] opacity-75 font-medium">
                    {goal.category}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />}
                </div>
                <p className="text-xs font-medium leading-snug">{goal.label}</p>
              </button>
            );
          })}
        </div>

        {/* Recommendations Cards — Light Feature Cards with 12px Radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedTools.map((tool, index) => {
            const pastel = getCategoryPastel(tool.category);
            return (
              <div
                key={tool.id}
                className="p-6 rounded-[12px] bg-[#ffffff] border border-[rgba(17,17,17,0.08)] flex flex-col justify-between gap-4 shadow-[rgba(17,17,17,0.02)_0px_4px_12px_0px]"
              >
                <div>
                  {/* Match Rank Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      style={{ backgroundColor: pastel.bg, color: pastel.text }}
                      className="text-[11px] px-2.5 py-1 rounded-[6px] font-medium flex items-center gap-1.5"
                    >
                      <Target className="w-3 h-3" />
                      <span>#{index + 1} Best Match</span>
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#111111] font-semibold font-mono">
                      <Star className="w-3.5 h-3.5 fill-[#e8400d] text-[#e8400d]" />
                      <span>{tool.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-normal text-[#111111] tracking-[-0.02em]">{tool.name}</h3>
                  <p className="text-xs text-[#6d6c6b] mt-0.5">by {tool.companyName}</p>
                  <p className="text-xs text-[#111111] mt-1 line-clamp-1">{tool.tagline}</p>

                  <p className="text-xs text-[#6d6c6b] mt-2 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Top strength */}
                  <div className="mt-4 p-3.5 rounded-[8px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.06)]">
                    <span className="text-[10px] uppercase font-mono text-[#6d6c6b] block mb-1 font-medium">
                      Why it fits:
                    </span>
                    <p className="text-xs text-[#111111] leading-snug">
                      {tool.strengths[0]}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: 8px Border Radius */}
                <div className="pt-4 border-t border-[rgba(17,17,17,0.06)] space-y-2">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Explore AI</span>
                    <ExternalLink className="w-3 h-3 text-[#ffffff]" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openToolModal(tool)}
                      className="flex-1 py-2 px-3 rounded-[8px] bg-[#ecebea] hover:bg-[#e2e1df] text-[#111111] text-xs font-normal transition-colors"
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => {
                        addToCompare(tool);
                        scrollToSection('compare');
                      }}
                      className="py-2 px-3 rounded-[8px] bg-[#f6f5f3] hover:bg-[#ecebea] text-[#111111] text-xs font-normal border border-[rgba(17,17,17,0.08)] flex items-center gap-1 transition-colors"
                      title="Compare in Matrix"
                    >
                      <Scale className="w-3.5 h-3.5 text-[#e8400d]" />
                      <span>Compare</span>
                    </button>
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
