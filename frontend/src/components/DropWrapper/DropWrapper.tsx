import React, { useEffect } from 'react';

import './DropWrapper.scss';

interface IDropWrapperProps {
  dropWrapperRef: any;
  closeDropWrapper: (flag?: boolean) => void;
  className?: string;
  children?: React.ReactNode;
};

const DropWrapper = (props: IDropWrapperProps) => {
  const {
    dropWrapperRef,
    closeDropWrapper,
  } = props;

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent): void => {
      !dropWrapperRef.current?.contains(e.target) && closeDropWrapper(false)
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