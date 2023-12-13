
import { LogedInComp } from "../components/LogedInComponet";
import { Logout } from "../components/LogOut";

export const LogedInPage = () => {
  return (
   <div className="logged-in-wrapper">
    <LogedInComp/>
    <Logout/>
   </div>
  );
};