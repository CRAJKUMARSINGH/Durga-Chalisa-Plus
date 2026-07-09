import { useState, useMemo } from 'react';
import type { VerseLine } from '@/data/hindi-aarti';

export function useSearch(verses: VerseLine[]) {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    
    // Check if it's a line number
    const isNumber = /^\d+$/.test(q);
    if (isNumber) {
      const num = parseInt(q, 10);
      const match = verses.find(v => v.id === num);
      return match ? [match] : [];
    }

    // Otherwise search text
    return verses.filter(v => v.text.toLowerCase().includes(q));
  }, [query, verses]);

  return {
    query,
    setQuery,
    results
  };
}
