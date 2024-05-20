import express, { response } from "express";
import User from "../model/user-model";
import listEndpoints from "express-list-endpoints";
import bcrypt from "bcrypt";
import { authorizeUser, authenticateUser } from "../middleware/Middleware";

const router = express.Router();
const adminRouter = express.Router();
adminRouter.use(authenticateUser, authorizeUser(["admin"]));

// Add adminRouter to the main router
router.use("/admin", adminRouter);

// add user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();
    res.status(201).json({
      userId: newUser._id,
      accessToken: newUser.accessToken,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});
// get all users in the database
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//log in user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(400).json({ notFound: true, message: "User not found" });
  }
});

// Patch request to update user
router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    },
    { new: true }
  );
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//route for getting content behind authentication - lets update this with something that makes sense later :)
router.get("/secrets", authenticateUser, (req, res) => {
  res.send(
    "The password is potato - you are authenticated and can see this members only content  -lucky you!"
  );
});

// route for getting content behind authorization find me at /admin/admin
adminRouter.get("/admin", (req, res) => {
  res.send(
    "This is the admin page - you are authorized to view this content  - so much admin stuff to do here!"
  );
});

//admin update user -  find me at /admin/admin/users/:id
adminRouter.put("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ error: "All fields are required" });
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
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
});

//endpoint for only updating the user role - find me at admin/admin/users/:id
adminRouter.patch("/admin/users/:id", async (req, res) => {
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
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
});

//delete user - find me at /admin/admin/users/:id
adminRouter.delete("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "user deleted", deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
});

router.get("/", (req, res) => {
  try {
    const endpoints = listEndpoints(router);
    const updatedEndpoints = endpoints.map((endpoint) => {
      if (endpoint.path === "/") {
        return {
          path: endpoint.path,
          methods: endpoint.methods,
          queryParameters: [],
        };
      }
      return {
        path: endpoint.path,
        methods: endpoint.methods,
      };
    });
    res.json(updatedEndpoints);
  } catch (error) {
    // If an error occurred, create a new error with a custom message
    const customError = new Error(
      "An error occurred while fetching the endpoints"
    );
    res.status(404).json({
      success: false,
      response: error,
      message: customError.message,
    });
  }
});

export default router;
