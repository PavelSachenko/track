import React, { useCallback, useEffect, useState } from 'react';

import { classModifier } from '../../utils';

import './Modal.scss';
import DelayedComponent from '../DelayedComponent/DelayedComponent';

interface IModalProps {
  onClose: () => void;
  isCloseOutside: boolean;
}

const Modal: React.FC<IModalProps> = (props) => {
  const {
    onClose,
    isCloseOutside = true,
  } = props;

  const [isMount, setMount] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const closeModalOnKeyup = (e: KeyboardEvent) => {
      if (!pending && (e.key === 'Escape')) {
        setMount(false);

        onClose();
      }
    }
    document.addEventListener('keyup', closeModalOnKeyup);

    return () => {
      document.removeEventListener('keyup', closeModalOnKeyup);
    }
  }, [pending]);

  const closeModalOnClick = (e: React.MouseEvent) => {
    if (!isCloseOutside || pending) return;

    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  const closeModal = useCallback(() => {
    setMount(false);
    onClose();
  }, []);

  return (
    <DelayedComponent
      delayUnmountTime={600}
      isMount={isMount}
    >
      <div
        className={classModifier('modal', [!isMount && 'close'])}
        onClick={closeModalOnClick}
      >
        <div className={classModifier('modal__item', [!isMount && 'close'])}>
          {(typeof props.children === 'function')
            ? props.children(closeModal, setPending, pending)
            : props.children
          }
        </div>
      </div>
    </DelayedComponent>
  );
};

export default Modal;