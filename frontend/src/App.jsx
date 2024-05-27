import { BrowserRouter } from "react-router-dom"
import { AuthRoutes } from "./routes/AuthRoutes"

export const App = () => {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  )
}
