import { create } from "zustand";

/* const apiEnv = import.meta.env.VITE_BACKEND_API;
console.log(apiEnv); */

export const quoteStore = create((set) => ({
    quotes: [],
    addQuote: (newQuote) => set((state) => ({ quotes: [...state.quotes, newQuote] })),
    setQuotes: (quotes) => set({ quotes }),

    // Fetch a quote for the user to see
    fetchQuotes: async () => {
        try {
            const response = await fetch('http://localhost:3000/getQuote', {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });
            if (response.ok) {
                const data = await response.json();
                set({ quotes: [data] });
                return data;
            } else {
                console.error("Failed to find a quote");
            }
        } catch (error) {
            console.error(error);
        }
    }
}))