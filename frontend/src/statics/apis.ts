const BASE_URL = "http://localhost:8080/";

export const CREATE_USER_API = `${BASE_URL}api/v1/user/signup`;
export const UPDATE_USER_API = (id: string) => `${BASE_URL}api/v1/user/${id}`;
export const GET_ALL_USERS_API = `${BASE_URL}api/v1/user`;
export const LOGIN_USER_API = `${BASE_URL}api/v1/user/login`;
export const DELETE_USER_API = (id: string) => `${BASE_URL}api/v1/user/delete/${id}`;
