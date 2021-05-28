# Project Auth

We have built a fullstack project. A backend with an API with authentication and using MongoDB to store the users and message data. A frontend to register, sign in, post message, view last message sent by previous user and fetch jokes from an external API.

## Features

- Endpoints:
  - path: "/" - lists all endpoints
  - path: "/joke" - Only reachable for authenticated users.
  - path: "/usermessage" - GET and POST requests. GET latest message sent by previous user (We've sorted by latest created and limited to 1) and POST a message to next user. Only reachable for authenticated users.
  - path: "/signup" - POST request to sign up.
  - path: "/signin" - POST request to sign in.

We have created two mongoose models, one for Users and one for User Messages. The User model contains of name, username, email, password and accesstoken. We have added validation and different error messages that we retrieve in the frontend to display to user. Examples are "Email is invalid", "Username already taken", "Your Username / Password is wrong" etc.

The website is responsive and have different layout and design depending on screen size. It also displays specific error messages on both sign in and sign up pages depending on occurring error. We also added the possibility to view or hide your password in the input field. 
After logging in you can see the message sent by previous user and send one to next user. You can also move on to the joke page where we fetch jokes from an external API. 
Sign Out button was added and a loading component that appears while processing the POST request. 

We didn't have many problems. The few ones we had we sorted out quite quickly by just trying things out.

## View it live

* Backend: https://jokeio.herokuapp.com/
* Frontend: https://jokeio.netlify.app/

## Project made by

* Jessika Hage (https://github.com/jessika-hage)
* Laima Duhovnaja (https://github.com/leelalaim)
