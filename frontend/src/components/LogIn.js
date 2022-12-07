import React from 'react';

export const LogIn = () => {
  return (
    <div>
      <form>
        <label htmlfor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="username" />
        <label htmlfor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" />
        <input type="submit" value="Log in" />
      </form> 
    </div>
  );
}