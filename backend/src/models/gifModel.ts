const mongoose = require("mongoose");
const gifSchema = new mongoose.Schema(
  {
    word: { type: String, required: [true, "gif needs the word to search"] },
    path: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "gifSchema need to know the user"],
    },
  },
  {
    timestamps: true,
  }
);

const Gif = mongoose.model("Gif", gifSchema);

module.exports = Gif;
