// Import the create function from Zustand for state management
import { create } from "zustand";
// import { userStore } from "./userStore";
// Access the environment variable for the backend API URL
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Create a Zustand store for managing cart-related state and actions
export const cartStore = create((set, get) => ({
  // const id = userStore.getState().id,// get id from userStore
  // Initial state for flowers, fetched types, and the cart
  flowers: {},
  fetchedTypes: new Set(),
  cart: {
    type: null,
    subscriptionOption: null,
    quantity: null,
    price: null,
  },
  setCart: (cartData) => {
    set({ cart: cartData });
  },
  // Function to add items to the cart
  addToCart: (type, subscriptionOption, quantity, price, isLoggedIn, userId) => {
    if (subscriptionOption == null || quantity == null) {
      console.error("Cannot add to cart: subscriptionOption or quantity is null");
      return;
    }
    const cartData = isLoggedIn
      ? { type, subscriptionOption, quantity, price, userId }
      : { type, subscriptionOption, quantity, price };

    set({ cart: cartData });

    const storageKey = isLoggedIn ? "cartData" : "tempCart";
    localStorage.setItem(storageKey, JSON.stringify(cartData));
  },
  // Async function to fetch flower data based on the flower type
  fetchFlowers: async (type) => {
    // Check if the data is already fetched
    const alreadyFetched = get().fetchedTypes.has(type);

    if (alreadyFetched) {
      // Data is cached, log a message and return the cached data
      console.log(`Using cached flowers for type: ${type}`);
      return get().flowers[type];
    }

    try {
      // Data is not cached, log a message and fetch the data
      console.log(`Fetching flowers for type: ${type}`);
      const response = await fetch(`${apiEnv}/flowers/${type}`);

      if (!response.ok) {
        console.error(`Error fetching flowers: ${response.status}`);
        return;
      }

      const flowerData = await response.json();

      if (flowerData.success) {
        // Update the state with the fetched data and mark it as fetched
        set((state) => ({
          flowers: { ...state.flowers, [type]: flowerData.response },
          fetchedTypes: new Set(state.fetchedTypes).add(type),
        }));

        return flowerData.response;
      } else {
        console.error("Fetching flowers was not successful", flowerData);
      }
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  },
  // Function to clear the cart
  emptyCart: () => {
    set((state) => ({
      cart: {
        type: null,
        subscriptionOption: null,
        quantity: null,
        price: null,
        isLoggedIn: state.isLoggedIn, //Keep the isLoggedIn
        userId: state.id, // Keep the userId unchanged
      },
    }));
    localStorage.removeItem('cartData');
    localStorage.removeItem('flowerSubscriptionOptions');
  },
}));

// Function to retrieve and update the cart from local storage when the user is logged in
export const retrieveCartFromStorage = () => {
  console.log("Retrieving cart from local storage");
  const cartData = JSON.parse(localStorage.getItem("tempCart"));
  console.log("Cart data retrieved:", cartData);
  return cartData;
};
