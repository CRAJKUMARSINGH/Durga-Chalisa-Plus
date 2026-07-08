import { useState, useMemo } from 'react';
import { durgaChalisa } from '@/data/durga-chalisa';

export function useSearch() {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    
    // Check if it's a line number
    const isNumber = /^\d+$/.test(q);
    if (isNumber) {
      const num = parseInt(q, 10);
      const match = durgaChalisa.find(v => v.id === num);
      return match ? [match] : [];
    }

    // Otherwise search text
    return durgaChalisa.filter(v => v.text.includes(q));
  }, [query]);

  return {
    query,
    setQuery,
    results
  };
}
