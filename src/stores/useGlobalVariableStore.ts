// Import dependencies
import { create } from 'zustand';
// Import constants
import { GLOBAL_VARIABLES_OBJECT } from '@/constants';
// Import types
import { IGlobalVariableStore } from '@/types';

// Create the store
const useGlobalVariableStore = create<IGlobalVariableStore>((set) => ({
  globals: GLOBAL_VARIABLES_OBJECT,
  setGlobals: (globals) => set({ globals }),

  globalUpdate: (key, value) =>
    set((state) => ({ globals: { ...state.globals, [key]: value } })),
}));

// Export the store
export default useGlobalVariableStore;
