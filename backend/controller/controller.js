import { UserModel } from "../models/userModel";
import { MensItemsModel } from "../models/MensItem";
import asyncHadler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateUser } from "../middleware/authenticateUser";
dotenv.config();

// Gernerate JWT token for user autehntication
const generateToken = (user) => {
  return (
    jwt.sign({ accessToken: user.acessToken }),
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
//Registration endpoint, to create a new user.
export const registerUserController = asyncHadler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is already in use
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username is already in use" });
    }
    // Encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance with the hashed password
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message and user data
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Cannot connect to the server" });
  }
});

//Sign-in endpoint, to authenticate a returning user.
export const loginUserController = asyncHadler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Find the user by username
    const user = await UserModel.findOne({ username });

    //If the user is not found, return an authentication error
    if (!user) {
      return res
        .status(401)
        .json({ sucess: false, response: "User not found" });
    }
    //Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    //If the password is wrong, return an error message
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ sucess: false, response: "Incorrect password" });
      //Generate a jwt token with the environment variable if the password is correct
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        sucess: true,
        response: {
          userId: user._id,
          username: user.username,
          email: user.email,
          accessToken: token,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ sucess: false, response: "Cannot connect to the server" });
  }
});

//An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.
export const getInfoController = asyncHadler(async (req, res) => {
  const accessToken = req.header("Authorization");
  const userFromStorage = await UserModel.findOne({ accessToken: accessToken });
  const items = await MensItemsModel.find({ isPromotion: true })
    .sort({
      quantity_sold: -1,
    })
    .then((items) => res.json(items))
    .catch((error) => res.json({ error: "Item Not found" }));
});
