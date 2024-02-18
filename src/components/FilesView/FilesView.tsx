import './FilesView.scss';
import PdfIcom from '@assets/images/pdf-icon.svg';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader';
import { ellipsisString } from '@/utils/document';
import { useEffect } from 'react';
import { useDisplayedDocuments, useDocuments } from '@/store/documents';
import Highlighter from 'react-highlight-words';
import { useSearchOnDocument } from '@/store/searchOnDocument';
import { useCurrentDocument } from '@/store/currentDocument';
import { useUserStore } from '@/store/user';
import { RoutesPath } from '@/router/routes-path';

export const FilesView = () => {
  const { loading, fetchDocuments, isInitialized } = useDocuments();
  const { displayedDocument } = useDisplayedDocuments();
  const { setDocument } = useCurrentDocument();
  const { userId } = useUserStore();
  const { input } = useSearchOnDocument();

  useEffect(() => {
    fetchDocuments(userId!);
  }, []);

  return (
    <div className='filesview_container'>
      {loading && <Loader className='loader-container' />}
      {isInitialized &&
        !loading &&
        displayedDocument.map(
          ({ document_id, filename, mimeType, extractedText, ...restProps }) => (
            <div key={document_id}>
              <Link
                className='filesview_container-item'
                to={`${RoutesPath.docView}${document_id}`}
                onClick={() =>
                  setDocument({ document_id, filename, mimeType, extractedText, ...restProps })
                }
              >
                <img className='filesview_container-item-image' src={PdfIcom} alt='PdfIcon' />
                <span
                  className={`filesview_container-item-file${
                    mimeType === 'application/pdf' ? 'PDF' : 'DOC'
                  }`}
                >
                  {mimeType === 'application/pdf' ? 'PDF' : 'DOC'}
                </span>
              </Link>
              <h3 className='filesview_container-item-title'>
                <Highlighter searchWords={[input]} autoEscape={true} textToHighlight={filename} />
              </h3>
              <p className='filesview_container-item-subtitle'>
                <Highlighter
                  searchWords={[input]}
                  autoEscape={true}
                  textToHighlight={ellipsisString(extractedText)}
                />
              </p>
            </div>
          ),
        )}
    </div>
  );
};
