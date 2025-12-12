// Import dependencies
import { create } from 'zustand';
// Import types
import { IRunScriptStore } from '@/types';

// Create the store
export const useRunScriptStore = create<IRunScriptStore>((set) => ({
  cleanScript: '',
  setCleanScript: (cleanScript: string) => set({ cleanScript }),

  script0xAddress: '',
  setScript0xAddress: (script0xAddress: string) => set({ script0xAddress }),

  scriptMxAddress: '',
  setScriptMxAddress: (scriptMxAddress: string) => set({ scriptMxAddress }),

  scriptParse: null,
  setScriptParse: (scriptParse) => set({ scriptParse }),

  scriptSuccess: null,
  setScriptSuccess: (scriptSuccess) => set({ scriptSuccess }),

  scriptMonotonic: null,
  setScriptMonotonic: (scriptMonotonic) => set({ scriptMonotonic }),

  scriptVariables: {},
  setScriptVariables: (scriptVariables) => set({ scriptVariables }),

  totalScriptInstructions: '',
  setTotalScriptInstructions: (totalScriptInstructions: string) =>
    set({ totalScriptInstructions }),
}));

export default useRunScriptStore;
