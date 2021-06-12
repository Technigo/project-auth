const BASE_URL = 'https://sandra-project-authentication.herokuapp.com/'

export const SIGNIN = 'sessions'

export const SIGNUP = 'signup'

export const THOUGHTS = 'thoughts'

export const EDIT_USER = (id) => `https://sandra-project-authentication.herokuapp.com/sessions/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`
