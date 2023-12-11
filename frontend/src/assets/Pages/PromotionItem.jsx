import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const PromotionItem = () => {
  const [items, setItems] = useState([]);
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
    navigate("/home"); // You can change this to the login route
  };
  return (
    <div>
      <h1>Latest Promotion Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>Name:</strong> {item.name} <strong>Price:</strong>{" "}
            {item.price}
          </li>
        ))}
      </ul>
      <button onClick={onLogoutClick}>Sign Out</button>
    </div>
  );
};

export default PromotionItem;
