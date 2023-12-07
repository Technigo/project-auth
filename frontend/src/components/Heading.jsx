export const Heading = ({ text, size }) => {
    return (
        <h2 className={`text-${size} font-bold block m-2 text-3xl mb-3`}>
            {text}
        </h2>
    );
};


