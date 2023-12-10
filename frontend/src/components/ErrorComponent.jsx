import React from 'react';

export const ErrorComponent = ({ errorMessage }) => {
    return (
        <p className="text-red-500 h-8 text-center">{errorMessage}</p>
    );
};

