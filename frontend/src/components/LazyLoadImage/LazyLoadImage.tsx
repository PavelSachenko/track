import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

import './LazyLoadImage.scss';


interface ILazyLoadImageProps {
  src: string;
  alt?: string;
  spinnerSize?: string;
  classPrefix?: string;
  spinnerClassName?: string;
}


const LazyLoadImage = (props: ILazyLoadImageProps) => {
  const [state, setState] = useState<{
    imageLoaded: boolean,
    error: string,
  }>({
    imageLoaded: false,
    error: '',
  });

  const onLoad = () => setState({ imageLoaded: true, error: '' });

  const onError = () => setState({ imageLoaded: true, error: 'Failed to load image...' });

  return (
    <div className={props.classPrefix ? `lazy-load__wrap ${props.classPrefix}` : 'lazy-load__wrap'}>
      {!state.imageLoaded &&
        <Spinner
          size={props.spinnerSize}
          className={props.spinnerClassName}
        />
      }

      <img
        src={props.src}
        alt={props.alt || 'image'}
        onLoad={onLoad}
        onError={onError}
        title={state.error}
      />
    </div>
  );
};

export default LazyLoadImage;