import React from 'react';
import { Modal, ModalProps } from '..';
import { Loader } from '@/components/Loader';
import './ModalLoader.scss';

export const ModalLoader: React.FC<ModalProps> = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      defaultLayout={false}
      modalContainerClassName='modal-loader'
    >
      <Loader size='large' />
    </Modal>
  );
};
