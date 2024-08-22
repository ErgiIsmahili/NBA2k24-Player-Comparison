import { useCallback, useRef } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => callback(), delay);
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;