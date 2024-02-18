import { getAllDocuments } from '@/api/document/getAllDocuments';
import { toastStyles } from '@/services/toastify/defaultStyles';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Actions, State, filterDocumentsVariants } from './types';
import { IDocument } from '@/types/Document';

const notifyErrorFetchDocument = () => toast.error('Failed to fetch documents!', toastStyles);

export const useDocuments = create<State & Actions>()(
  persist(
    (set, get) => ({
      documents: [],
      lastViewedDocument: [],
      displayedDocument: [],
      loading: false,
      error: null,
      filter: {key: 'lastViewed', value: 'Latest Viewed'},
      isInitialized: false,
      setDocuments: (documents) => set(() => ({ documents })),
      setFilter: (filter) =>
        set(() => ({
          filter: filterDocumentsVariants.find(variant => variant.key === filter)
        })),
      fetchDocuments: async (userId) => {
        if (get().isInitialized) {
          return;
        }

        try {
          set({ documents: [], loading: true, error: null });
          const { data } = await getAllDocuments(userId);
          set({ documents: data });
          set({ isInitialized: true });

          // if (get().lastViewedDocument.length === 0) {
          //   set({ lastViewedDocument: data });
          // }

          // set({ displayedDocument: get().lastViewedDocument });

          return data;
        } catch (error) {
          notifyErrorFetchDocument();
          set({ error: error as Error });
        } finally {
          set({ loading: false });
        }
      },
      refetchDocuments: async (userId) => {
        try {
          set({ documents: [], loading: true, error: null });
          const { data } = await getAllDocuments(userId);
          set({ documents: data, displayedDocument: data });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ loading: false });
        }
      },
      addOneToLastViewedDocument: (document) => {
        const prevLastViewed = get().lastViewedDocument;

        const indexDocumentToAdd = prevLastViewed.findIndex((file) => {
          return file?.document_id === document?.document_id;
        });

        if (indexDocumentToAdd !== -1) {
          const restLastViewed = prevLastViewed.filter(
            (file) => file?.document_id !== document?.document_id,
          );

          const newLastViewed = [prevLastViewed[indexDocumentToAdd], ...restLastViewed];

          set({ lastViewedDocument: newLastViewed });
        }
      },
      setLastViewedDocuments: (lastViewedDocument: IDocument[]) => set(() => ({ lastViewedDocument })),
    }),
    {
      name: 'documents',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ documents, lastViewedDocument }) => ({
        documents,
        lastViewedDocument,
      }),
    },
  ),
);
