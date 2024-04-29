
import React from "react";

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-3xl text-gray-800 mb-4">Page Not Found</p>
            <p className="mb-8 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <a
                href="/"
                className="px-6 py-2 border rounded text-white font-medium bg-blue-500 hover:bg-blue-600"
            >
                Go Home
            </a>
        </div>
    );
};
