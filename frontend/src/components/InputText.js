import React from 'react';

export const InputText = ({ label, type, value, name, setInputValue, minLength, passwordCheck }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <label>{label}

        <div className="password-emoji"><div>{passwordCheck ? passwordCheck : ""}</div></div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          required={true}
          min-length={minLength}
        />
      </label>
    </>
  );
};

