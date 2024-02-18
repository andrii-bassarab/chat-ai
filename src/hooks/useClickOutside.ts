import { useEffect, MutableRefObject } from 'react';

export const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  condition = true,
) => {
  const handleClickOutside = (event: Event) => {
    const targetNode = event.target as Node;

    if (ref.current && !ref.current.contains(targetNode)) {
      callback();
    }
  };

  useEffect(() => {
    if (!condition) {
      return;
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, condition]);
};
