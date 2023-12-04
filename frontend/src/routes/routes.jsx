import { Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { ErrorPage } from "../pages/ErrorPage";
import { Dashboard } from "../pages/Dashboard";

export const routes = () => {
  return (
    <>
      <Route path="/" component={<Login />} />
      <Route path="/dashboard" component={<Dashboard />} />
      <Route path="*" component={<ErrorPage />} />
    </>
  )
}
