const BASE_URL = 'http://localhost:8080'

export const SIGNIN = 'sessions'

export const SIGNUP = 'signup'

export const THOUGHTS = 'thoughts'

export const EDIT_USER = (id) => `http://localhost:8080/sessions/${id}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`
