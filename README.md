# Project Auth - Overview
Week 20 pair-programming project for Technigo 24 week bootcamp. 

This project ties together all the skills we learned so far to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once logged in.


Learning objectives:
- How to build a registration flow
- How to handle authentication, both in the frontend and in the backend
- How to build a frontend and backend at the same time

<!-- ## Approach -->
<!-- Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next? -->

<!-- ## Core Tech -->


## Completed Requirements
🔵  Blue Level
- The API should have routes to register and login, and finally an authenticated endpoint.
- The authenticated endpoint should return a 401 or 403 (see [401 vs. 403 on SO](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)) with an error message if you try to access it without an `Authentication` access token or with an invalid token.
<!-- - The frontend should have a registration form which POSTs to the API to create a new user -->
- Passwords in the database should be encrypted with bcrypt
- The API should validate the user input when creating a new user, and return error messages which could be shown by the frontend (displaying the errors in a nice way in the frontend is a stretch goal - its fine to just show 'Something went wrong' on the frontend if you run out of time)
<!-- - The API should be deployed to Heroku or similar hosting service. -->
<!-- - The database should be deployed using mongo cloud or similar. -->
<!-- - The frontend to should be deployed to Netlify or similar. -->


<!-- 🔴  Red Level (Intermediary Goals) -->
<!-- ***Remember**:* For any new feature you add to the backend, be mindful of how that will require the frontend to change, and vice-versa.   -->
<!-- - Store data in the database for authenticated data routes. -->
<!-- - When registering, display error messages from the API next to the field which has the error. For example, if the email address is invalid, show an error message next to the email input. -->


⚫ Black Level (Advanced Goals)
<!-- - Add more routes, perhaps even a `POST` route to create new objects in the database as a logged-in user. -->
- Improve validations in the backend to ensure unique email addresses, <!--  or validate the email address format using a regular expression. -->



<!-- ## View it live -->
