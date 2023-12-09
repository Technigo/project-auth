import { Express } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controller/controller";
import { authenticateUser } from "../middleware/authenticateUser";

//Registration endpoint, to create a new user.
route.post("/register", registerUserController);
//Sign-in endpoint, to authenticate a returning user.
route.post("/signin", loginUserController);
//The route which let the registered user to access promotion info
route.get("/get", authenticateUser, getInfoController);

export default route;
