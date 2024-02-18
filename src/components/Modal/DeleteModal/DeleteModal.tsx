import React from 'react';
import { Modal, ModalProps } from '..';
import './DeleteModal.scss';
import { useCurrentDocument } from '@/store/currentDocument';
import { Navigate, useNavigate } from 'react-router';
import { useLazyFetch } from '@/hooks/useLazyFetch';
import { deleteDocument } from '@/api/document/deleteFile';
import { ModalLoader } from '../ModalLoader';
import { useDocuments } from '@/store/documents';
import { useUserStore } from '@/store/user';
import { toast } from 'react-toastify';
import { toastStyles } from '@/services/toastify/defaultStyles';

interface IProps extends ModalProps {}

export const DeleteModal: React.FC<IProps> = ({ isOpen, handleClose }) => {
  const { document } = useCurrentDocument();
  const navigate = useNavigate();
  const { refetchDocuments } = useDocuments();
  const { userId } = useUserStore();

  const notifyErrorDelete = () => toast.error('Failed to delete a document!', toastStyles);
  const notifySuccessDelete = () => toast.success('Document was successfully deleted!', toastStyles);
  const [deleteDocumentById, { loading }] = useLazyFetch({
    apiFunction: deleteDocument,
    successfullyCallback: () => refetchDocuments(userId!).finally(() => (navigate('/'), notifySuccessDelete())),
    failedCallback: notifyErrorDelete,
    finallyCallback: handleClose
  });

  if (!isOpen) {
    return null;
  }

  if (!document) {
    return <Navigate to='/' />;
  }

  if (loading) {
    return <ModalLoader isOpen={true} />;
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      contentContainerClassName='delete-modal'
      modalContainerClassName='delete-modal-container'
    >
      <h3 className='delete-modal__title'>Are you sure you want to delete this file?</h3>
      <p className='delete-modal__file-name'>{`${document.filename}.${
        document.mimeType.split('/')[1]
      }`}</p>
      <div className='delete-modal__button-container'>
        <button className='delete-modal-btn delete-modal-btn--no' onClick={handleClose}>
          <span className='delete-modal-btn__text'>No</span>
        </button>
        <button
          className='delete-modal-btn delete-modal-btn--yes'
          onClick={() => deleteDocumentById(userId!, document.document_id)}
        >
          <span className='delete-modal-btn__text'>Yes</span>
        </button>
      </div>
    </Modal>
  );
};
