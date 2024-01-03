import { Footer } from "../../components/footer/Footer";
import { Logo } from "../../components/logo/Logo";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import styles from "./cart.module.css";
//import { cartStore } from "../../stores/cartStore";
export const Cart = () => {
  const { id } = useParams();
  //console.log(id);

  const navigate = useNavigate();

  // const { isLoggedIn, accessToken } = userStore();

  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = async () => {
    storeHandleLogout();
    navigate("/login");
  };

  //const dataToShow = cartStore((state) => state.cart);
  let dataToShow = {
    type: "basic",
    subscriptionOption: "monthly",
  };
  // dataToShow.subscriptionOption
  // const flowerToShow = cartStore((state) => state.flower); ????

  // const sendForm = () => {
  //   // post backend
  // };

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
      const greeting = {
        method: "POST",
        //Stringifying "newGreeting" and setting it to request body
        body: JSON.stringify({
          greeting: `${newGreeting}`,
          user_id: `${id}`,
          flower: `${dataToShow.type}`,
          options: `${dataToShow.subscriptionOption}`,
          //price: 156, // optional
          //deliveryCost: 0,
          //sum: 156,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      console.log(greeting);
      //Making a POST request to API endpoint with configured greeting
      await fetch(`${backendApi}/cart/${id}`, greeting)
        .then((res) => res.json()) //parsing response as json
        .then((data) => {
          //setNewGreeting(data); //calling "newGreeting" function (passed prop) with the parsed data
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
          <img src="" alt="" />
          <p></p>
        </div>
        <div>
          <p>
            options:<span></span>
          </p>
          <p>
            quantity:<span></span>bouquet(s)
          </p>
          <p>
            price:<span></span>kr
          </p>
          <p>
            delivery:<span></span>kr
          </p>
        </div>
      </div>
      <hr />
      <p>
        sum:<span></span>kr
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
