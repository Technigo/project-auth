import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import secretRoutes from './routes/secretRoutes';
import sessionRoutes from './routes/sessionRoutes';

dotenv.config();

mongoose.set('strictQuery', false);

const mongoUrl = process.env.MONGO_URI || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  try {
    const endpoints = listEndpoints(app);
    res.json({ endpoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.use(userRoutes);
app.use(secretRoutes);
app.use(sessionRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
