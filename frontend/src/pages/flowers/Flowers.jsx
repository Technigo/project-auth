
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cartStore } from '../../stores/cartStore';
import { userStore } from '../../stores/userStore';

export const Flowers = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart, fetchFlowers } = cartStore();
  const { isLoggedIn, id } = userStore(state => ({ isLoggedIn: state.isLoggedIn, id: state.id }));
  const [flower, setFlower] = useState({});
  const [subscriptionOption, setSubscriptionOption] = useState('weekly');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchSpecificFlower = async () => {
        const flowers = await cartStore.getState().fetchFlowers(type);
        if (flowers) {
            setFlower(flowers); 
        }
    };
    fetchSpecificFlower();
    console.log('Flower state set with', flower);
}, [type]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
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
        {/* Links to other product pages */}
      </section>
    </>
  );
};
