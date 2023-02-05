import { useEffect, useRef } from 'react';

const useDidUpdate = (f: () => any, dependencies: any[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    return f && f();
  }, dependencies);
};

export default useDidUpdate;