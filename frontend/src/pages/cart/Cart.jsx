import { Footer } from "../../components/footer/Footer";
import { Logo } from "../../components/logo/Logo";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { cartStore } from "../../stores/cartStore";
import { useTranslation } from "react-i18next";
import basicImage from "../../assets/images/basic.png";
import standardImage from "../../assets/images/standard.png";
import largeImage from "../../assets/images/large.png";
import defaultImage from "../../assets/images/answer1.png";
import horizontalRule from "../../assets/icons/line13.svg";
import leftArrow from "../../assets/icons/icons8-left-arrow-50.png";
import styles from "./cart.module.css";

export const Cart = () => {
  const userId = useParams().id;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dataToShow = cartStore((state) => state.cart);
  const emptyCart = cartStore((state) => state.emptyCart);

  //Handling logout from userStore
  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = async () => {
    storeHandleLogout();
    navigate("/login");
  };

  // Function to fetch any persisted cartData in localStorage
  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      const cartData = JSON.parse(storedCartData); //parse JSON string into object
      cartStore.getState().setCart(cartData); //updating state with parsed cartData with Zustand
    }
  }, []); // effect running only when cart component mounts

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

  // Calculate the purchase order sum
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
      setErrorMessage("long");
    } else {
      setErrorMessage("ok");
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
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    const backendApi = import.meta.env.VITE_BACKEND_API;

    //Checking minimum length criteria for greeting message
    if (newGreeting.length <= 4) {
      setErrorMessage("short");
    } else {
      //Configuring the fetch request -POST method
      const purchaseOrder = {
        method: "POST",
        //Stringifying required values and setting them to request body
        body: JSON.stringify({
          greeting: newGreeting,
          user_id: userId,
          flower: dataToShow.type,
          options: dataToShow.subscriptionOption,
          quantity: dataToShow.quantity,
          price: subscriptionCost(
            dataToShow.type,
            dataToShow.subscriptionOption
          ),
          sum: sumFunction(
            subscriptionCost(dataToShow.type, dataToShow.subscriptionOption),
            0
          ),
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      //Making a POST request to API endpoint with configured purchaseOrder
      await fetch(`${backendApi}/cart/${userId}`, purchaseOrder)
        .then((res) => res.json()) //parsing response as json
        .then((data) => {
          if (data.success) {
            alert(
              ` ${t("cart.alert.firstPart")} ${t(
                `subscription.${dataToShow.subscriptionOption}`
              )} ${t("cart.alert.secondPart")} ${t(
                `bouquetType.${dataToShow.type}`
              )} ${t("cart.alert.thirdPart")} ${sumFunction(
                subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                ),
                0
              )} ${t("cart.currency")}.`
            );
            setNewGreeting(""); //clearing textarea
            emptyCart(true); //clearing cart
            navigate("/");
          } else {
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
      <nav>
        <ul className={styles.cartUl}>
          <Link to={`/profile/${userId}`} className={styles.cartBack}>
            <img src={leftArrow} alt="left arrow" />
            {t("cart.backButton")}
          </Link>
          <Logo />
          <li type="button" onClick={onLogoutClick} className={styles.cartLi}>
            {t("cart.logOutButton")}
          </li>
        </ul>
      </nav>
      <article className={styles.cartArticle}>
        <section className={styles.cartProductSection}>
          <div className={styles.cartProductImage}>
            <img
              src={bouquetImage(dataToShow.type)}
              alt={t(
                dataToShow.type == null
                  ? "defaultBouquet"
                  : `bouquetType.${dataToShow.type}`
              )}
            />
            <p>
              {t(
                dataToShow.type == null
                  ? "defaultBouquet"
                  : `bouquetType.${dataToShow.type}`
              )}
            </p>
          </div>

          <div className={styles.cartProductInfo}>
            <p>{t("cart.options")}</p>
            <p>
              <span className={styles.greenbox}>
                {t(
                  dataToShow.subscriptionOption == null
                    ? "none"
                    : `subscription.${dataToShow.subscriptionOption}`
                )}
              </span>
            </p>
            <p>{t("cart.subscription")}</p>
            <p>{t("cart.quantity")}</p>
            <p>
              <span className={styles.greenbox}>
                {dataToShow.quantity == null ? "0" : dataToShow.quantity}
              </span>
            </p>
            <p>{t("cart.bouquets")}</p>
            <p>{t("cart.price")}</p>
            <p>
              <span className={styles.greenbox}>
                {subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                )}
              </span>
            </p>
            <p>{t("cart.currency")}</p>
            <p>{t("cart.delivery")}</p>
            <p>
              <span className={styles.greenbox}>0</span>
            </p>
            <p>{t("cart.currency")}</p>
          </div>
        </section>
        <img
          src={horizontalRule}
          alt={t("cart.hr")}
          className={styles.cartProductHr}
        />
        <section className={styles.cartSumSection}>
          <p>
            {t("cart.sum")}
            <span className={styles.greenbox}>
              {sumFunction(
                subscriptionCost(
                  dataToShow.type,
                  dataToShow.subscriptionOption
                ),
                0
              )}
            </span>
            {t("cart.currency")}
          </p>
        </section>
        <section className={styles.cartGreetingSection}>
          <p>{t("cart.greetingInfo")}</p>

          {/* Form element with onSubmit event handler set to "handleSubmit" */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="greeting">
              <textarea
                id="greeting"
                rows="5"
                cols="80"
                placeholder={t("cart.submitPlaceholder")}
                value={newGreeting}
                onChange={(event) => setNewGreeting(event.target.value)}
              />
              <div className={styles.cartGreetingCaption}>
                <p>{t(`cart.errorMessage.${errorMessage}`)}</p>
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
              {t("cart.confirm")}
            </button>
          </form>
        </section>
      </article>
      <Footer />
    </div>
  );
};
