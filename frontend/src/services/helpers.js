export const registerUser = async (options) => {
    const fetch = await fetch("https://project-auth-asm.herokuapp.com/register", options);
    const response = await fetch;
    console.log(response);
    return response;
}

export const userLogin = async (options) => {
    const fetch = await fetch("https://project-auth-asm.herokuapp.com/login", options);
    const response = await fetch;
    console.log(response)
    return response
}