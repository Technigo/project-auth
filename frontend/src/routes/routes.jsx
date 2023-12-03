import { Route } from "react-router-dom";
import { Welcome } from "../pages/Welcome";
import { ErrorPage } from "../pages/ErrorPage";

export const routes = () => {
  return (
    <>
      <Route path="/" component={<Welcome />} />
      <Route path="*" component={<ErrorPage />} />
    </>
  )
}
