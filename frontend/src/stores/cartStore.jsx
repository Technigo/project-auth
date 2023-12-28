import { create } from "zustand";
import { persist } from 'zustand/middleware';

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cartStore = create(persist((set) => ({
    flowers: [],
    cart: {
        flowerType: null,
        subscriptionOption: null,
        quantity: null,
        price: null,
        isTemporary: false,
    },
    addToCart: (flowerType, subscriptionOption, quantity, price, isLoggedIn, userId) => {
        set({
            cart: {
                flowerType,
                subscriptionOption,
                quantity,
                price,
                isTemporary: !isLoggedIn,
                userId: isLoggedIn ? userId : null,
            },
        });
    },
    fetchFlowers: async (type) => {
        try {
            const response = await fetch(`${apiEnv}/flowers/${type}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const flowerData = await response.json();
            if (flowerData.success) {
                set({ flowers: flowerData.response });
                console.log('Flower data fetched', flowerData);
                return flowerData.response;
                
            } else {
                console.error('Fetching flowers was not successful', flowerData);
            }
        } catch (error) {
            console.error('Error fetching flowers:', error);
        }
    },
}), {
    name: 'cart-storage', // Name for local storage key
}));
