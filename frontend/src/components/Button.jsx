export const Button = ({ onClick, text, className = '' }) => {
    return (
        <button
            className={`w-auto text-white border-4 border-blue-900 rounded-3xl p-2 m-3 bg-black hover:bg-white hover:text-black ${className}`}
            onClick={onClick}>
            {text}
        </button>
    );
};
