// Import dependencies
import { create } from 'zustand';
// Import types
import { IModalStore } from '@/types';

// Create the store
const useModalStore = create<IModalStore>((set) => ({
  modalType: null,
  setModalType: (modalType) => set({ modalType }),

  modalProps: null,
  setModalProps: (modalProps) => set({ modalProps }),

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, modalType: null, modalProps: null }),
}));

// Export the store
export default useModalStore;
