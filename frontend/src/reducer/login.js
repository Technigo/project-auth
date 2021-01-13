import { user } from './user';

export const loginFetch = (userName, password) => {
    return (dispatch) => {
        fetch(SIGNUP_URL, {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: {'Content-type': 'application/json'},
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              dispatch(user.actions.)
            })
    }
}