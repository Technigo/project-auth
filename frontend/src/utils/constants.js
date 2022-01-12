// export const API_URL = "https://admj-authentication.herokuapp.com/";
// export const SIGNIN_URL = "https://admj-authentication.herokuapp.com/signin";
// export const SIGNUP_URL = "https://admj-authentication.herokuapp.com/signup";

const BASE_URL = "http://localhost:8080";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;
