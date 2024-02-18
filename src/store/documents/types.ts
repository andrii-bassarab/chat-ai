import { IDocument } from '@/types/Document';

export type Filter = 'all' | 'lastSaved' | 'lastViewed';

export const filterDocumentsVariants = [
  { key: 'all', value: 'All' },
  { key: 'lastSaved', value: 'Last Saved' },
  { key: 'lastViewed', value: 'Latest Viewed' },
] as const;

type FilterKey = (typeof filterDocumentsVariants)[number];

export type State = {
  documents: IDocument[];
  loading: boolean;
  error: null | Error;
  filter: FilterKey;
  isInitialized: boolean;
  displayedDocument: IDocument[];
  lastViewedDocument: IDocument[];
};

export type Actions = {
  setDocuments: (documents: IDocument[]) => void;
  setFilter: (newFilter: Filter) => void;
  fetchDocuments: (userId: string) => Promise<IDocument[] | undefined>;
  refetchDocuments: (userId: string) => Promise<void>;
  addOneToLastViewedDocument: (document: IDocument) => void;
  setLastViewedDocuments: (documents: IDocument[]) => void;
};
