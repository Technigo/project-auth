import express from "express";
import cors from "cors";

const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt-nodejs");

const User = require("./models/userModel");
const listEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 8080;
const app = express();

const userRouter = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.all("*", (req, res, next) => {
  res.status(500).json({ status: "fail", message: "Something went very wrong 💥 " });
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorization") });
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     req.status(401).json({ loggedOut: true });
//   }
// };

// const dbEntry = { name: "bob", password: "Sabbc32983def" };
// bcrypt.compareSync(request.password, dbEntry.password);

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User({ name, email, password: bcrypt.hashSync(password) });

    user.save();
    res.status(201).json({ is: user._id, accessToken: user.accessToken });
    console.log(res);
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err });
  }
});

app.post("/sessions", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  }
});

// app.post("/tweet", authenticateUser);
// app.post("/tweet", async (req, res) => {});
