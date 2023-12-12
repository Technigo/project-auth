import mongoose from "mongoose";
const profileSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add your last name"],
    },
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
    },
    phone: {
      type: Number,
      required: [true, "Please add your phone number"],
    },
    important: {
      type: Date,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    flower: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const ProfileModel = mongoose.model("Profile", profileSchema);
