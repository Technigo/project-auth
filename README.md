# Project Auth

This project was built by Yennie Leek and Sandra Wallén as part of the Technigo bootcamp. The main task was to build an application where a user can sign up/log in and see some "secret" content if they are loged in.

## The problem

We started with setting up the endpoints and requests in backend, one POST to sign up as a user, another to log in as an existing user, a PATCH to add additional information to the user account when they are logged in and one POST and one GET to post and get thoughts. We have only implemented functionality for getting the thoughts in frontend, as it is now posts can only be made from postman or other similar service.

We have a problem in the sign up functionality, if the sign up wasn't successful for any reason the system continues reading and sending "success: true" even though it wasn't, the expected result would be that the system exits and catches the error, but it doesn't.

There is alot of functionality and tweeks that we would have wanted to implement to this project but we didn't have much time to work on this project unfortunately.

### If we had more time we would have
- Shown in the profile page if the user had previously added the additional account information
- Added functionality to post a thought in the feed
- Improved all styling
- Handled error messages user friendly in the frontend.

## View it live

View frontend live at https://cranky-brown-a574ee.netlify.app/
View backend live at https://sandra-project-authentication.herokuapp.com/
