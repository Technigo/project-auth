export const Button = ({ btnText, type, onClick }) => {
  return (
    <button onClick={onClick} type={type}>
      {btnText}
    </button>
  );
};
