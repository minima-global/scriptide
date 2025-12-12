// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import isImageFile from '@/utils/isImageFile';
// Import stores
import useEditorStore from './useEditorStore';
import useWorkspaceStore from './useWorkspaceStore';
import listAllFiles from '@/utils/listAllFiles';
// Import types
import { IFileStore, TFile } from '@/types';

// Create the store
const useFileStore = create<IFileStore>((set, get) => ({
  files: [],
  setFiles: (files) => set({ files }),
  allFiles: [],
  setAllFiles: (files) => set({ allFiles: files }),

  refreshFiles: async (workspace, loader: boolean = true) => {
    if (loader) {
      set({ isLoadingFiles: true });
    }

    const files = await listAllFiles(workspace);
    // console.log(files);
    const allFiles: TFile[] = [];
    for (const file of files) {
      const parent = file.location.split('/').splice(3);
      let currentLevel = allFiles;

      for (let i = 0; i < parent.length; i++) {
        const key = parent[i];

        if (key === file.name && file.isfile) {
          continue;
        }

        let indexOf = currentLevel.findIndex((f: TFile) => f.name === key);

        if (indexOf === -1) {
          const find = files.find((f: TFile) => {
            const location = f.location.split('/').pop();

            return location === key;
          });
          // console.log(find);

          if (!find) {
            continue;
          }

          currentLevel.push({
            ...find,
            _children: [],
            isfile: false,
          });

          indexOf = currentLevel.length - 1;
        }

        currentLevel = currentLevel[indexOf]._children || [];
      }

      if (file.isfile) {
        currentLevel.push(file);
      }
    }
    // console.log(allFiles);

    set({ files, allFiles });

    if (get().isLoadingFiles) {
      set({ isLoadingFiles: false });
    }
  },
  addFile: async (path, data) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      return;
    }

    await minima.file.save(path, data || '');

    get().refreshFiles(currentWorkspace, false);
    set({ currentFile: path });
    useEditorStore.setState({ code: data || '' });
    useEditorStore.getState().addCode(path, data || '', false);
  },
  addFolder: async (path) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.makedir(path);

    get().refreshFiles(currentWorkspace, false);
    set({ currentFolder: path });
  },
  renameFile: async (path, newPath) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.copy(path, newPath);
    await minima.file.delete(path);

    get().refreshFiles(currentWorkspace, false);

    if (get().currentFile === path) {
      set({ currentFile: newPath });
    }
  },
  saveFile: async (path, data) => {
    if (!path) {
      return;
    }
    if (isImageFile(path)) {
      return;
    }

    await minima.file.save(path, data);
  },
  loadFile: async (path) => {
    if (!path) {
      return;
    }

    if (isImageFile(path)) {
      const binary =
        (await minima.file.loadbinary(path)).response?.load.data || '';
      const base64 = minima.util.hexToBase64(binary);
      // useEditorStore.setState({ code: base64 });
      useEditorStore.getState().addCode(path, base64, true);
      return;
    }

    const code = (await minima.file.load(path)).response?.load.data || '';
    // useEditorStore.setState({ code });
    useEditorStore.getState().addCode(path, code, false);
  },
  deleteFile: async (path) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      return;
    }

    await minima.file.delete(path);

    if (path === get().currentFile) {
      set({ currentFile: null });
      useEditorStore.setState({ code: null });
    }

    get().refreshFiles(currentWorkspace, false);
    useEditorStore.getState().removeCode(path);
  },
  deleteAllFiles: async () => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.delete(`workspaces/${currentWorkspace}`);
    await minima.file.makedir(`workspaces/${currentWorkspace}`);

    set({ files: [], allFiles: [] });
    useEditorStore.getState().setAllCodes([]);
  },
  deleteFolder: async (path) => {
    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      return;
    }

    await minima.file.delete(path);

    if (get().currentFile?.includes(path)) {
      set({ currentFile: null });
      useEditorStore.setState({ code: null });
    }
    if (get().currentFolder?.includes(path)) {
      set({ currentFolder: null });
    }

    get().refreshFiles(currentWorkspace, false);
    useEditorStore.getState().removeFolderCodes(path);
  },

  currentFile: null,
  setCurrentFile: (file) => set({ currentFile: file }),
  currentFolder: null,
  setCurrentFolder: (folder) => set({ currentFolder: folder }),

  isLoadingFiles: false,
  setIsLoadingFiles: (isLoadingFiles) => set({ isLoadingFiles }),
  isAddingFile: false,
  setIsAddingFile: (isAddingFile) => set({ isAddingFile }),
  isFolder: null,
  setIsFolder: (isFolder) => set({ isFolder }),
}));

// Export the store
export default useFileStore;
