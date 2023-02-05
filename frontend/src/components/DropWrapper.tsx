import React, { RefObject, useEffect } from 'react';

interface IDropWrapperProps {
  dropWrapperRef: RefObject<HTMLDivElement>;
  closeDropWrapper: (flag?: boolean) => void;
  className?: string;
};

const DropWrapper: React.FC<IDropWrapperProps> = (props) => {
  const {
    dropWrapperRef,
    closeDropWrapper,
  } = props;

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent): void => {
      dropWrapperRef 
        && dropWrapperRef.current 
        && !dropWrapperRef.current.contains(e.target as HTMLDivElement) 
        && closeDropWrapper(false);
    };

    const closeOnKeyup = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        return closeDropWrapper(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keyup', closeOnKeyup);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keyup', closeOnKeyup);
    };
  }, []);

  return (
    <div className={props.className} ref={dropWrapperRef}>
      {props.children}
    </div>
  );
};

export default DropWrapper;