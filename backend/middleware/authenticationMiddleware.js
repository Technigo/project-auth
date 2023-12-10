import User from '../models/userModel';

const authenticateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ accessToken: req.header('Authorization') });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({ loggedOut: true });
        }
    } catch (err) {
        console.error('Authentication Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default authenticateUser;
