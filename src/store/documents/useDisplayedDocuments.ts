import { useEffect } from 'react';
import { useDocuments } from './store';
import { getDisplayedDocumentsByFilter } from './helper';

export const useDisplayedDocuments = () => {
  const documentsState = useDocuments();

  const { filter, documents, lastViewedDocument, setLastViewedDocuments, loading } = documentsState;

  useEffect(() => {
    if (loading || !Array.isArray(documents)) return; 
    const idsLastViewedDocuments = lastViewedDocument.map(({ document_id }) => document_id);

    const idsDocuments = documents?.map(({ document_id }) => document_id);

    const newDocuments = documents?.filter(
      ({ document_id }) => !idsLastViewedDocuments.includes(document_id),
    );

    const filteredLastViewed = lastViewedDocument.filter(({ document_id }) =>
      idsDocuments.includes(document_id),
    );

    setLastViewedDocuments([...newDocuments, ...filteredLastViewed]);
  }, [documents]);

  const displayedDocument = getDisplayedDocumentsByFilter(documentsState, filter.key);

  return {
    displayedDocument,
  };
};
