//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the accesstoken
import { UserModel } from "../models/UserModel";
import { AdvertModel } from "../models/advertModel";

// desciption: Get Ads
// route: /get
// access: Private
export const getAdvertController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page from query parameters or default to page 1
  const pageSize = 20; // Number of ads per page

  try {
    const accessToken = req.header("Authorization"); // Get the access token from the request header
    const userFromStorage = await UserModel.findOne({ accessToken });

    const ads = await AdvertModel.find({ user: userFromStorage })
      .sort("-createdAt") // Sort by createdAt in descending order
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("user") // Populate user details if needed
      .exec();

    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// desciption: POST Advertisement
// route: /add
// access: Private
export const addAdvertController = asyncHandler(async (req, res) => {
  try {
    // Extract the advert data from the request body
    const { brand, imageUrl, size, model, price } = req.body;
    // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });

    const newAdvert = new AdvertModel({
      brand,
      imageUrl,
      size,
      model,
      price,
      user: userFromStorage._id, // Assign the logged-in user's ID to the advertisement
    });

    await newAdvert.save();
    res.status(201).json(newAdvert);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific advert to mark as finsihed
// route: /update/:id"
// access: Private
export const updateAdvertController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use TaskModel to find and update a task by its ID, marking it as done
  await AdvertModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result)) // Respond with the updated task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all ads
// route: /deleteAll
// access: Private
export const deleteAllAdvertController = asyncHandler(async (req, res) => {
  // Use TaskModel to delete all tasks in the database
  await AdvertModel.deleteMany({})
    .then((result) =>
      res.json({
        message: "All ads deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted tasks
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE task by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificAdvertController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Use TaskModel to find and delete a task by its ID
  await AdvertModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Ad deleted successfully",
          deletedAdvert: result,
        }); // Respond with a success message and the deleted task
      } else {
        res.status(404).json({ message: "Ad not found" }); // Respond with a 404 error if the task is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});