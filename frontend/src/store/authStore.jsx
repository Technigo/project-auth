// authStore.js
import { create } from 'zustand';

export const authStore = create((set, get) => ({
    accessToken: localStorage.getItem('accessToken') || null,
    login: (token) => set({ accessToken: token }),
    logout: () => set({ accessToken: null }),
}));



