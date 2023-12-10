"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGif = exports.createGif = exports.getGifs = void 0;
const gifModel_1 = require("../models/gifModel");
const userModel_1 = require("../models/userModel");
const getGifs = async (req, res) => {
    try {
        const accessToken = req.headers.authorization;
        const userStorage = await userModel_1.User.findOne({ accessToken: accessToken });
        const gifs = await gifModel_1.Gif.find({ user: userStorage }).sort("-createdAt");
        if (!gifs || gifs.length < 0)
            return res.status(401).json({ status: false, message: "you haven't added gif yet" });
        console.log(gifs);
        res.status(200).json({ status: true, gifs });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};
exports.getGifs = getGifs;
const createGif = async (req, res) => {
    try {
        const accessToken = req.headers.authorization;
        const userStorage = await userModel_1.User.findOne({ accessToken: accessToken });
        const { word, path } = req.body;
        const newGif = await new gifModel_1.Gif({
            word: word,
            user: userStorage,
            path: path,
        }).save();
        res.status(401).json({ status: true, newGif });
        console.log(newGif);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: false, err });
    }
};
exports.createGif = createGif;
const deleteGif = async (req, res) => { };
exports.deleteGif = deleteGif;
//# sourceMappingURL=gifController.js.map