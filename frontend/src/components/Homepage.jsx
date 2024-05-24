//import
import { Link } from "react-router-dom";
//styling

//component
export const Homepage = () => {
  return (
    <div>
      Homepage
      <Link to={`/login`}>
        <p>Login here</p>
      </Link>
      <Link to={`/registration`}>
        <p>Register here</p>
      </Link>
    </div>
  );
};
