import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import { CartModel } from "../models/CartModel";

// @desc Post user's cart information
// @route POST /cart/:user_id
// @access Private
export const addUserCartController = asyncHandler(async (req, res) => {
  try {
       
    //find the correct user and the user get the authorization
    const user = await UserModel.findById(req.params.user_id);
    console.log(user);
    if (!user) {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    } else {
      const newCart = new CartModel({
        user_id: req.user.id,
        // Filling in cart fields
        flower: req.body.flower,
        quantity: req.body.quantity,
        options: req.body.options,
        price: req.body.price,
        deliveryCost: req.body.deliveryCost,
        sum: req.body.sum,
      });

      // Save the new cart to the database
      await newCart.save();

      res.status(201).json({ success: true, response: newCart });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc Get user's cart information
// @route Get /cart/:user_id
// @access Private
export const getUserCartController = asyncHandler(async (req, res) => {
    //find the user's profile information
  
    try {
      const userCart = await CartModel.find({ user_id: req.user.id });
      console.log(userCart);
      if (!userCart) {
        res.status(404).json({ success: false, response: "Shopping order not found" });
      }
  
      res.status(200).json({ success: true, response: userCart });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });