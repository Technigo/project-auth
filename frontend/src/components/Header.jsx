import 'react';
import Button from './reusecomponents/Button';

const Header = () => {
    return (
        // Added flex and flex-col for mobile layout, md:flex-row for desktop layout
        <div className="container mx-auto my-8 flex flex-col md:flex-row md:justify-between">
            {/* Added md:order-2 to move h1 to the middle on desktop */}
            <h1 className="font-archivoBlack text-customBlue text-3xl font-bold mb-4 md:mb-0 md:order-2 text-left">hello world</h1>

            {/* Wrapped buttons in a div for better control */}
            <div className="flex flex-col md:flex-row md:space-x-4 md:order-1">
                <Button to="/login" text="Login" className="font-archivoBlack text-customBlue text-3xl px-4 py-2 text-left" />
                <Button to="/signup" text="SignUp" className="font-archivoBlack text-customBlue text-3xl px-4 py-2 mb-4 md:mb-0 text-left" />

            </div>

            {/* Additional div for spacing on desktop */}
            <div className="hidden md:block md:order-3 md:w-1/4"></div>
        </div>
    );
};

export default Header;