import { TaskModel } from "../models/TaskModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";

// desciption: Get Tasks
// route: /get
// access: Private
export const getTasksController = asyncHandler(async (req, res) => {
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  // Use the TaskModel to find all tasks associated with the logged-in user
  await TaskModel.find({ user: userFromStorage })
    .sort("-createdAt")
    .then((result) => res.json(result)) // Respond with the found tasks in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: POST Tasks
// route: /add
// access: Private
export const addTaskController = asyncHandler(async (req, res) => {
  try {
    // Extract the task data from the request body
    const { task } = req.body;
    // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });
    // Define var to pass new task
    const newTask = new TaskModel({
      task: task,
      user: userFromStorage,
    }).save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific task to mark it complete
// route: /update/:id"
// access: Private
export const updateTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use TaskModel to find and update a task by its ID, marking it as done
  await TaskModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result)) // Respond with the updated task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all tasks
// route: /deleteAll
// access: Private
export const deleteAllTasksController = asyncHandler(async (req, res) => {
  // Use TaskModel to delete all tasks in the database
  await TaskModel.deleteMany({})
    .then((result) =>
      res.json({
        message: "All tasks deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted tasks
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE task by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Use TaskModel to find and delete a task by its ID
  await TaskModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Task deleted successfully",
          deletedTask: result,
        }); // Respond with a success message and the deleted task
      } else {
        res.status(404).json({ message: "Task not found" }); // Respond with a 404 error if the task is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});