import User from "../models/User";

const authenticateUser = async (req, res, next) => {
    const accessToken = req.headers.Authorization;
    const user = await User.findOne({ accessToken });

    if (user) {
        next();
    } else {
        res.status(401).json({ message: "You are not authenticated" });
    }
};

export default authenticateUser;
