import { create } from 'zustand';

// Enum for the modal types
export enum MODAL_TYPES {
  // Workspace modals
  RENAME_WORKSPACE = 'renameWorkspace',
  CREATE_BLANK_WORKSPACE = 'createBlankWorkspace',
  COPY_WORKSPACE = 'copyWorkspace',
  EXPORT_WORKSPACE = 'exportWorkspace',
  IMPORT_WORKSPACE = 'importWorkspace',
  DELETE_WORKSPACE = 'deleteWorkspace',
  DELETE_ALL_WORKSPACES = 'deleteAllWorkspaces',

  // File modals
  UPLOAD_FILE = 'uploadFile',
  DELETE_ALL_FILES = 'deleteAllFiles',
}

// Type for the store
type TModalType = MODAL_TYPES | null;

// Interface for the store
interface IModalStore {
  modalType: TModalType;
  setModalType: (modalType: TModalType) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the store
const useModalStore = create<IModalStore>((set) => ({
  modalType: null,
  setModalType: (modalType: TModalType) => set({ modalType }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Export the store
export default useModalStore;
