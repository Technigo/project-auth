import React from "react"



export const MemberPage = (props) => {

  return(
    <section>
      <h2>Member information</h2>
      <h3>{props.name}</h3>
      <h3>{props.email}</h3>
      <button id="logout"className="btn" onClick={() => (window.location.href = "/Signin")} type="button">
        Log Out
      </button>
    </section>
  )
}