import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import surfPosts from "reducers/surfPosts";
import { API_URL } from "utils/urls";
import user from "reducers/user";

const Form = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(store => store.user.accessToken);
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const onPostSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({
        headline: headline,
        message: message,
        location: location
      })
    }
    fetch(API_URL("surfposts"), options)
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          console.log("post submitted")
          const newPost = data.response;
          dispatch(surfPosts.actions.addPost(newPost))
          setHeadline("");
          setLocation("");
          setMessage("");
        } else {
          console.log("submission failed")
        }
      })
      .catch((error) => {
        console.error("An error occured:", error);
      });
  };
  return (
    <>
      <form onSubmit={onPostSubmit}>
        <label htmlFor="headline">Title</label>
        <input
          type="text"
          id="headline"
          value={headline}
          placeholder="Name your post"
          onChange={e => setHeadline(e.target.value)} />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          placeholder="Where in the world did you surf?"
          onChange={e => setLocation(e.target.value)} />
        <label htmlFor="message">Message</label>
        <textarea
          className="message"
          id="message"
          value={message}
          placeholder="How was the surf?"
          rows="4"
          cols="40"
          onChange={e => setMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Form
