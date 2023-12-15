// authStore.js
import { createStore } from 'zustand';

const useAuthStore = createStore((set) => ({
    accessToken: localStorage.getItem('accessToken') || null,
    login: (token) => set({ accessToken: token }),
    logout: () => set({ accessToken: null }),
}));

export default useAuthStore;

