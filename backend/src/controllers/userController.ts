import { Request, Response } from "express";
const bcrypt = require("bcrypt-nodejs");
const User = require("../models/userModel");

exports.createNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
    console.log(res);
  } catch (err) {
    res.status(400).json({ message: "Could not create user", errors: err.error });
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(400).json({ notFound: true });
  }
};

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({ status: "success", users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", message: err.error });
  }
};

exports.updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body);
    if (!updatedUser) throw new Error("User is not exist");
    res.status(200).json({ status: "success", name: updatedUser.name, id: updatedUser._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", message: err.error });
  }
};
