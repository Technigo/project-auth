# Project Auth
A pair programming project during Technigo bootcamp. We built an API with authentication to create a registration flow, and connected it to a frontend with a form to register, sign up/in to a landing page where the user can post new thoughts.

Set-up for backend: Express API with a MongoDB stored in Atlas and deployed to Heroku. 
## Endpoints
The API has the following endpoints 

| METHOD | Path                                      | Description                                                                            |
| :------|------------------------------------------ | --------------------------------------------------------------------------------------:|
| | https://caro-lars-auth-backend.herokuapp.com/ | Contains a list of available routes                                     |
| GET    | /thoughts                                 | Endpoint that returns all thoughts, sorted by createdAt to show the most recent thoughts first. |
| POST | /thoughts                                   | POST a new thought                                                                     |
| POST | /signup                        | signup                                         |
| POST | /signin                             | signin                                                                      |


## TECH
- React
- Redux
- MongoDB
- Mongoose
- Node
- Express
- JavaScript
- Heroku
- MongoDB Atlas & Compass

## Reflections
This week was useful for the coming project and a refreshing dive into connecting frontend and backend. We implemented localStorage and email validation and if we had more time we would create an admin authentication that would be authorized to delete, or modify a message.

## View it live
Coders: Lars Söderman & Caroline Byström. 
Backend at Heroku: https://caro-lars-auth-backend.herokuapp.com/
Frontend at Netlify: https://heuristic-perlman-acbbe2.netlify.app/login
