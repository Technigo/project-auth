export const checkAuth = accessToken => {
  fetch("http://localhost:8080/secrets", {
    method: "GET",
    headers: { Authorization: accessToken }
  }).then(res => {
    if (!res.ok) {
      // !TODO: Handle status 401 and show error message.
    }
    return res.json();
  });
};

export const loginUser = (email, password) => {
  return fetch("http://localhost:8080/sessions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => {
      console.log("res", res);
      debugger;
      return res.json();
    })
    .then(({ accessToken }) => {
      console.log(accessToken);
      debugger;
      if (!accessToken) {
        return {
          success: false,
          text: "Your e-mail and/or password was incorrect"
        };
      }

      debugger;
      window.localStorage.setItem("accessToken", accessToken);
      return {
        success: true
      };
    })
    .catch(err => {
      console.log(err);
    });
};
