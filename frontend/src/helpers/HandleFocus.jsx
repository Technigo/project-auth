import { useState } from "react";

// handles the placeholder visibility depending on, if the input field is active or not
export const HandleFocus = (initialPlaceholder, inputName) => {
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);

  // when the input field is active the placeholder disappear
  const handleFocus = () => {
    setPlaceholder("");
  };

  // if the input field is empty when focusing on another input, the placeholder will appear again.
  const handleOnBlur = (value) => {
    if (value === "") {
      setPlaceholder(initialPlaceholder);
    }
  };

  return { placeholder, handleFocus, handleOnBlur, inputName };
};
