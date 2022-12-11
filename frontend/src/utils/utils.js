
//This url make it works from mobile
//const BASE_URL = "http://localhost:8090";
const BASE_URL = "https://project-auth-lsdubteuzq-lz.a.run.app";

export const API_URL = (slug) => `${BASE_URL}/${slug}`;



//const THOUGHTS_URL = "https://project-auth-lsdubteuzq-lz.a.run.app/"; 
const THOUGHTS_URL = "https://project-happy-thoughts-api-lsdubteuzq-lz.a.run.app/"; 

export const HAPPY_API_URL = (slug) => `${THOUGHTS_URL}/${slug}`;