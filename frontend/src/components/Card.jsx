const Card = ({ children }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-96 shadow-lg rounded-md p-4 bg-slate-100 text-center">
                {children}
            </div>
        </div>
    );
}

export default Card;
