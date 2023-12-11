import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const PromotionItem = () => {
  const [items, setItems] = useState([]);
  const [randomItem, setRandomItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = () => {
    storeHandleLogout();
    // Additional logic after logout can be added here
    alert("Log out succesfull");
    navigate("/"); // You can change this to the login route
  };

  const onGenerateItemClick = () => {
    // Generate a random index to pick a random item from the array
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];
    setRandomItem(randomItem);
  };

  return (
    <div className="info-page">
      {randomItem && (
        <div className="generator-container">
          <h1>Don't know what to get for you beloved one?</h1>
          <button className="random-btn" onClick={onGenerateItemClick}>
            Generate Random Item
          </button>
          <div className="random-result">
            <strong>🎁 He/ she may want:</strong> {randomItem.name}
            <br />
            <strong>💰 He/ she definitely worths this price: </strong>{" "}
            {randomItem.price} sek
          </div>
        </div>
      )}
      <h1>Not the best choice? Don't worry, we have more options for you!</h1>
      <ul className="list-promo">
        {items.map((item) => (
          <li key={item.id}>
            <strong>👚 Name:</strong> {item.name} <br />
            <strong>🛍️ Promotion Price:</strong> {item.price} sek
          </li>
        ))}
      </ul>
      <button onClick={onLogoutClick} className="sign-out-btn">
        Sign Out
      </button>
    </div>
  );
};

export default PromotionItem;
