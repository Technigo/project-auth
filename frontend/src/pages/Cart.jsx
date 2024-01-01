import { cartStore } from '../stores/cartStore'; 

export const Cart = () => {
  const cart = cartStore((state) => state.cart);

  // Log the cart state to the console on each render
  console.log('Cart state:', cart);

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
      <h2>Test Cart</h2>
      <p><strong>Type:</strong> {cart.type || 'No type selected'}</p>
      <p><strong>Subscription Option:</strong> {cart.subscriptionOption || 'No subscription selected'}</p>
      <p><strong>Quantity:</strong> {cart.quantity || 0}</p>
      <p><strong>Price:</strong> {cart.price ? `${cart.price} kr` : 'No price available'}</p>
      <p><strong>User ID:</strong> {cart.userId || 'No user ID'}</p>
    </div>
  );
};