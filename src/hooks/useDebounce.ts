import { useCallback } from 'react';
import { debounce } from '../lib/utils';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  return useCallback(debounce(callback, delay), [callback, delay]);
}