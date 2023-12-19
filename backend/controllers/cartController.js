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
      const newShoppingCart = new CartModel({
        user_id: req.user.id,
        // Filling in cart fields
        flower: req.body.flower,        
        options: req.body.options,
        price: req.body.price,
        deliveryCost: req.body.deliveryCost,
        sum: req.body.sum,
      });

      // Save the new cart to the database
      await newShoppingCart.save();

      res.status(201).json({ success: true, response: newShoppingCart });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// @desc Delete user's cart information
// @route DELETE /cart/:user_id
// @access Private
export const deleteUserCartController = asyncHandler(async (req, res) => {
  try {
       
    //find all matching shopping carts to the user
    const shoppingCarts = await CartModel.find({ user_id: req.params.user_id});
    console.log(shoppingCarts);
    // if (!shoppingCarts) not working giving 201 status with empty array
    if (shoppingCarts.length == 0) {
      res.status(404).json({
        success: false,
        error: "No previous shopping cart was registered in our system",
      });
    }else{
      // each shopping cart (element) will then be deleted
      for (const element of shoppingCarts){
        console.log(element._id);
        await CartModel.findByIdAndDelete(element._id);           
      };    
        res.status(201).json({ success: true, response: "Shopping cart deleted successfully" });
    }
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  };
});

// @desc Get user's cart information
// @route Get /cart/:user_id
// @access Private
export const getUserCartController = asyncHandler(async (req, res) => {
    //find the user's profile information
  
    try {
      console.log("shopping cart")
      console.log(req.params.user_id) // Comes from /cart/:user_id
      console.log(req.user.id) // comes from decoded token in authneticateUser.js
      const shoppingCart = await CartModel.find({ user_id: req.params.user_id });
      //console.log(shoppingCart);
//       if(!shoppingCart) ==> {
//     "success": true,
//     "response": []
// }
      if (shoppingCart.length == 0) {
        res.status(404).json({ success: false, response: "Shopping order not found" });
      }else{
        res.status(200).json({ success: true, response: shoppingCart });
      } 
      } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });