import { HandleFocus } from "../helpers/HandleFocus";

export const TextInput = ({ inputType, inputName, placeholder, label, value, onChange }) => {
  const { placeholder: initialPlaceholder, handleFocus, handleOnBlur } = HandleFocus(placeholder, inputName);

  return (
    <>
      <label>
        {label}
        <input
          type={inputType}
          placeholder={initialPlaceholder}
          name={inputName}
          onFocus={handleFocus}
          onBlur={(e) => handleOnBlur(e.target.value)}
          required
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};
