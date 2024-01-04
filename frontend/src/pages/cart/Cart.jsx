import { Footer } from "../../components/footer/Footer";
import { Logo } from "../../components/logo/Logo";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import basicImage from "../../assets/images/basic.png";
import standardImage from "../../assets/images/standard.png";
import largeImage from "../../assets/images/large.png";
import styles from "./cart.module.css";
//import { cartStore } from "../../stores/cartStore";

export const Cart = () => {
  const { id } = useParams();
  //console.log(id);

  const navigate = useNavigate();

  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = async () => {
    storeHandleLogout();
    navigate("/login");
  };

  //---- Dummy values from cartStore (to be changed after merge)----
  let dataToShow = {
    type: "large",
    subscriptionOption: "yearly",
    quantity: 52,
    price: 18200,
    sum: 18200,
  };
  // const dataToShow = cartStore((state) => state.cart);
  // {dataToShow.type || 'No type selected'}
  // {dataToShow.subscriptionOption || 'No subscription selected'}
  // {dataToShow.quantity || 0}
  // {dataToShow.price || 'NA'}

  // Small function to calculate the purchase sum
  const sumFunction = (price, deliveryCost) => {
    return price + deliveryCost;
  };

  // Function to display corresponding bouquet image
  const bouquetImage = (bouquetType) => {
    switch (bouquetType) {
      case "basic":
        return basicImage;
      case "standard":
        return standardImage;
      case "large":
        return largeImage;
      default:
        return "";
    }
  };

  //-------- Logic regarding greeting message in form  -------

  const [newGreeting, setNewGreeting] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //useEffect hook to check max length criteria for greeting message
  useEffect(() => {
    if (newGreeting.length >= 101) {
      setErrorMessage("Your message is too long.");
    } else {
      setErrorMessage("");
    }
  }, [newGreeting]); //dependency array with effect only running when "newGreeting" changes

  //----------- Sending confirmed flower subscription order through POST request to API ---------
  const handleSubmit = async (event) => {
    event.preventDefault(); //preventing form's default submit behaviour
    const backendApi = import.meta.env.VITE_BACKEND_API;

    //Checking minimum length criteria for greeting message
    if (newGreeting.length <= 4) {
      setErrorMessage("Your message is too short.");
    } else {
      //Configuring the fetch request -POST method
      const purchaseOrder = {
        method: "POST",
        //Stringifying "newGreeting" and setting it to request body
        body: JSON.stringify({
          greeting: `${newGreeting}`,
          user_id: `${id}`,
          flower: `${dataToShow.type}`,
          options: `${dataToShow.subscriptionOption}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      console.log(purchaseOrder);
      //Making a POST request to API endpoint with configured purchaseOrder
      await fetch(`${backendApi}/cart/${id}`, purchaseOrder)
        .then((res) => res.json()) //parsing response as json
        .then((data) => {
          if (data.success) {
            console.log("data submitted successfully");
            setNewGreeting(""); //clearing textarea
          } else {
            console.log("Something went wrong");
            console.log(data.error);
          }
        })
        .catch((error) => {
          console.error("Error occured in creating greeting:", error);
          alert("An error occurred while creating your greeting message.");
        });
    }
  };
  return (
    <div>
      {/* component nav? */}
      <nav>
        <ul>
          <Link to={`/profile/${id}`}>back</Link>
          <Logo />
          <li type="button" onClick={onLogoutClick}>
            log out
          </li>
        </ul>
      </nav>
      <div>
        <div>
          <img
            src={bouquetImage(dataToShow.type)}
            alt={`${dataToShow.type} flower bouquet`}
          />
          <p>{dataToShow.type}</p>
        </div>
        <div>
          <p>
            options:<span>{dataToShow.subscriptionOption}</span>
          </p>
          <p>
            quantity:<span>{dataToShow.quantity}</span>bouquet(s)
          </p>
          <p>
            price:<span>{dataToShow.price}</span>kr
          </p>
          <p>
            delivery:<span>0</span>kr
          </p>
        </div>
      </div>
      <hr />
      <p>
        sum:<span>{sumFunction(dataToShow.price, 0)}</span>kr
      </p>
      {/*<GreetingMessage dataToshow/>*/}
      <p>
        If you want to send flowers to someone or convey your feelings for the
        week through FloraEcho, please leave a message below. We will customize
        a secret floral based on your message. There will be different surprises
        every week!
      </p>

      {/* Form element with onSubmit event handler set to "handleSubmit" */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="greeting">
          <textarea
            id="greeting"
            rows="5"
            cols="50"
            placeholder="Type your text here"
            value={newGreeting}
            onChange={(event) => setNewGreeting(event.target.value)}
            className=""
          />
        </label>
        <div>
          <p>{errorMessage}</p>
          <p
            className={`length ${newGreeting.length >= 100 ? styles.red : ""}`}
          >
            {newGreeting.length}/100
          </p>
        </div>
        <button
          type="submit"
          id="submitPostButton"
          aria-label="click to submit your subscription order"
          disabled={newGreeting.length < 4 || newGreeting.length > 100}
        >
          Confirm order
        </button>
      </form>
      <Footer />
    </div>
  );
};
