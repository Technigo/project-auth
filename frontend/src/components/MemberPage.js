import React from "react"
import './member.css' 

export const MemberPage = (props) => {

  return(
    <section className="memberSection" >
      <h2>Member information</h2>
      <h3>You can't imagine how awesome you are!
      </h3>
      <h3>{props.name}</h3>
      <h3>{props.email}</h3>
      <div className="infoContainer">
      <button id="logout"className="btn" onClick={() => (window.location.href = "/Signin")} type="button">
        Log Out
      </button>
      </div>
    </section>
  )
}
export default MemberPage