// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import getFiles from '@/utils/getFiles';
// Import stores
import useEditorStore from './useEditorStore';
import useFileStore from './useFileStore';
// Import constants
import { LOCAL_STORAGE_KEYS } from '@/constants';
// Import types
import { IWorkspaceStore } from '@/types';

// Create the store
const useWorkspaceStore = create<IWorkspaceStore>((set, get) => ({
  workspaces: [],
  setWorkspaces: (workspaces: string[]) => set({ workspaces }),

  refreshWorkspaces: async () => {
    const workspaces: string[] = await getFiles('workspaces');
    set({ workspaces });

    if (workspaces.length < 1) {
      set({ currentWorkspace: null });
      useFileStore.setState({
        files: [],
        allFiles: [],
        currentFile: null,
        currentFolder: null,
      });
      useEditorStore.setState({ code: null, allCodes: [], tabIndex: 0 });
      return;
    }

    const storedWorkspace = localStorage.getItem(
      LOCAL_STORAGE_KEYS.storedWorkspace
    );
    if (storedWorkspace) {
      set({ currentWorkspace: storedWorkspace });
      useFileStore.getState().refreshFiles(storedWorkspace);
      return;
    }

    const workspace = get().currentWorkspace;
    if (!workspace || !workspaces.includes(workspace)) {
      const firstWorkspace = workspaces[0];
      set({ currentWorkspace: firstWorkspace });
      useFileStore.getState().refreshFiles(firstWorkspace);
      useFileStore.setState({ currentFile: null, currentFolder: null });
      useEditorStore.setState({ code: null, allCodes: [], tabIndex: 0 });
      return;
    }

    set({ currentWorkspace: workspace });
    useFileStore.getState().refreshFiles(workspace);
  },
  addWorkspace: async (newWorkspace: string) => {
    await minima.file.makedir(`workspaces/${newWorkspace}`);

    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
    set({ currentWorkspace: newWorkspace });

    localStorage.setItem(LOCAL_STORAGE_KEYS.storedWorkspace, newWorkspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    useFileStore.setState({ files: [] });
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  renameWorkspace: async (newWorkspace: string) => {
    const currentWorkspace = get().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    const currentFolder = `workspaces/${currentWorkspace}`;
    const newFolder = `workspaces/${newWorkspace}`;

    await minima.file.copy(currentFolder, newFolder);

    /* Quick fix to a renaming bug, where you can rename a workspace
     * to the same name but in different case (lowercase or uppercase).
     */
    if (
      newWorkspace.toLocaleLowerCase() !== currentWorkspace.toLocaleLowerCase()
    ) {
      await minima.file.delete(currentFolder);
    } else {
      const tempFolder = `${newFolder}_temp`;

      await minima.file.copy(currentFolder, tempFolder);
      await minima.file.delete(currentFolder);
      await minima.file.copy(tempFolder, newFolder);
      await minima.file.delete(tempFolder);
    }

    set((state) => {
      const workspaces = [...state.workspaces];
      const indexOfCurrent = state.workspaces.indexOf(currentWorkspace);
      workspaces[indexOfCurrent] = newWorkspace;

      return { workspaces };
    });
    set({ currentWorkspace: newWorkspace });

    localStorage.setItem(LOCAL_STORAGE_KEYS.storedWorkspace, newWorkspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    // useFileStore.getState().refreshFiles(newWorkspace); // Comment out for increased performance
  },
  copyWorkspace: async (newWorkspace: string) => {
    const currentWorkspace = get().currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    await minima.file.copy(
      `workspaces/${currentWorkspace}`,
      `workspaces/${newWorkspace}`
    );

    set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
    set({ currentWorkspace: newWorkspace });

    localStorage.setItem(LOCAL_STORAGE_KEYS.storedWorkspace, newWorkspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    // useFileStore.getState().refreshFiles(newWorkspace); // Comment out for increased performance
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  updateWorkspace: async (workspace: string) => {
    if (workspace === get().currentWorkspace) {
      return;
    }

    set({ currentWorkspace: workspace });

    localStorage.setItem(LOCAL_STORAGE_KEYS.storedWorkspace, workspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    useFileStore.getState().refreshFiles(workspace);
    useFileStore.setState({ currentFile: null, currentFolder: null });
    useEditorStore.setState({ code: null, allCodes: [], tabIndex: 0 });
  },
  deleteWorkspace: async () => {
    await minima.file.delete(`workspaces/${get().currentWorkspace}`);
    set({ currentWorkspace: null });

    localStorage.removeItem(LOCAL_STORAGE_KEYS.storedWorkspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    get().refreshWorkspaces();

    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },
  deleteAllWorkspaces: async () => {
    await minima.file.delete('workspaces');

    set({ workspaces: [] });
    set({ currentWorkspace: null });

    localStorage.removeItem(LOCAL_STORAGE_KEYS.storedWorkspace);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded);

    useFileStore.setState({ files: [] }); // Quick fix to a bug
    useFileStore.setState({ currentFile: null });
    useEditorStore.setState({ code: null });
  },

  currentWorkspace: null,
  setCurrentWorkspace: (currentWorkspace) => {
    set({ currentWorkspace });
  },
}));

// Export the store
export default useWorkspaceStore;
