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
  
export const CartModel = mongoose.model("Cart", cartSchema);

