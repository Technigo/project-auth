// Heading component definition
export const Heading = ({ level, text, className, onClick, style }) => {
    const Tag = `h${level}`;
    return (
        <Tag className={className} onClick={onClick} style={style}>
            {text}
        </Tag>
    );
};

// Define default props
Heading.defaultProps = {
    level: 1, // Default to h1
    className: '',
    onClick: () => {}, // Default to a no-operation function
    style: {}, // Default to an empty style object
};

// Example Usage
/*
<Heading
    level={1}
    text="Main Heading"
    className="main-heading"
    onClick={() => console.log("Heading clicked")}
    style={{ cursor: 'pointer' }}
/>
*/
