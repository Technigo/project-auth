import express from "express";
import User from "../model/user-model";
import bcrypt from "bcrypt";
import { authenticateUser, authorizeUser } from "../middleware/Middleware";

const adminRouter = express.Router();
adminRouter.use(authenticateUser, authorizeUser(["admin"]));

// get all users in the database
adminRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
});

// route for getting content behind authorization find me at /admin
adminRouter.get("/", authenticateUser, authorizeUser(["admin"]), (req, res) => {
  // This code will only run if the user is an admin
  res.render("admin");
});

//admin add user - find me at /admin/users
adminRouter.post("/users", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required", error: error.message });
    }
    const salt = bcrypt.genSaltSync();
    const newUser = new User({
      name,
      email,
      role,
      password: bcrypt.hashSync(password, salt),
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding the user",
      error: error.message,
    });
  }
});

//admin update user -  find me at /admin/users/:id
adminRouter.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required", error: error.message });
    }

    const salt = bcrypt.genSaltSync();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
        password: bcrypt.hashSync(password, salt),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "User not found", error: error.message });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

//endpoint for only updating the user role - find me at admin/users/:id
adminRouter.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "User role updated",
        success: true,
        response: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
});

//delete user - find me at /admin/users/:id
adminRouter.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "user deleted", deletedUser });
    } else {
      res.status(404).json({ message: "User not found", error: error.message });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the user",
      error: error.message,
    });
  }
});

export default adminRouter;
