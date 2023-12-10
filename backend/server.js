// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authUserMiddleware from './middleware/authMiddleware';
// import userRoutes from './models/userModel';
import authUserRoutes from './routes/authUserRoutes';
import secretRoute from './routes/secretRoutes'; // Add this line
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});

app.use('/auth', authUserMiddleware);
app.use('/user', authUserRoutes);
// app.use('/auth', authUserRoutes);
app.use('/secret', secretRoute); // Add this line

app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




// server.js
// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import authUserMiddleware from './middleware/authMiddleware';
// import userRoutes from './models/userModel';
// import authUserRoutes from './routes/authUserRoutes';
// import listEndpoints from 'express-list-endpoints';
// import dotenv from 'dotenv';
// dotenv.config();

// const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/project-mongo";
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = Promise;

// const port = process.env.PORT || 8080;
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request at ${req.url}`);
//   next();
// });

// app.use('/auth', authUserMiddleware);

// app.use('/user', userRoutes);
// app.use('/auth', authUserRoutes);

// app.get("/", (req, res) => {
//   res.json(listEndpoints(app));
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });







