// src/hooks/useRotatingWords.ts
import { useEffect, useState } from 'react';

export function useRotatingWords(words: string[], interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return words[index];
}
