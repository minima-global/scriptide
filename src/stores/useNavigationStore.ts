// Import dependencies
import { create } from 'zustand';
// Import types
import { INavigationStore } from '@/types';

// Create the store
const useNavigationStore = create<INavigationStore>((set) => ({
  navigation: localStorage.getItem('navigation-state') || 'home',
  setNavigation: (navigation: string) => {
    set({ navigation });
    localStorage.setItem('navigation-state', navigation);
  },
}));

export default useNavigationStore;
