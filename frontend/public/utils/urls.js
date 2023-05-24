const BASE_URL = "http://localhost:8080";

// The `API_URL` function takes a `slug` parameter and returns the URL by appending the `slug` to the `BASE_URL`.
// It provides a convenient way to generate API URLs with the appropriate endpoint paths.
export const API_URL = (slug) => `${BASE_URL}/${slug}`;

//The API_URL function takes a slug parameter and uses template literals to concatenate the slug with the BASE_URL.
// This function returns the complete URL that can be used to make API requests to the specified endpoint by appending the slug to the base URL.

// By using the API_URL function, you can easily generate the appropriate API URL by providing the desired endpoint's slug as an argument.
