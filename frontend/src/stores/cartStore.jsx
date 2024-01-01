import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const cartStore = create(((set, get) => ({
    flowers: {},
  fetchedTypes: new Set(),
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
            console.error('Fetching flowers was not successful', flowerData);
          }
        } catch (error) {
          console.error('Error fetching flowers:', error);
        }
      }
      
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
