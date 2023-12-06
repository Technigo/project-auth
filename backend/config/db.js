// import mongoose from "mongoose";
// import asyncHandler from "express-async-handler";
// import dotenv from "dotenv";
// dotenv.config();

// export const connectDB = asyncHandler(async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1); // 1 means exit with failure
//   }
// });

// export const connectDB = asyncHandler(async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`MongoDB Connection Error: ${error.message}`);
//     process.exit(1); // 1 means exit with failure
//   }
// });
