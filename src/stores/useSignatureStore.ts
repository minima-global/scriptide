// Import dependencies
import { create } from 'zustand';
// Import types
import { ISignatureStore } from '@/types';

// Create the store
const useSignatureStore = create<ISignatureStore>((set) => ({
  signatures: [],
  setSignatures: (signatures: string[]) => set({ signatures }),

  addSignature: () =>
    set((state) => ({ signatures: [...state.signatures, ''] })),
  updateSignature: (index: number, value: string) => {
    set((state) => {
      const signatures = [...state.signatures];
      signatures[index] = value;

      return { signatures };
    });
  },
  removeSignature: (index) => {
    if (index) {
      set((state) => ({
        signatures: state.signatures.filter((_, i) => i !== index),
      }));
    } else {
      set((state) => {
        const signatures = [...state.signatures];
        signatures.pop();

        return { signatures };
      });
    }
  },
}));

// Export the store
export default useSignatureStore;
