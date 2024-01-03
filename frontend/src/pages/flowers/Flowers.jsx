// Importing necessary dependencies from React and the application
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { cartStore } from '../../stores/cartStore';
import { userStore } from '../../stores/userStore';

// Define the available flower types
const allFlowerTypes = ['basic', 'standard', 'large'];

// Define the Flowers component
export const Flowers = () => {
  // Extract parameters and functions from React Router and stores
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart, fetchFlowers } = cartStore();
  const { isLoggedIn, id } = userStore(state => ({ isLoggedIn: state.isLoggedIn, id: state.id }));
  // State to manage flower details, subscription options, and quantity
  const [flower, setFlower] = useState({});
  const [subscriptionOption, setSubscriptionOption] = useState('weekly');
  const [quantity, setQuantity] = useState(1);

  // Filter out the current flower type to get the other types
  const otherFlowerTypes = allFlowerTypes.filter(t => t !== type);

  // UseEffect to fetch specific flower data based on the flower type
  useEffect(() => {
    let isMounted = true;
    const fetchSpecificFlower = async () => {
      // Check if the flowers data for the current type is already fetched
      const flowerData = cartStore.getState().flowers[type];
      if (!flowerData) {
        // If not fetched, then call the fetchFlowers function
        const newFlowerData = await fetchFlowers(type);
        if (isMounted && newFlowerData) {
          console.log('Fetched flower data:', newFlowerData);
          setFlower(newFlowerData);
        }
      } else {
        // If already fetched, use the existing data
        if (isMounted) {
          console.log('Using cached flower data:', flowerData);
          setFlower(flowerData);
        }
      }
    };
    fetchSpecificFlower();
    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [type]);

  // UseEffect to check and restore temporary cart data from localStorage
  useEffect(() => {
    console.log("Running useEffect for localStorage check");

    const storedCartData = localStorage.getItem('tempCart');
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      console.log('Restored cart data from localStorage:', cartData);

      setSubscriptionOption(cartData.subscriptionOption);
      setQuantity(cartData.quantity);
    } else {
      console.log('No tempCart data found in localStorage');
    }
  }, []);

  // UseEffect to update subscription and quantity when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      const cart = cartStore.getState().cart;
      if (cart) {
        setSubscriptionOption(cart.subscriptionOption);
        setQuantity(cart.quantity);
      }
    }
  }, [isLoggedIn]);

  // Function to handle adding the current flower to the cart
  const handleAddToCart = () => {
    console.log('Add to Cart Clicked');
    if (!isLoggedIn) {
      console.log('User not logged in, redirecting to login page');
      alert('You must be logged in to proceed.');
      // Save product details to local storage for later retrieval
      const productDetails = { type, subscriptionOption, quantity, price: flower.price };
      console.log('Saving product to local storage:', productDetails);
      localStorage.setItem('tempCart', JSON.stringify(productDetails));
      console.log('Local storage after saving:', localStorage.getItem('tempCart'));
      // Redirect to the login page with the current flower type as a redirect parameter
      navigate(`/login?redirect=${encodeURIComponent(`/flowers/${type}`)}`);
    } else {
      console.log('User is logged in, adding to cart');
      addToCart(type, subscriptionOption, quantity, flower.price, isLoggedIn, id);
      navigate(`/cart/${id}`);
    }
  };

  // Function to handle subscription option changes
  const handleOptionChange = (option) => {
    setSubscriptionOption(option);
    // Set quantity based on the selected subscription option
    switch (option) {
      case 'weekly':
        setQuantity(1);
        break;
      case 'monthly':
        setQuantity(4);
        break;
      case 'yearly':
        setQuantity(52);
        break;
      default:
        setQuantity(1);
    }
  };

  return (
    <>
      <section>
        <h1>Product: {flower.type}</h1>
        <p>Price: {flower.price} kr/week</p>
        <div>
          <p>Options</p>
          <div>
            <button onClick={() => handleOptionChange('yearly')}>Yearly</button>
            <button onClick={() => handleOptionChange('monthly')}>Monthly</button>
            <button onClick={() => handleOptionChange('weekly')}>Weekly</button>
          </div>
        </div>
        <div>
          <p>Quantity
            <span>{quantity}</span>
            bouquet(s)
          </p>
        </div>
        <div>
          <p>delivery</p>
          <span>self-pick up</span> (Coming soon: Delivery)
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
      </section>
      <section>
        <h2>More information</h2>
        {/* More information content */}
      </section>
      <section>
        <h2>Other items</h2>
        {otherFlowerTypes.map((otherType) => (
          <p key={otherType}>
            <Link to={`/flowers/${otherType}`}>{otherType}</Link>
          </p>
        ))}
      </section>
    </>
  );
};
