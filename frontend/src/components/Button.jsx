const Button = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="border-2 border-pink-600 rounded-md py-1 px-2 bg-pink-500 text-pink-100 hover:bg-pink-600"
        >
            {children}
        </button>
    );
}

export default Button;