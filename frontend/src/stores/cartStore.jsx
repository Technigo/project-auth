import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cartStore = create(((set, get) => ({
    flowers: [],
    cart: {
        type: null,
        subscriptionOption: null,
        quantity: null,
        price: null,
    },
    addToCart: (type, subscriptionOption, quantity, price, isLoggedIn, userId) => {
        console.log('Current cart state before update:', get().cart);
        if (isLoggedIn) {
            // If the user is logged in, update the cart state.
            set({
                cart: {
                    type,
                    subscriptionOption,
                    quantity,
                    price,
                    userId,
                },
            });
            console.log('New cart state after update:', get().cart);
        } else {
            // If the user is not logged in, save to localStorage instead.
            const cartData = { type, subscriptionOption, quantity, price };
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
    console.log('Retrieving cart from local storage');
    const cartData = JSON.parse(localStorage.getItem('tempCart'));
    console.log('Cart data retrieved:', cartData);
    if (cartData) {
        console.log('User logged in, updating cart with stored data');
        cartStore.getState().addToCart(cartData.type, cartData.subscriptionOption, cartData.quantity, cartData.price, true, userId);
        localStorage.removeItem('tempCart'); // Clear the temporary cart data after moving it to state
        console.log('Local storage after clearing:', localStorage.getItem('tempCart')); // Confirming the local storage is cleared
    }
};
