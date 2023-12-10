// Paragraph component that can be easily extended and customized
export const Paragraph = ({ text, size = 'base', className = '', ...restProps }) => {
    return (
        // Actual paragraph element with dynamic class names and additional properties
        <p className={`text-${size} ${className}`}
            {...restProps} // Spread additional properties onto the paragraph element
        >
            {text}
        </p>
    );
};
