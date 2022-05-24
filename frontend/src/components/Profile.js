import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h1>Secret page - profile</h1>
      <Link to="/profile" />
    </div>
  );
};

export default Profile;
