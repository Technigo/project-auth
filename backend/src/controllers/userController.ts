import { Request, Response } from "express";
import bcrypt from "bcrypt-nodejs";
import { User } from "../models/userModel";

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("All fields need to be filled !!");
    }

    const existingUser = await User.findOne({
      $or: [{ name }, { email }],
    });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const user = new User({ name, email, password: bcrypt.hashSync(password, salt) });
    await user.save();
    res.status(201).json({ status: true, id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (user?.password && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).json({ status: true, name: user.name, accessToken: user.accessToken });
  } else {
    res.status(400).json({ status: false, notFound: true });
  }
};

////// not tested yet ///////

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({ status: true, users });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: false, message: err.error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
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

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findOneAndDelete({ _id: id });
    if (!updatedUser) throw new Error("User is not exist");
    res.json({ status: "success", data: null });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "error", message: err.error });
  }
};
