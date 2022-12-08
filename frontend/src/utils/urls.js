const BASE_URL = "https://project-auth-2ucjrblcba-lz.a.run.app"

// more proper way to do it, lättare att använda i andra filer: 
export const API_URL = (slug) => `${BASE_URL}/${slug}`;