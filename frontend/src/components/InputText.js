import React from 'react'

export const InputText = ({ label, type, id, placeholder, state, setState }) => {

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={event => setState(event.target.value)}
        value={state}
        minLength="2"
        placeholder={placeholder}
        required
      />
      {console.log(state)}
    </>
  )
}