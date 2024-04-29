import { useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore"; // Adjust path as needed

export const Home = () => {
    const navigate = useNavigate();
    const logout = userStore(state => state.handleLogout);

    const onSignOut = () => {
        logout(); // This should clear the token and update the isLoggedIn state.
        navigate('/'); // Redirect the user to the login page.
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome Home!</h1>
            <p className="mb-4 text-lg text-gray-600">This is a protected area of the app</p>
            <button
                onClick={onSignOut}
                className="px-6 py-2 border rounded text-white font-medium bg-blue-500 hover:bg-blue-600"
            >
                Sign Out
            </button>
        </div>
    );
};













// pages/Home.jsx
// import 'react';
// import ImageGallery from '../components/ImageGallery';
// import Header from '../components/Header';

// const Home = () => {
//     return (
//         <Header />
//     );
// };

// export default Home;