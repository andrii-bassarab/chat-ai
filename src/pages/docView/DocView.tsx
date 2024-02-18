import Chat from '@/components/Chat/Chat';
import './DocView.scss';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect } from 'react';
import { Document } from '@/components/Document';
import { Navigate, useNavigate } from 'react-router';
import { useCurrentDocument } from '@/store/currentDocument';
import { useLazyFetch } from '@/hooks/useLazyFetch';
import { getDocumentById } from '@/api/document';
import { useParams } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { RoutesPath } from '@/router/routes-path';
import { ModalLoader } from '@/components/Modal/ModalLoader';
import { toast } from 'react-toastify';
import { toastStyles } from '@/services/toastify/defaultStyles';
import { useDocuments } from '@/store/documents';

export const DocView = () => {
  const notifyErrorFetchDocument = () => toast.error('Failed to fetch a document!', toastStyles);

  const navigate = useNavigate();

  const { userId } = useUserStore();
  const { id: documentId } = useParams();
  const { addOneToLastViewedDocument } = useDocuments();
  const { document, setDocument } = useCurrentDocument();
  const [fetchDocument, { data, loading, error }] = useLazyFetch({
    apiFunction: getDocumentById,
    failedCallback: notifyErrorFetchDocument,
  });

  useEffect(() => {
    if (!document && documentId && userId) {
      fetchDocument(userId!, documentId);
      return;
    }

    if (!document) {
      navigate(RoutesPath.home);
    }
  }, []);

  useEffect(() => {
    document && addOneToLastViewedDocument(document);
  }, [document]);

  useEffect(() => {
    data && setDocument(data);
  }, [data]);

  if (!document && error && !loading) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div className='docView__container'>
        <div className='docView__container-filesView'>
          <Document document={document} />
        </div>
        <Chat userId='1231233' document={document!} />
      </div>
      <ModalLoader isOpen={loading} />
    </>
  );
};
