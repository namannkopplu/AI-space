import { AICategory } from '../types';

export interface PastelCategoryToken {
  bg: string;
  text: string;
  name: string;
  border: string;
  lightWash: string;
}

export const PASTEL_TAXONOMY: Record<string, PastelCategoryToken> = {
  'Education': {
    bg: '#b7efb2',
    text: '#111111',
    name: 'Mint Green',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: 'rgba(183, 239, 178, 0.25)'
  },
  'Agriculture': {
    bg: '#ffef99',
    text: '#111111',
    name: 'Canary Yellow',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: 'rgba(255, 239, 153, 0.25)'
  },
  'Image Generator': {
    bg: '#ffd7f0',
    text: '#111111',
    name: 'Petal Pink',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: 'rgba(255, 215, 240, 0.25)'
  },
  'Video Generation': {
    bg: '#e2ddfd',
    text: '#111111',
    name: 'Soft Violet',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: 'rgba(226, 221, 253, 0.25)'
  },
  'Chat Bot': {
    bg: '#99fff9',
    text: '#111111',
    name: 'Aqua',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: 'rgba(153, 255, 249, 0.25)'
  },
  'Registered Innovation': {
    bg: '#ecebea',
    text: '#111111',
    name: 'Pearl',
    border: 'rgba(17, 17, 17, 0.12)',
    lightWash: '#f6f5f3'
  }
};

export function getCategoryPastel(category: string): PastelCategoryToken {
  return (
    PASTEL_TAXONOMY[category] || {
      bg: '#ecebea',
      text: '#111111',
      name: 'Pearl',
      border: 'rgba(17, 17, 17, 0.12)',
      lightWash: '#f6f5f3'
    }
  );
}
