import { create } from 'zustand';

interface PolicyViewerState {
  // Currently open document
  openDocumentId: string | null;
  openDocumentName: string | null;

  // Read event ID returned by the API when viewer opens
  currentReadEventId: string | null;

  // Actions
  openViewer: (id: string, name: string) => void;
  closeViewer: () => void;
  setReadEventId: (id: string) => void;
}

export const usePolicyStore = create<PolicyViewerState>((set) => ({
  openDocumentId: null,
  openDocumentName: null,
  currentReadEventId: null,

  openViewer: (id, name) =>
    set({ openDocumentId: id, openDocumentName: name, currentReadEventId: null }),

  closeViewer: () =>
    set({ openDocumentId: null, openDocumentName: null, currentReadEventId: null }),

  setReadEventId: (id) => set({ currentReadEventId: id }),
}));
