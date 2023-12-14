import express from "express";
import {
  registerUserController,
  loginUserController,
  getInfoController,
  showUsersController,
} from "../controller/controller";
import { authenticateUser } from "../middleware/authenticateUser";
import listEndpoints from "express-list-endpoints";

const route = express.Router();

// Fetch the whole set of data
route.get("/", async (req, res) => {
  res.send(listEndpoints(route));
});
//Get the users
route.get("/users", showUsersController);
//Registration endpoint, to create a new user.
route.post("/register", registerUserController);
//Sign-in endpoint, to authenticate a returning user.
route.post("/signin", loginUserController);
//The route which let the registered user to access promotion info
route.get("/get", authenticateUser, getInfoController);
//Get the items which are on promotion
route.get("/items", getInfoController);

export default route;
