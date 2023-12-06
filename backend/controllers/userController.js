import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//NEED TO READ MORE ABOUT jsonwebtoken

// Function to generate a JWT token for user authentication
const generateToken = (user) => {
  // Generate a JWT token containing the user's unique ID, with an optional secret key and a 24-hour expiration time
  return jwt.sign({ accessToken: user.accessToken }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
};

//-----FUNCTIONS - REGISTER------//

//register endpoint, assigns a name, email and password into the database
export const registerUserController = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter name, email and password");
    }
    //check if user exists
    const userExists = await UserModel.findOne({
      $or: [{ name }, { email }],
    });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPW = bcrypt.hashSync(password, salt);

    // or can use this from code along
    // const user = new User({ name, email, password: bcrypt.hashSync(password) });
    const newUser = new UserModel({
      name,
      email,
      password: hashedPW,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      response: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});

//registration endpoint, assigns a name, email and password into the database - from codealong
// app.post("/users", async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       //DO NOT STORE PLAINTEXT PASSWORDS
//       const user = new User({ name, email, password: bcrypt.hashSync(password) });
//       user.save();
//       res.status(201).json({ id: user._id, accessToken: user.accessToken });
//     } catch (err) {
//       res
//         .status(400)
//         .json({ message: "Could not create user", errors: err.errors });
//     }
//   });

//-----FUNCTIONS - LOGIN------//

//register endpoint, assigns a name, email and password into the database
export const loginUserController = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await UserModel.findOne({ name });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, response: "This user is not found" });
    }

    const isPwMatched = await bcrypt.compare(password, user.password);
    if (!isPwMatched) {
      return res
        .status(401)
        .json({ success: false, response: "Your password is incorrect" });
    }

    res.status(200).json({
      success: true,
      response: {
        name: user.name,
        id: user._id,
        accessToken: user.accessToken,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});

//same as above but done with codealong
//login endpoint called session which does nearly the same thing as the registration endpoint but it does not create the user, it finds one!
// app.post("/sessions", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user && bcrypt.compareSync(req.body.password, user.password)) {
//     //authentification successful
//     res.json({ userId: user._id, accessToken: user.accessToken });
//   } else {
//     //failed a. user doesn't exist or b. encrypted pw does not match
//     res.json({ notFound: true });
//   }
// });
