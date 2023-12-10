import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({ userId: user._id, accessToken: user.accessToken, name: user.name });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('User Login Error:', err);
        res.status(500).json({ message: 'Could not authenticate. Please try again later.' });
    }
};
