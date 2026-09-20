import React from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  GraduationCap,
  Sprout,
  Image,
  Video,
  Bot,
  Zap,
  Layers
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/aiToolsData';
import { getCategoryPastel } from '../lib/taxonomy';

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
    <div className="w-full bg-[#ffffff]/95 border-y border-[rgba(17,17,17,0.08)] py-3 sticky top-[62px] z-30 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Categories horizontal scroll container */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar py-0.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6d6c6b] shrink-0 mr-1.5">
            Categories:
          </span>

          {CATEGORIES_LIST.map((category) => {
            const isSelected = selectedCategory === category;
            const count = getCategoryCount(category);
            const Icon = getCategoryIcon(category);
            const pastel = getCategoryPastel(category);

            // Hide Registered tab if there are 0 registered items and not currently selected
            if (category === 'Registered Innovation' && count === 0 && !isSelected) {
              return null;
            }

            return (
              <button
                key={category}
                id={`category-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: isSelected
                    ? (category === 'All' ? '#111111' : pastel.bg)
                    : '#f6f5f3',
                  color: isSelected
                    ? (category === 'All' ? '#ffffff' : '#111111')
                    : '#6d6c6b'
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] text-xs font-normal whitespace-nowrap transition-all shrink-0 border ${
                  isSelected
                    ? (category === 'All' ? 'border-[#111111] font-medium' : 'border-[rgba(17,17,17,0.14)] font-medium')
                    : 'border-transparent hover:border-[rgba(17,17,17,0.1)] hover:text-[#111111]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? (category === 'All' ? 'bg-[#272625] text-[#ffffff]' : 'bg-[rgba(17,17,17,0.08)] text-[#111111]')
                      : 'bg-[#ecebea] text-[#6d6c6b]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <span className="hidden md:inline text-xs text-[#6d6c6b] shrink-0 font-normal">
          <strong className="text-[#111111] font-medium">{tools.length}</strong> vetted entries
        </span>

      </div>
    </div>
  );
};
