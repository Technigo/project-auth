import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const Blacklist = mongoose.model("Blacklist", BlacklistSchema);

// Export the model
export default Blacklist;
