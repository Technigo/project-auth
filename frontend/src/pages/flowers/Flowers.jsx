
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { cartStore } from '../../stores/cartStore';
import { userStore } from '../../stores/userStore';

const allFlowerTypes = ['basic', 'standard', 'large'];

export const Flowers = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart, fetchFlowers } = cartStore();
  const { isLoggedIn, id } = userStore(state => ({ isLoggedIn: state.isLoggedIn, id: state.id }));
  const [flower, setFlower] = useState({});
  const [subscriptionOption, setSubscriptionOption] = useState('weekly');
  const [quantity, setQuantity] = useState(1);

  // Filter out the current flower type to get the other types
  const otherFlowerTypes = allFlowerTypes.filter(t => t !== type);

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
    return () => {
      isMounted = false;
    };
  }, [type]); 
  
  
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
  
  

  useEffect(() => {
    if (isLoggedIn) {
      const cart = cartStore.getState().cart;
      if (cart) {
        setSubscriptionOption(cart.subscriptionOption);
        setQuantity(cart.quantity);
      }
    }
  }, [isLoggedIn]);

  const handleAddToCart = () => {
    console.log('Add to Cart Clicked');
    if (!isLoggedIn) {
      console.log('User not logged in, redirecting to login page');
      alert('You must be logged in to proceed.');
      const productDetails = { type, subscriptionOption, quantity, price: flower.price };
      console.log('Saving product to local storage:', productDetails);

      localStorage.setItem('tempCart', JSON.stringify(productDetails));
      console.log('Local storage after saving:', localStorage.getItem('tempCart'));

      navigate(`/login?redirect=${encodeURIComponent(`/flowers/${type}`)}`);
    } else {
      console.log('User is logged in, adding to cart');
      addToCart(type, subscriptionOption, quantity, flower.price, isLoggedIn, id);
      navigate(`/cart/${id}`);
    }
  };


  const handleOptionChange = (option) => {
    setSubscriptionOption(option);
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
