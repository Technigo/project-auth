const BASE_URL = process.env.BASE_URL || "https://project-auth-vfuupab45q-uc.a.run.app"

console.log('Using BASE_URL ', BASE_URL)
export const API_URL = (slug) => `${BASE_URL}/${slug}`