// Import dependencies
import { create } from 'zustand';
// Import constants
import { CONSOLE_WELCOME, CONSOLE_CLEARED } from '@/constants';
// Import types
import { IConsoleStore } from '@/types';

// Create the store
export const useConsoleStore = create<IConsoleStore>((set) => ({
  consoleOutput: CONSOLE_WELCOME.join('\n'),
  setConsoleOutput: (consoleOutput) => set({ consoleOutput }),

  extendConsoleOut: (newOutput) => {
    set((state) => ({
      consoleOutput: state.consoleOutput + newOutput + '\n',
    }));
  },
  clearConsoleOut: () => {
    set({ consoleOutput: CONSOLE_CLEARED.join('\n') });
  },
}));

// Export the store
export default useConsoleStore;
