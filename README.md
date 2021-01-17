# Project Auth

This is a full stack project in which the user can sign up and login to retrieve a special message for that specific user. The backend is built with Node.js and mongoose.
The signup and login endpoints are endpoints in which the user posts information that's stored in the database. The frontend is built with React and Redux, with styling done using Styled components. There are input fields in which the user can type her/his name and password which is sent to the backend with the press of a button. When the user signs up the user will retrieve an accesstoken which is randomized and works as a key to determine weather the user is authorized or not to get to the next page. The accesstoken gets updated for every time the user logs in, this for security measures. 

## Challenges

One of the challenges during the project was to make sure the name and password was validated correctly. We made sure it worked using Postman and by doing console.log. 

## Tech

- React
- Redux
- Javascript
- Node.js
- Mongoose
- MongoDB
- Postman

## View it live

- Frontend: https://modest-hamilton-9de3b4.netlify.app/

- Backend: https://project-auth-joel-cornelia.herokuapp.com/

This is a pair programming project made by Cornelia Ryås and Joel Harde
