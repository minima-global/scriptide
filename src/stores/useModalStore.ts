import { create } from 'zustand';

// Enum for the modal types
export enum EModalTypes {
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

  // Other modals
  VIEW_SCRIPT = 'viewScript',
  RENAME_SCRIPT = 'renameScript',
  CREATE_SCRIPT = 'createScript',
  DELETE_SCRIPT = 'deleteScript',
  DELETE_ALL_SCRIPT = 'deleteAllScripts',
}

// Type for the store
type TModalType = EModalTypes | null;

// Interface for the store
interface IModalStore {
  modalType: TModalType;
  setModalType: (modalType: TModalType) => void;

  modalProps: any;
  setModalProps: (modalProps: any) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the store
const useModalStore = create<IModalStore>((set) => ({
  modalType: null,
  setModalType: (modalType: TModalType) => set({ modalType }),

  modalProps: null,
  setModalProps: (modalProps: any) => set({ modalProps }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, modalType: null, modalProps: null }),
}));

// Export the store
export default useModalStore;
