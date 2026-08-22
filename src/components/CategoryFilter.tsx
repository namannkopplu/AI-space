import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  Sparkles,
  GraduationCap,
  Sprout,
  Image,
  Video,
  Bot,
  Zap,
  Layers
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/aiToolsData';

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, tools } = useAIApp();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return GraduationCap;
      case 'Agriculture':
        return Sprout;
      case 'Image Generator':
        return Image;
      case 'Video Generation':
        return Video;
      case 'Chat Bot':
        return Bot;
      case 'Registered Innovation':
        return Zap;
      default:
        return Layers;
    }
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return tools.length;
    if (cat === 'Registered Innovation') {
      return tools.filter(t => t.isCommunityRegistered || t.category === 'Registered Innovation').length;
    }
    return tools.filter(t => t.category === cat || t.secondaryCategories?.includes(cat as any)).length;
  };

  return (
    <div className="w-full bg-[#0a1327] border-y border-white/5 py-2.5 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Categories horizontal scroll container */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar py-0.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Filters:
          </span>

          {CATEGORIES_LIST.map((category) => {
            const isSelected = selectedCategory === category;
            const count = getCategoryCount(category);

            // Hide Registered tab if there are 0 registered items and not currently selected
            if (category === 'Registered Innovation' && count === 0 && !isSelected) {
              return null;
            }

            return (
              <button
                key={category}
                id={`category-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-medium ${
                    isSelected
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="hidden md:inline text-[11px] text-slate-500 shrink-0">
          <strong className="text-blue-400 font-semibold">{tools.length}</strong> AI items
        </span>

      </div>
    </div>
  );
};
