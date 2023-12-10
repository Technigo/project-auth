// Button component that can be easily extended and customized
export const Button = ({ onClick, text, className = '', ...restProps }) => {
    return (

        // Actual button element with dynamic class names and additional properties
        <button
            className={`w-auto text-white border-4 border-blue-900 rounded-3xl p-2 m-3 bg-black hover:bg-white hover:text-black ${className}`}
            onClick={onClick}
            {...restProps} // Spread additional properties onto the button element
        >
            {text}
        </button>
    );
};
