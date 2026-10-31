import { create } from "zustand";

const useLanguageStore = create((set) => ({
  language: "en",

  setLanguage: (language) => {
    set({ language });
  },

  toggleLanguage: () => {
    set((state) => ({
      language: state.language === "en" ? "am" : "en",
    }));
  },
}));

export default useLanguageStore;