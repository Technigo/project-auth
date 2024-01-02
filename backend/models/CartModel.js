import mongoose from "mongoose";
const cartSchema = mongoose.Schema (
    {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
          },
        flower:{
          type: String,
          enum: ["basic", "standard", "large"],
          required: [
            true,
            "Please provide a valid flower type (basic, standard, large)"
          ],
        },
        // flower:{
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   ref: "Subscription"
        // },
        options:{
          type: String,
          enum: [
            "weekly", "monthly", "yearly"
          ],
          required: [
            true,
            "Please specify a valid option, i.e. weekly, monthly or yearly"
          ],   
        // options:{
        //   type:mongoose.Schema.Types.ObjectId,
        //   required:[
        //     true,
        //     "Please specify the subscription type: weekly, monthly, yearly"
        //   ],
        //   ref: "Subscription"
        // },     
        },
        price:{
          type: Number,
          required: false
        },
        deliveryCost:{ 
          type: Number,
          default: 0
        },
        sum:{
          type: Number,
          required: false
        }
},
{
    timestamps: true,
  }
  )

  cartSchema.pre("save", function (next) {
    let basePrice ;
    if (this.flower === "basic") {
      basePrice = 150;
    } else if (this.flower === "standard") {
      basePrice = 250;
    } else if (this.flower === "large") {
      basePrice = 350;
    } else {
      // Handle any other cases or throw an error if needed
      return next(new Error("Invalid flower option"));
    }
     // base price for all flower services

    if (this.options === "weekly") {
      this.price = basePrice;
    } else if (this.options === "monthly") {
      this.price = basePrice * 4;
    } else if (this.options === "yearly") {
      this.price = basePrice * 52;
    } else {
      // Handle any other cases or throw an error if needed
      return next(new Error("Invalid flower option"));
    }
    this.sum = this.price + this.deliveryCost
    next();
  });

export const CartModel = mongoose.model("Cart", cartSchema);
