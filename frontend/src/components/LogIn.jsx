import { Button } from "./Button";
import { Headline } from "./Headline";
import { TextInput } from "./TextInput";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const LogIn = () => {
  const { formData, handleSubmitLogin, handleChange } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await handleSubmitLogin(event);
      // Redirect to /logged-in after successful login
      window.location.href = "/logged-in";
    } catch (error) {
      console.error("Error logging in", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="title-box">
          <Headline titleText={"Log in"} />
          <div className="text-box">
            <p>Welcome back, let the literary adventures continue!</p>
          </div>
        </div>
        <div className="input-tablet-desktop">
          <TextInput
            label={"Username"}
            inputType={"text"}
            inputName={"username"}
            placeholder={"Type your username"}
            value={formData.username}
            onChange={(event) => handleChange("username", event.target.value)}
          />

          <TextInput
            label={"Password"}
            inputType={"password"}
            inputName={"password"}
            placeholder={"Type your password"}
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
        </div>
        <Button type={"submit"} btnText={"Log in"} disabled={isLoading} />
      </form>
    </>
  );
};

// const storedLikes = localStorage.getItem("numberOfLikes");
// if (!storedLikes) {
//   localStorage.setItem("numberOfLikes", "0");
//   return 0;
// }
// return JSON.parse(storedLikes);

/*  
useEffect(() => {
    updateButtonStatus();
    // Add tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]); 
*/

/*
useEffect(() => {
  localStorage.setItem("token", JSON.stringify((formData.accesstoken));
}, [formData.accessToken])


const storedAccessToken = localStorage.getItem("token");
    if (storedAccessToken === null) return "";
    return JSON.parse(storedAccessToken);



     const [todos, setTodos] = useState(() => {
    // Check if there are any tasks in localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks === null) return [];
    return JSON.parse(storedTasks);
  });


*/
