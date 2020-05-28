# Project Auth

This week we built a log in/ sign up form using our own authentication API as a pair programming project for Technigo bootcamp.

## The problem

We had problem with redirecting to different pages. This was solved by using history.push('') with useEffect(). We used reusable styled components for every page. We also had problems with error messages persisting when the page is redirected to different route. This was solved by dispatching the reducer to change the error message to null, also with useEffect().
If we had more time, we would have added more information on the profile page or making several page when the user is logged in.

## View it live

Frontend: https://modest-bell-37cf0d.netlify.app/
Backend: https://authentication-jj.herokuapp.com/
