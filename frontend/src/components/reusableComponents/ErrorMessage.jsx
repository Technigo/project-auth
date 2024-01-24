import './ErrorMessage.css'; 

export const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      {message}
    </div>
  );
};

