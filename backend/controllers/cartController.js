import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import { CartModel } from "../models/CartModel";

// @desc Post user's cart information (with confirm button on frontend)
// @route POST /cart/:user_id
// @access Private
export const addUserCartController = asyncHandler(async (req, res) => {
  try {
       
    //find the correct user and the user get the authorization
    const user = await UserModel.findById(req.params.user_id);
    if (!user) {
      res.status(400).json({
        success: false,
        error: "User not found",
      });
    } else {
      const newShoppingCart = new CartModel({
        user_id: req.user.id,        
        flower: req.body.flower,        
        options: req.body.options,
        quantity: req.body.quantity,
        price: req.body.price,        
        sum: req.body.sum,
        greeting: req.body.greeting
      });
      // Save the new cart to the database
      await newShoppingCart.save();

      res.status(201).json({ success: true, response: newShoppingCart });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});