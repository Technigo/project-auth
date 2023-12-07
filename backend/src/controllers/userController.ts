const bcrypt = require("bcrypt-nodejs");
const User = require("../models/userModel");

exports.createNewUser = async (req, res) => {
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
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.json({ notFound: true });
  }
};

exports.getAllUsers = async (req, res) => {};

exports.updateUser = async (req, res) => {};
