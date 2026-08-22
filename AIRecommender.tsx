import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Scale,
  Star,
  Target,
  Zap,
  Tag
} from 'lucide-react';
import { AITool } from '../types';

export const AIRecommender: React.FC = () => {
  const { tools, openToolModal, addToCompare, scrollToSection } = useAIApp();

  const [selectedGoal, setSelectedGoal] = useState<string>('study-notes');
  const [pricingPreference, setPricingPreference] = useState<string>('any');

  const goals = [
    {
      id: 'study-notes',
      label: 'Study, Lecture Notes & Socratic Tutoring',
      category: 'Education',
      recommendedIds: ['notebooklm', 'chatgpt', 'claude']
    },
    {
      id: 'crop-farm',
      label: 'Crop Health, Weather & Agronomy Risk',
      category: 'Agriculture',
      recommendedIds: ['agri-ai', 'climate-ai']
    },
    {
      id: 'image-art',
      label: 'Fine Art, Character Consistency & Graphic Assets',
      category: 'Image Generator',
      recommendedIds: ['leo-ai', 'google-gemini']
    },
    {
      id: 'video-motion',
      label: 'Social Video Loops, Motion Animation & Clips',
      category: 'Video Generation',
      recommendedIds: ['meta-ai', 'google-gemini']
    },
    {
      id: 'verified-search',
      label: 'Live Web Research & Verified Citations',
      category: 'Chat Bot',
      recommendedIds: ['perplexity-ai', 'grok-ai']
    }
  ];

  const currentGoal = goals.find((g) => g.id === selectedGoal) || goals[0];

  const recommendedTools = tools
    .filter((tool) => {
      const isTargeted = currentGoal.recommendedIds.includes(tool.id) || tool.category === currentGoal.category;
      if (pricingPreference === 'free-only') {
        return isTargeted && (tool.pricing.model === 'Free' || tool.pricing.freeTier.toLowerCase().includes('free'));
      }
      return isTargeted;
    })
    .slice(0, 3);

  return (
    <section id="recommender" className="py-10 bg-[#050b18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Recommendation Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold border-l-2 border-blue-500 pl-3 text-white">
              Find AI for Your Specific Task
            </h2>
            <p className="text-xs text-slate-400 mt-1 pl-3">
              Select your immediate goal to find the highest-performing authentic AI model.
            </p>
          </div>

          {/* Pricing Filter Toggle */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="text-[11px]">Budget:</span>
            <button
              onClick={() => setPricingPreference('any')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                pricingPreference === 'any'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setPricingPreference('free-only')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                pricingPreference === 'free-only'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 font-semibold'
                  : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:text-white'
              }`}
            >
              Free-Tier Only
            </button>
          </div>
        </div>

        {/* Goal Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 max-w-5xl mb-6">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`p-3 rounded-lg text-left transition-colors flex flex-col justify-between gap-1 border ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500/40 text-white'
                    : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-blue-400 uppercase tracking-wider">
                    {goal.category}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <p className="text-[11px] font-medium leading-tight">{goal.label}</p>
              </button>
            );
          })}
        </div>

        {/* Recommendations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
          {recommendedTools.map((tool, index) => (
            <div
              key={tool.id}
              className="p-4 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between gap-3 hover:border-blue-500/30 transition-colors"
            >
              <div>
                {/* Match Rank Pill */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-blue-500/10 text-blue-400 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>#{index + 1} Best Match</span>
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{tool.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base">{tool.name}</h3>
                <p className="text-[11px] text-slate-500">by {tool.companyName}</p>
                <p className="text-[11px] text-blue-300/90 mt-1 line-clamp-1">{tool.tagline}</p>

                <p className="text-[11px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>

                {/* Top strength */}
                <div className="mt-2.5 p-2 rounded bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-500 block mb-0.5 font-medium">
                    Why it fits:
                  </span>
                  <p className="text-[11px] text-slate-300">
                    {tool.strengths[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Explore AI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openToolModal(tool)}
                    className="flex-1 py-1.5 px-2 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px] font-medium border border-white/5 transition-colors"
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => {
                      addToCompare(tool);
                      scrollToSection('compare');
                    }}
                    className="py-1.5 px-2.5 rounded bg-slate-800 text-blue-400 hover:text-blue-300 text-[11px] font-medium border border-white/5 flex items-center gap-1 transition-colors"
                    title="Compare in Matrix"
                  >
                    <Scale className="w-3 h-3" />
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
