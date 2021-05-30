<h1>🔐🔐 Project Auth 🔐🔐</h1>

Pair-programming project developed by Noemi Frischknecht and Estefanía Quevedo.

This project's goal was about buiding and **API with authentication** in order to implement a registration and login flow interface. 

## The problem

We learned how to authenticate users using tokens and how to store passwords in databases in a secure way. We also created a Frontend with a form to register, sign in and be able to see restricted content in case the login was successful.

We used MongodB and Mongoose to build our Backend Express API. This API has 3 endpoints: 

<ul>
  <li>A POST endpoint to create a new user</li>
  <li>A POST endpoint for the existing users to log in</li>
  <li>A GET restricted endpoint which is the home of the restricted site's content. It uses an authentication middleware, so it's only accessible with a valid access token.</li>
</ul>

The Frontend was built using a combination of React/Redux and local states in order to control the login/signup flow. 

## View it live

Frontend: https://project-auth-week20.netlify.app/

Backend: https://project-auth-week20.herokuapp.com/
