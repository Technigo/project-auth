import React from 'react';

const Dashbord = ({ onLogout }) => {
    const handleLogout = () => {
        // Perform any necessary cleanup or logout logic
        onLogout();
    };

    return (
        <div>
            <h1>Welcome to Your Dashboard!</h1>
            {/* Display user-specific content or actions */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashbord;
