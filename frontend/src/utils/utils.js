
//This url make it works from mobile
const BASE_URL = "https://project-auth-lsdubteuzq-lz.a.run.app";

//const BASE_URL = "http://localhost:8090";
export const API_URL = (slug) => `${BASE_URL}/${slug}`;




const THOUGHTS_URL = "https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/"; // post dont work

//const THOUGHTS_URL = "https://project-auth-lsdubteuzq-lz.a.run.app/"; // everything works in desktop, but got error anyway
export const HAPPY_API_URL = (slug) => `${THOUGHTS_URL}/${slug}`;