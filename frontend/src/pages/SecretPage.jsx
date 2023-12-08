import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TopSecretAnimation } from "../TopSecretAnimation";

const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

const StyledSecretPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 400px;
    object-fit: cover;
  }

  button {
    margin-top: 20px;
  }
`;

export const SecretPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiEnv}/secrets`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setLoading(false);
        if (response.status == 200) {
          setIsLoggedIn(true); // Set isLoggedIn to true if authorized
        } else {
          setError("You are not authorized to see this page");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Clear the access token from localStorage and navigate to the start page
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyledSecretPage>
      <h1>Schhh! This is super duper</h1>
      <TopSecretAnimation />
      <img src="/puppy.jpg" alt="Puppy" />
      {isLoggedIn && <button onClick={handleLogout}>Log out</button>}
    </StyledSecretPage>
  );
};

// import styled from "styled-components";
// import { TopSecretAnimation } from "../TopSecretAnimation";

// const apiEnv = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

// const StyledSecretPage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   img {
//     width: 400px;
//     object-fit: cover;
//   }
// `;

// export const SecretPage = async () => {
//   try {
//     const response = await fetch(`${apiEnv}/secrets`, {
//       method: "GET",
//       headers: {
//         Authorization: localStorage.getItem("accessToken"),
//       },
//     });
//     if (response.status === 401) {
//       alert("You are not authorized to see this page");
//       return;
//     }
//   } catch (error) {
//     console.error(error); // Handle the error response
//   }

//   return (
//     <StyledSecretPage>
//       <h1>Schhh! This is super duper</h1>
//       <TopSecretAnimation />
//       <img src="/puppy.jpg" />
//     </StyledSecretPage>
//   );
// };
