const BASE_URL = "https://project-auth-pde-el.herokuapp.com"
// const BASE_URL = "http://localhost:8080"

// slug approach
// slug will be the argument that we call API_URL
export const API_URL = (slug) => `${BASE_URL}/${slug}`

//fetch (API_URL ('signup')) --> slug directs the api with /signup endpoint
