import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ id: user._id, accessToken: user.accessToken });
    } catch (err) {
        console.error('User Registration Error:', err);
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email is already in use.' });
        } else {
            res.status(500).json({ message: 'Could not create user. Please try again later.' });
        }
    }
};
