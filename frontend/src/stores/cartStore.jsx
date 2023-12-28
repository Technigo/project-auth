import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cartStore = create(((set) => ({
    flowers: [],
    cart: {
        flowerType: null,
        subscriptionOption: null,
        quantity: null,
        price: null,
        isTemporary: false,
    },
    addToCart: (flowerType, subscriptionOption, quantity, price, isLoggedIn, userId) => {
        if (isLoggedIn) {
            // If the user is logged in, update the cart state.
            set({
                cart: {
                    flowerType,
                    subscriptionOption,
                    quantity,
                    price,
                    isTemporary: false,
                    userId,
                },
            });
        } else {
            // If the user is not logged in, save to localStorage instead.
            const cartData = { flowerType, subscriptionOption, quantity, price };
            localStorage.setItem('tempCart', JSON.stringify(cartData));
        }
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
})
));

export const retrieveCartFromStorage = (userId) => {
    const cartData = JSON.parse(localStorage.getItem('tempCart'));
    if (cartData) {
        cartStore.getState().addToCart(cartData.flowerType, cartData.subscriptionOption, cartData.quantity, cartData.price, true, userId);
        localStorage.removeItem('tempCart'); // Clear the temporary cart data
    }
};
