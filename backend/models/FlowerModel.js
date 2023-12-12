import mongoose from "mongoose";
const flowerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
    },
    flower: {
      type: String,
      enum: ["basic", "standard", "large"],
      required: [
        true,
        "Please provide a valid flower type (basic, standard, large)",
      ],
    },
    options: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      required: [
        true,
        "Please provide a valid option (weekly, monthly, yearly)",
      ],
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryMethod: {
      type: String,
      default: "self-pickup",
      enum: ["self-pickup", "delivery"],
    },
  },
  {
    timestamps: true,
  }
);

// Calculate price based on flower type and options
//Pre middleware functions are executed one after another, when each middleware calls next.
flowerSchema.pre("save", function (next) {
  const basePrice = 150; // base price for all flower services

  if (this.options === "weekly") {
    this.price = basePrice;
  } else if (this.options === "monthly") {
    this.price = basePrice * 4;
  } else if (this.options === "yearly") {
    this.price = basePrice * 4 * 12;
  } else {
    // Handle any other cases or throw an error if needed
    return next(new Error("Invalid flower option"));
  }

  next();
});

export const FlowerModel = mongoose.model("Flower", flowerSchema);
