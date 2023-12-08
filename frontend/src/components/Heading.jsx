// Heading component that can be easily extended and customized
export const Heading = ({ text, size = '3xl', className = '', ...restProps }) => {
    return (
        // Actual heading element with dynamic class names and additional properties
        <h2
            className={`text-${size} font-bold block m-2 mb-3 ${className}`}
            {...restProps} // Spread additional properties onto the heading element
        >
            {text}
        </h2>
    );
};


