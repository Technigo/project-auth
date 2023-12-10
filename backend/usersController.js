import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password: bcrypt.hashSync(password) });

        await user.save();

        // Generate a JWT for the user
        const payload = { userId: user._id, email: user.email };
        const token = generateToken(payload);

        res.status(201).json({ id: user._id, accessToken: token });
    } catch (err) {
        console.error('User Registration Error:', err);
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email is already in use.' });
        } else {
            res.status(500).json({ message: 'Could not create user. Please try again later.' });
        }
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            // Generate a JWT for the user
            const payload = { userId: user._id, email: user.email };
            const token = generateToken(payload);

            res.json({ userId: user._id, accessToken: token, name: user.name });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('User Login Error:', err);
        res.status(500).json({ message: 'Could not authenticate. Please try again later.' });
    }
};
