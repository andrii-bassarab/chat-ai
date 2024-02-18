import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import classNames from 'classnames';

export interface ModalProps {
  children?: ReactNode;
  wrapperId?: string;
  defaultLayout?: boolean;
  handleClose?: () => void;
  isOpen: boolean;
  contentContainerClassName?: string;
  modalContainerClassName?: string;
  modalOverlayClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  wrapperId = 'root',
  defaultLayout = true,
  handleClose,
  isOpen,
  contentContainerClassName,
  modalContainerClassName,
  modalOverlayClassName,
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose?.() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  const defaultModalLayout = (
    <div className={classNames('modal', {
        [modalOverlayClassName || ""]: !!modalOverlayClassName
    })}>
      {defaultLayout ?<div
        className={classNames('modal__content ', {
          [modalContainerClassName || '']: !!modalContainerClassName,
        })}
      >
        <div
          className={classNames('modal__card ', {
            [contentContainerClassName || '']: !!contentContainerClassName,
          })}
        >
          {children}
        </div>
        <button onClick={handleClose} className='modal__close-btn'>
          &times;
        </button>
      </div> : children}
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return createPortal(defaultModalLayout, document.getElementById(wrapperId)!);
};
