const BASE_URL = 'https://week20-project-auth-frisk.herokuapp.com'

export const SIGNIN = 'sessions'

export const SIGNUP = 'signup'

export const EDIT_USER = (id) => `https://week20-project-auth-frisk.herokuapp.com/sessions/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`
