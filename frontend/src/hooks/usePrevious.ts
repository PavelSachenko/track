import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
