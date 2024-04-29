# Project Auth API

## Description
This project, "Project Authorization Fullstack," is a full-stack application that demonstrates a user authentication system with image upload functionality. The backend is built with Express.js and integrates MongoDB for data persistence, while the frontend is developed using React.

## Backend - Project Auth Backend

### Features
- User authentication (login, registration, and logout).
- Image upload with Cloudinary integration.
- CRUD operations for ads.
- User and ads management.

### Technologies Used
- Node.js, Express.js
- Mongoose for MongoDB integration.
- bcrypt for password hashing.
- JWT for maintaining user sessions.
- multer and Cloudinary for image uploads.

### Installation
1. Clone the repository.
2. Navigate to the backend directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file and configure your environment variables (e.g., MongoDB URI, JWT secret, Cloudinary details).

### Usage
- Use `npm start` to run the server.
- Use `npm run dev` for development mode with hot reload.

## Frontend

### Features
- User interface for login, registration, and ad management.
- Responsive design using styled-components.
- State management with Zustand.

### Technologies Used
- React
- React Router for routing.
- Styled-components for styling.
- Zustand for state management.

### Installation
1. Clone the repository.
2. Navigate to the frontend directory.
3. Run `npm install` to install dependencies.

### Usage
- Use `npm run dev` to start the development server.
- Use `npm run build` to create a production build.

## Common

### Installation
- Root directory contains common dependencies and post-install scripts.
- Run `npm install` at the root to set up both frontend and backend.

### Scripts
- `postinstall`: Automatically set up the backend upon installing the root dependencies.

## The problem

If I had more time I would work on the styling and I would create a feature to change/edit a post. Probably I would add the possibility to save a post of someone else and display it under a collection. 

## View it live

Backend project deployed at: https://project-authorization-fullstack.onrender.com

Frontend project deployed at: https://fullstack-auth-project.netlify.app/
