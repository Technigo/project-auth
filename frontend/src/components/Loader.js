import React from 'react';
import logo from '../logo.svg';

const Loader = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="loading">Loading</p>
      </header>
    </div>
  );
};

export default Loader;
