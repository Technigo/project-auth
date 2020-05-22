import React, { useState } from 'react'
import { InputText } from './InputText.js'

export const Form = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  return (
    <form>
      <InputText
        label="Name"
        type="text"
        id="inputName"
        placeholder="Name"
        state={inputValue.name}
        setState={setInputValue.name}
      />
      {console.log(inputValue)}
    </form>
  )
}
