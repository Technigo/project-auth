import { HandleFocus } from "../helpers/HandleFocus";

export const TextInput = ({ inputType, inputName, placeholder, label }) => {
  const { placeholder: ourPlaceholder, handleFocus, handleOnBlur } = HandleFocus(placeholder, inputName);

  return (
    <>
      <label>
        {label}
        <input
          type={inputType}
          placeholder={ourPlaceholder}
          name={inputName}
          onFocus={handleFocus}
          onBlur={(e) => handleOnBlur(e.target.value)}
        />
      </label>
    </>
  );
};
