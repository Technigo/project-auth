import { Request, Response } from "express";
import { Gif } from "../models/gifModel";
import { User } from "../models/userModel";

export const getGifs = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization;
    const userStorage = await User.findOne({ accessToken: accessToken });
    const gifs = await Gif.find({ user: userStorage }).sort("-createdAt");
    if (!gifs || gifs.length < 0)
      return res.status(401).json({ status: false, message: "you haven't added gif yet" });

    console.log(gifs);
    res.status(200).json({ status: true, gifs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const createGif = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization;

    const userStorage = await User.findOne({ accessToken: accessToken });
    const { word, path } = req.body;

    const newGif = await new Gif({
      word: word,
      user: userStorage,
      path: path,
    }).save();
    res.status(401).json({ status: true, newGif });
    console.log(newGif);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, err });
  }
};

export const deleteGif = async (req: Request, res: Response) => {};
