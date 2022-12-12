// const BASE_URL = "https://project-auth-pvgq4cny7a-lz.a.run.app";

const BASE_URL = "http://localhost:8080";

// Slug is a suffix of the request and it comes after base url request/
// Slug is sort of the end point of the reuest
export const API_URL = (slug) => `${BASE_URL}/${slug}`;
