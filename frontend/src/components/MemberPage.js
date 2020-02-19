import React, {useState, useEffect} from 'react'


export const MemberPage = (props) => {

  return(
    <section>
      <h2>Member information</h2>
  <h3>{props.name}</h3>
  <h3>{props.email}</h3>
    </section>
  )
}