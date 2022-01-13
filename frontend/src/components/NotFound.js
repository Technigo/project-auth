import React from 'react'
import "./NotFound.css"
import background from "../images/background.jpg"
import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <article className="notFoundContainer">
      <section className="imgContainer">
        <img src={background} alt="background image" />
      </section>
      <section className="notFoundContent">
        <h1>Sorry, page not found</h1>
        <section className="btnContainerNotFound">
          <Link to="/signin"> 
          <button  type="button">
           
            Back
          </button>
          </Link>
          </section>
      </section>
     
    </article>
  )
}
