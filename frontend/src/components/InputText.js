import React from 'react';

export const InputText = ({ label, type, value, name, setInputValue, minLength }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <label>{label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          required={true}
          min-length={minLength}
        />
      </label>
    </div>
  );
};

