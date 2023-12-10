"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const userModel_1 = require("../models/userModel");
const authenticateUser = async (req, res, next) => {
    try {
        const user = await userModel_1.User.findOne({ accessToken: req.headers.authorization });
        if (user) {
            req.body.name = user;
            next();
        }
        else {
            res.status(401).json({ loggedOut: true });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, response: err.message });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map