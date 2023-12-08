// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
const listEndpoints = require('express-list-endpoints');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3002;

mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Middleware to check the authentication token for protected routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Authentication token is missing');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Authentication token has expired');
      }
      return res.status(403).send('Invalid authentication token');
    }
    req.userId = decoded.userId;
    next();
  });
};

// Use the authentication routes directly
app.use('/api', authRoutes);

// Authenticated endpoint (example)
app.get('/api/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected resource', user: req.userId });
});

// Endpoint to list all routes
app.get('/api/endpoints', (req, res) => {
  const endpoints = listEndpoints(app);
  res.status(200).json(endpoints);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
