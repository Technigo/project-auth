import { create } from "zustand";

export const useStore = create((set) => ({
  showSignInForm: false,
  showLoginForm: false,
  setShowSignInForm: (value) =>
    set({ showSignInForm: value, showLoginForm: !value }),
  setShowLoginForm: (value) =>
    set({ showLoginForm: value, showSignInForm: !value }),
  hideForms: () => set({ showSignInForm: false, showLoginForm: false }),
}));
