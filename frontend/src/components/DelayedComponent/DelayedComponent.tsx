import { useEffect, useState } from 'react';
import { usePrevious } from '../../hooks';

interface IDelayedComponentProps {
  isMount: boolean;
  delayUnmountTime?: number;
} 

// Use when we need animate element before he will unmount
const DelayedComponent: React.FC<IDelayedComponentProps> = (props) => {
  const { isMount } = props;

  const [shouldRender, setShouldRender] = useState(isMount);
  const prevIsMount = usePrevious(isMount);

  useEffect(() => {
    let timer: number;

    if (!isMount && prevIsMount) {
      timer = window.setTimeout(() => {
        setShouldRender(false);
      }, props.delayUnmountTime || 500);
    }
    else if (!prevIsMount && isMount) {
      setShouldRender(true)
    }

    return () => {
      clearTimeout(timer);
    }
  }, [shouldRender, isMount])

  return (
    <>
      {shouldRender
        ? props.children
        : null}
    </>
  )
 
}

export default DelayedComponent;