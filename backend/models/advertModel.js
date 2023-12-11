import mongoose from "mongoose";

const { Schema } = mongoose;

export const advertSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      minlength: 2,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // Define the relaitonship between the user and his/her ad --  1:1 relationship with the user or 1 usar can have many tasks
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const AdvertModel = mongoose.model("Advertisement", advertSchema);