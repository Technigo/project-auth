import { LoggedinComp } from "../components/LoggedInComp";
import { Logout } from "../components/Logout";

export const LoggedinPage = () => {
  return (
   <div className="logged-in-wrapper">
    <LoggedinComp/>
    <Logout/>
   </div>
  );
};
