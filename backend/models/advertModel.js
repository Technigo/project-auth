import mongoose from "mongoose";

const { Schema } = mongoose;

export const advertSchema = new Schema(
  {
    // Define the 'task' field with a String data type
    description: {
      type: String, 
      required: true, 
      minlength: 5, // Sets a minimum length of 5 characters for 'description'
    },
    // Define the rlaitonship between the user and his/her tasks --  1:1 relationship with the user or 1 usar can have many tasks
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

