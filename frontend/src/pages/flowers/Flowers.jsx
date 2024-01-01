
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
    const fetchSpecificFlower = async () => {
      const flowers = await fetchFlowers(type);
      if (flowers) {
        setFlower(flowers);
      }
    };
    fetchSpecificFlower();
  }, [type, fetchFlowers]);

  useEffect(() => {
    console.log("Checking for tempCart in localStorage");
    const storedCartData = localStorage.getItem('tempCart');
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      setSubscriptionOption(cartData.subscriptionOption);
      setQuantity(cartData.quantity);

      console.log('Updated state for subscriptionOption:', cartData.subscriptionOption);
      console.log('Updated state for quantity:', cartData.quantity);
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
