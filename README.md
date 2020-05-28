# Project Auth

This week's assignment was to build an API with authentication to implement a registration flow. And create a frontend with forms to register, sign in, and view some content once you're logged in.

## The problem

I started by creating one piece of the registration at a time. First I got the registration to work, then the log in and the last piece was to get the authentication to work properly. The issues I had this week was to get all the error codes to work properly, when creating a duplicate the error codes were the same for both the email and the username. I solved it by adding a const in which I search for the incoming email and name and if there is one already registered I threw a custom error code to separate between the two.

Another, but smaller issue was that one could create a user named Malin and malin because the search in the database was for an exact match. By adding an collation to ignore case and diacritics, to both the authentication and the registration, I solved this issue. 

## View it live

https://malins-login-site.netlify.app
