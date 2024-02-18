import { sortFilesByDate } from '@/utils/files';
import { Actions, Filter, State } from './types';

export const getDisplayedDocumentsByFilter = (state: State & Actions, filter: Filter) => {
  switch (filter) {
    case 'all':
      return state.documents;
    case 'lastSaved':
      return sortFilesByDate(state.documents);
    case 'lastViewed':
      return state.lastViewedDocument;
    default:
      return state.documents;
  }
};
