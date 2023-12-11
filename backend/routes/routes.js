import express from "express";
import {
  registerUserController,
  loginUserController,
  getInfoController,
  showUsersController,
} from "../controller/controller";
import { authenticateUser } from "../middleware/authenticateUser";

const route = express.Router();
//Get the users
route.get("/users", showUsersController);
//Registration endpoint, to create a new user.
route.post("/register", registerUserController);
//Sign-in endpoint, to authenticate a returning user.
route.post("/signin", loginUserController);
//The route which let the registered user to access promotion info
route.get("/get", authenticateUser, getInfoController);
//Get the items which are on promotion
route.get("/promotions", getInfoController);

export default route;
