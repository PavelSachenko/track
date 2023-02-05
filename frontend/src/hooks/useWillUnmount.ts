import { useEffect } from 'react';

const useWillUnmount = (fn: () => void) => useEffect(() => () => fn && fn(), []);

export default useWillUnmount;
