import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../models/User';

//Route to register (POST)
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  //Validate email
  //   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}s/i;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      response: 'Invalid email address',
    });
  }

  //Try to create a new user
  try {
    const salt = bcrypt.genSaltSync();

    const user = await new User({
      userName: userName,
      email: email,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      success: true,
      response: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        accessToken: user.accessToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error,
    });
  }
});

//Route to log-in (POST)
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName: userName });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          userName: user.userName,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        response: 'Credentials do not match',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
});

export default router;
