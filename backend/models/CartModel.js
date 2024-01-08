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
        options:{
          type: String,
          enum: [
            "weekly", "monthly", "yearly"
          ],
          required: [
            true,
            "Please specify a valid option, i.e. weekly, monthly or yearly"
          ], 
        },
        quantity:{
          type: Number,
          required: true
        },
        price:{
          type: Number,
          required: true
        },
        deliveryCost:{ 
          type: Number,
          default: 0
        },
        sum:{
          type: Number,
          required: true
        },
        greeting:{
          type: String,
          required: true,
          minLength: [5, "A minimum of 5 characters is required"],
          maxLength: [100, "The message can contain a maximum of 100 characters"]
        }
},
{
    timestamps: true,
  }
  )
  
  // //------Mongoose model middleware with pre-save hook ------
  //   //Base price for the different flower options
  // cartSchema.pre("save", function (next) {
  //   let basePrice ;
  //   if (this.flower === "basic") {
  //     basePrice = 150;
  //   } else if (this.flower === "standard") {
  //     basePrice = 250;
  //   } else if (this.flower === "large") {
  //     basePrice = 350;
  //   } else {
  //     // Handle any other cases or throw an error if needed
  //     return next(new Error("Invalid flower option."));
  //   }
  //   //Quantity of bouquets purchased according to the subscription option
  //   if (this.options === "weekly") {
  //     this.quantity = 1;
  //   } else if (this.options === "monthly") {
  //     this.quantity = 4;
  //   } else if (this.options === "yearly") {
  //     this.quantity = 52;
  //   } else {
  //     // Handle any other cases or throw an error if needed
  //     return next(new Error("Invalid subscription plan."));
  //   }
  //    // Total price for all flower services
  //   if (this.options === "weekly") {
  //     this.price = basePrice * this.quantity;
  //   } else if (this.options === "monthly") {
  //     this.price = basePrice * this.quantity;
  //   } else if (this.options === "yearly") {
  //     this.price = basePrice * this.quantity;
  //   } else {
  //     // Handle any other cases or throw an error if needed
  //     return next(new Error("Error occured while ordering."));
  //   }
  //   this.sum = this.price + this.deliveryCost
  //   next();
  // });
 // This middleware ensures that the necessary calculations and validations are performed before saving a cart document, encapsulating logic related to the document before it gets saved to the database.
export const CartModel = mongoose.model("Cart", cartSchema);

