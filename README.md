# Project Auth API

This is a fullstack app that handles passwords and authenticates users. The backend consist of an API with authentication, Schemas, models and endpoints. 
Frontend:

## The problem

This is a pair-programming porject, so we started with making a plan for how we should structure the project, and also desided to work with branches because our scheduels. 
For the backend we started with installing the dependencies: crypto, bcrypt, dotenv, mongoose (npm install). We then built the backend with mongoose Schema and model, one for the user to create a log-in and for when the user is loged-in. We then created endpoints to store the created users in the databasa, and check that the user is uniqe. For securety each user gets an uniqe token, so the password can be saved and that is checked when the user wants to log in. If the user is authenticated, the user get access to more endpoints.

For the frontend we used react-redux. 
We wanted to display content from the database, but was not able to, and that is someting we would like to do if we had more time.

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

## View it live
backend: https://project-auth-2ucjrblcba-lz.a.run.app
fontend: https://zippy-choux-9cb649.netlify.app/
Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.
