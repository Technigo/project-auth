import { useState, useEffect } from "react";

export const GreetingMessage = () => {
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
          message: `${newGreeting}`,
        }),
        headers: { "Content-Type": "application/json" },
      };

      //Making a POST request to API endpoint with configured greeting
      await fetch(`${backendApi}/cart/:user_id`, greeting)
        .then((res) => res.json()) //parsing response as json
        .then((data) => {
          newGreeting(data); //calling "newGreeting" function (paased prop) with the parsed data
          setNewGreeting(""); //clearing textarea
        })
        .catch((error) => {
          console.error("Error occured in creating greeting:", error);
          alert("An error occurred while creating your greeting message.");
        });
    }
  };

  return (
    <>
      <p>
        If you want to send flowers to someone or convey your feelings for the
        week through FloraEcho, please leave a message below. We will customize
        a secret floral based on your message. There will be different surprises
        every week!
      </p>

      {/* Form element with onSubmit event handler set to "handleSubmit" */}
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
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
          <p className={`length ${newGreeting.length >= 100 ? "red" : ""}`}>
            {newGreeting.length}/100
          </p>
        </div>
      </form>
    </>
  );
};
