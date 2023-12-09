import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Animation } from "../Animation";
import styled from "styled-components";

const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

const SecretpageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 250px;
    height: 150px;
    object-fit: cover;
  }

  @media screen and (min-width: 668px) and (max-width: 1023px) {
    img {
      width: 300px;
      height: 150px;
    }
  }

  @media screen and (min-width: 1024px) {
    margin-top: 50px;

    img {
      width: 300px;
      height: 150px;
    }
  }
`;

const StyledSecretPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;

  h1 {
    font-size: 32px;
    color: #b29a74;
  }

  p {
    color: #808080;
    font-size: 16px;
    color: #38634b;
  }

  @media screen and (min-width: 668px) and (max-width: 1023px) {
    width: 80%;

    h1 {
      font-size: 50px;
    }

    p {
      font-size: 18px;
    }
  }

  @media screen and (min-width: 1024px) {
    width: 60%;

    h1 {
      font-size: 60px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const LogOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    text-align: center;
    font-size: 24px;
    color: #38634b;
  }

  button {
    height: 47px;
    cursor: pointer;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 18px;
    background-color: #38634b;
    color: #fff;
  }

  button:hover {
    background-color: #b29a74;
  }

  @media screen and (min-width: 668px) and (max-width: 1023px) {
    h2 {
      font-size: 32px;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 0;

    h2 {
      font-size: 40px;
    }
  }
`;

export const SecretPage = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [error, setError] = useState(null); // Set error to null on component mount
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set isLoggedIn to false on component mount
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try fetching the secrets endpoint with the access token
        const response = await fetch(`${apiEnv}/secrets`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("accessToken"), // Send the access token from localStorage
          },
        });
        setLoading(false); // Set loading to false when the request is done
        if (response.status == 200) {
          // Check if the response status is 200 (OK)
          setIsLoggedIn(true); // Set isLoggedIn to true if authorized
        } else {
          // If the response status is not 200 (OK), show an alert and navigate to the start page
          setError("You are not authorized to see this page");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Pass an empty array as second argument to only run the effect on mount

  const handleLogout = () => {
    // Clear the access token from localStorage and navigate to the start page
    localStorage.removeItem("accessToken");
    navigate("/"); // Navigate to the start page
  };

  if (loading) {
    // If loading is true, show a loading message
    return <div>Loading...</div>;
  }

  if (error) {
    // If error is not null, show an error message
    return <div>Error: {error}</div>;
  }

  return (
    <SecretpageContainer>
      <StyledSecretPage>
        <h1>We are about to start working on our final project!</h1>
        <img
          src="/a-helping-hand.png"
          className="logo"
          alt="Logo of A Helping Hand"
        />
        <p>
          Welcome to our community of compassion and generosity. We believe in
          the power of uniting hearts and strive to create a world where every
          act of kindness matters. Our platform is a vibrant hub where those in
          need of help encounter those who are ready to offer their time and
          care without expecting anything in return.
        </p>
        <br />
        <p>
          Here, it&apos;s about uplifting each other, where a simple gesture can
          make a tremendous difference. Perhaps there&apos;s an elderly neighbor
          who needs help raking leaves, someone requiring assistance with
          grocery shopping, or an individual unable to walk their four-legged
          friend. Our platform serves as a bridge connecting needs with helpful
          souls.
        </p>
        <br />
        <p>
          We believe in fostering an inclusive community where goodwill and
          kindness are the currency. Here, commitment and generosity matter
          most. With us, every effort is a step towards a warmer, more
          empathetic world. Together, we&apos;re building a place where hearts
          meet to make a difference. Welcome to being a part of this beautiful
          movement of humanity.
        </p>
      </StyledSecretPage>
      <LogOutWrapper>
        <h2>Stay tuned!</h2>
        <Animation />
        {/* If isLoggedIn is true, show a logout button */}
        {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
      </LogOutWrapper>
    </SecretpageContainer>
  );
};
