import { Footer } from "../../components/footer/Footer";
import { Logo } from "../../components/logo/Logo";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { cartStore } from "../../stores/cartStore";
import basicImage from "../../assets/images/basic.png";
import standardImage from "../../assets/images/standard.png";
import largeImage from "../../assets/images/large.png";
import defaultImage from "../../assets/images/answer1.png";
import horizontalRule from "../../assets/icons/line13.svg";
import leftArrow from "../../assets/icons/icons8-left-arrow-50.png";
import styles from "./cart.module.css";

export const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dataToShow = cartStore((state) => state.cart);
  const emptyCart = cartStore((state) => state.emptyCart);

  //Handling logout from userStore
  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = async () => {
    storeHandleLogout();
    navigate("/login");
  };

  // Function to calculate subscription cost before delivery
  const subscriptionCost = (flowerType, subscriptionOption) => {
    let basePrice;
    //Setting basePrice based on flower type
    switch (flowerType) {
      case "basic":
        basePrice = 150;
        break;
      case "standard":
        basePrice = 250;
        break;
      case "large":
        basePrice = 350;
        break;
      default:
        return 0;
    }

    //Setting quantity based on subscription option
    let quantity;
    switch (subscriptionOption) {
      case "weekly":
        quantity = 1;
        break;
      case "monthly":
        quantity = 4;
        break;
      case "yearly":
        quantity = 52;
        break;
      default:
        return 0;
    }

    // Calculate total price
    const totalPrice = basePrice * quantity;
    return totalPrice;
  };

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
        return defaultImage;
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

  //Disabling submit form under those circumstances
  const invalidPurchaseOrder =
    newGreeting.length < 4 ||
    newGreeting.length > 100 ||
    subscriptionCost(dataToShow.type, dataToShow.subscriptionOption) === 0;

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
        //Stringifying required values and setting them to request body
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
            alert(
              ` Your ${dataToShow.subscriptionOption} subscription of ${
                dataToShow.type
              } bouquet order is now being processed.  Amount due: ${sumFunction(
                subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                ),
                0
              )} kr.`
            );
            setNewGreeting(""); //clearing textarea
            emptyCart(); //clearing cart
            navigate("/"); //redirecting user to landing page
          } else {
            console.log("Something went wrong");
            console.log(data.error);
          }
        })
        .catch((error) => {
          console.error("Error occured during ordering process:", error);
          alert("An error occurred while creating your purchase order.");
        });
    }
  };
  return (
    <div className={styles.cart}>
      {/* component nav? */}
      <nav>
        <ul className={styles.cartUl}>
          <Link to={`/profile/${id}`} className={styles.cartBack}>
            <img src={leftArrow} alt="left arrow" />
            back
          </Link>
          <Logo />
          <li type="button" onClick={onLogoutClick} className={styles.cartLi}>
            log out
          </li>
        </ul>
      </nav>
      <article className={styles.cartArticle}>
        <section className={styles.cartProductSection}>
          <div className={styles.cartProductImage}>
            <img
              src={bouquetImage(dataToShow.type)}
              alt={`${
                dataToShow.type == null
                  ? "Weekly bouquet: none chosen"
                  : dataToShow.type
              }`}
            />
            <p>
              {dataToShow.type == null
                ? "Weekly bouquet: none chosen"
                : dataToShow.type}
            </p>
          </div>

          <div className={styles.cartProductInfo}>
            <p>
              options:
              <span className={styles.greenbox}>
                {dataToShow.subscriptionOption == null
                  ? "none"
                  : dataToShow.subscriptionOption}
              </span>
            </p>
            <p>
              quantity:
              <span className={styles.greenbox}>{dataToShow.quantity}</span>
              bouquet(s)
            </p>
            <p>
              price:
              <span className={styles.greenbox}>
                {subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                )}
              </span>
              kr
            </p>
            <p>
              delivery:<span className={styles.greenbox}>0</span>kr
            </p>
          </div>
        </section>
        <img
          src={horizontalRule}
          alt="horizontal rule"
          className={styles.cartProductHr}
        />
        <section className={styles.cartSumSection}>
          <p>
            sum:
            <span className={styles.greenbox}>
              {sumFunction(
                subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                ),
                0
              )}
            </span>
            kr
          </p>
        </section>
        <section className={styles.cartGreetingSection}>
          {/*<GreetingMessage dataToshow/>*/}
          <p>
            If you want to send flowers to someone or convey your feelings for
            the week through FloraEcho, please leave a message below. We will
            customize a secret floral based on your message. There will be
            different surprises every week!
          </p>

          {/* Form element with onSubmit event handler set to "handleSubmit" */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="greeting">
              <textarea
                id="greeting"
                rows="5"
                cols="80"
                placeholder="Type your text here (5-100 characters)..."
                value={newGreeting}
                onChange={(event) => setNewGreeting(event.target.value)}
              />
              <div className={styles.cartGreetingCaption}>
                <p>{errorMessage}</p>
                <p
                  className={`length ${
                    newGreeting.length >= 100 ? styles.red : ""
                  }`}
                >
                  {newGreeting.length}/100
                </p>
              </div>
            </label>
            <button
              type="submit"
              id="submitPostButton"
              aria-label="click to submit your subscription order"
              disabled={invalidPurchaseOrder}
            >
              CONFIRM
            </button>
          </form>
        </section>
      </article>
      <Footer />
    </div>
  );
};
