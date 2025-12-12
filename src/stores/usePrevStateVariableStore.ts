// Import dependencies
import { create } from 'zustand';
// Import types
import { IPrevStateVariableStore } from '@/types';

// Create the store
const usePrevStateVariableStore = create<IPrevStateVariableStore>((set) => ({
  prevStateVariables: [],
  setPrevStateVariables: (prevStateVariables) => set({ prevStateVariables }),

  addPrevStateVariable: () => {
    set((state) => {
      const prevStateVariables = state.prevStateVariables;
      const lastVariable = prevStateVariables[prevStateVariables.length - 1];
      const newVariable = {
        index:
          prevStateVariables.length > 0
            ? lastVariable.index === 255
              ? 255
              : lastVariable.index + 1
            : 0,
        value: '',
      };

      return {
        prevStateVariables: [...prevStateVariables, newVariable],
      };
    });
  },
  updatePrevStateVariableKey: (index: number, value: string) => {
    set((state) => {
      if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 255) {
        return { prevStateVariables: state.prevStateVariables };
      }

      const prevStateVariables = [...state.prevStateVariables];
      prevStateVariables[index].index = Number(value);

      return { prevStateVariables };
    });
  },
  updatePrevStateVariableValue: (index: number, value: string) => {
    set((state) => {
      const prevStateVariables = [...state.prevStateVariables];
      prevStateVariables[index].value = value;

      return { prevStateVariables };
    });
  },
  removePrevStateVariable: (index?: number) => {
    if (index) {
      set((state) => ({
        prevStateVariables: state.prevStateVariables.filter(
          (_, i) => i !== index
        ),
      }));
    } else {
      set((state) => {
        const prevStateVariables = [...state.prevStateVariables];
        prevStateVariables.pop();

        return { prevStateVariables };
      });
    }
  },
  removeAllPrevStateVariables: () => set({ prevStateVariables: [] }),
}));

// Export the store
export default usePrevStateVariableStore;
