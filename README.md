# Auth API

**Mission:** 

*For this week's project, you're going to tie all the skills you've learnt so far to build an API with authentication to implement a registration flow, and a frontend with forms to register, sign in, and view some content once you're logged in.*

**Requirements:**
- 🔵 COMPLETE (all)
- 🔴 COMPLETE (all)
- ⚫ NONE


***

## Installation

Navigate to the project folder and run the following command

```
$ cd code 
$ npm install
```

**To start the project**

```
$ cd code 
$ npm start
```
<br>

## ✅ Features ✅
***

*The following are the main features of this application:*
  * The API has the following endpoints:
    * `/login`
      * Method: POST
        * Body => `email`(required),`password`(required)
        * returns the created user and the jwt token 
    * `/signup`
      * Method: POST
        * Body => `name`(required),`email`(required),`password`(required)
        * returns the created user and the jwt
    * `/secret`
      * Method: GET
        * returns a secret message that is only accessible if user is authenticated

The frontend:
  *  The user can login
  *  The user can signup and gets redirected to homepage
  *  The homepage shows the user info and the secret message
  *  From the homepage the user can logout
  *  Error messages are displayed using a toasts.


<br>

## 💭 Reflections 💭
***
This project was a bit of a race to complete. I was sick throughout the production so couldn't really do all I wanted. But nevertheless I managed to explore some new concepts like: JWT tokens and `createAsyncThunk`. 
I feel like I learned a lot in this project, and will most likely bring some of this code with me to my final project.

<br>

Issues that came up:
- Just lack of time and energy due to illness


If I were to continue on this project / start over I would:
- Look into persiting the token using Http only cookies. I will probably do this in my final project using Auth0. 

<br>

***

## View it live

Backend: https://auth-api-prj20.herokuapp.com/

Frontend: https://objective-babbage-f9468e.netlify.app/ 