const Input = ({ className = "", ...inputProps }) => {
    return (
        <input
            {...inputProps}
            className={`${className} block w-full mb-2 border-2 border-pink-100 rounded-md py-1 px-2 text-slate-700 focus:border-pink-300 focus:outline-none`}
        />
    );
}

export default Input;