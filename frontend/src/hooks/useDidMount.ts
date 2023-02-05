import { useEffect, EffectCallback } from 'react';

const useDidMount = (fn: EffectCallback) => useEffect(() => fn && fn(), []);

export default useDidMount;
