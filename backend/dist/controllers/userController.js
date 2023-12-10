"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.loginUser = exports.createNewUser = void 0;
const tslib_1 = require("tslib");
const bcrypt_nodejs_1 = tslib_1.__importDefault(require("bcrypt-nodejs"));
const userModel_1 = require("../models/userModel");
const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("All fields need to be filled !!");
        }
        const existingUser = await userModel_1.User.findOne({
            $or: [{ name }, { email }],
        });
        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }
        const salt = bcrypt_nodejs_1.default.genSaltSync(10);
        const user = new userModel_1.User({ name, email, password: bcrypt_nodejs_1.default.hashSync(password, salt) });
        await user.save();
        res.status(201).json({ status: true, id: user._id, accessToken: user.accessToken });
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};
exports.createNewUser = createNewUser;
const loginUser = async (req, res) => {
    const user = await userModel_1.User.findOne({ email: req.body.email });
    if (user?.password && bcrypt_nodejs_1.default.compareSync(req.body.password, user.password)) {
        res.status(200).json({ status: true, name: user.name, accessToken: user.accessToken });
    }
    else {
        res.status(400).json({ status: false, notFound: true });
    }
};
exports.loginUser = loginUser;
////// not tested yet ///////
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.User.find();
        console.log(users);
        res.status(200).json({ status: true, users });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: false, message: err.error });
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userModel_1.User.findOneAndUpdate({ _id: id }, req.body);
        if (!updatedUser)
            throw new Error("User is not exist");
        res.status(200).json({ status: "success", name: updatedUser.name, id: updatedUser._id });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: err.error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userModel_1.User.findOneAndDelete({ _id: id });
        if (!updatedUser)
            throw new Error("User is not exist");
        res.json({ status: "success", data: null });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: err.error });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map