
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

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to proceed.');
      const productDetails = { type, subscriptionOption, quantity, price: flower.price };
      console.log('Saving product to local storage:', productDetails);

      // Make sure to use the same local storage key as in your Login component
      localStorage.setItem('tempCart', JSON.stringify(productDetails));

      // Redirect to login with a return path that includes the product type
      navigate(`/login?redirect=${encodeURIComponent(`/flowers/${type}`)}`);
    } else {
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
