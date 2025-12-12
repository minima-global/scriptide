// Import dependencies
import { create } from 'zustand';
// Import types
import { IEditorStore, ILocalStorage } from '@/types';

// Create the store
const useEditorStore = create<IEditorStore>((set) => ({
  code: null,
  setCode: (code) => set({ code }),

  allCodes: [],
  setAllCodes: (allCodes) => set({ allCodes }),

  tabIndex: 0,
  setTabIndex: (tabIndex) => set({ tabIndex }),

  addCode: (file, code, isImg) => {
    set((state) => {
      const allCodes = [...state.allCodes];

      if (allCodes.find((c) => c.file === file)) {
        return {
          tabIndex: allCodes.findIndex((c) => c.file === file),
        };
      }

      return {
        allCodes: [...allCodes, { file, code, isImg }],
        tabIndex: allCodes.length,
      };
    });
  },
  updateCode: (file, code) => {
    set((state) => ({
      allCodes: state.allCodes.map((c) =>
        c.file === file ? { ...c, code } : c
      ),
    }));
  },
  removeCode: (file) => {
    set((state) => ({
      allCodes: state.allCodes.filter((code) => code.file !== file),
    }));
  },
  removeFolderCodes: (folder) => {
    set((state) => {
      let allCodes = [...state.allCodes];
      for (const code of allCodes) {
        if (code.file.includes(folder)) {
          allCodes = allCodes.filter((c) => c.file !== code.file);
        }
      }

      let tabIndex = state.tabIndex;
      const currentCode = state.allCodes[tabIndex];
      if (!currentCode?.file.includes(folder)) {
        tabIndex = allCodes.indexOf(currentCode);
      } else if (tabIndex > allCodes.length - 1) {
        tabIndex = allCodes.length > 0 ? allCodes.length - 1 : 0;
      }

      return {
        allCodes,
        tabIndex,
      };
    });
  },

  editorZoom: Number(localStorage.getItem('editor-zoom')) || 0,
  setEditorZoom: (editorZoom) => {
    set({ editorZoom });
    localStorage.setItem('editor-zoom', editorZoom.toString());
  },
  editorZoomIn: () =>
    set((state) => {
      const zoomIn = state.editorZoom + 1;

      localStorage.setItem('editor-zoom', zoomIn.toString());
      return { editorZoom: zoomIn };
    }),
  editorZoomOut: () =>
    set((state) => {
      const zoomOut = state.editorZoom - 1;

      localStorage.setItem('editor-zoom', zoomOut.toString());
      return { editorZoom: zoomOut };
    }),

  editorAutoSave:
    JSON.parse((localStorage as ILocalStorage).getItem('editor-auto-save')) ||
    false,
  setEditorAutoSave: (editorAutoSave) => {
    set({ editorAutoSave });
    localStorage.setItem('editor-auto-save', JSON.stringify(editorAutoSave));
  },
  toggleEditorAutoSave: () =>
    set((state) => {
      const saveState = !state.editorAutoSave;

      localStorage.setItem('editor-auto-save', JSON.stringify(saveState));
      return { editorAutoSave: saveState };
    }),
}));

// Export
export default useEditorStore;
