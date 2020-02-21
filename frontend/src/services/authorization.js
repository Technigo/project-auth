export const checkAuth = accessToken => {
  fetch("http://localhost:8080/secrets", {
    method: "GET",
    headers: { Authorization: accessToken }
  }).then(res => {
    if (!res.ok) {
      console.log("forbidden");
    }
    return res.json();
  });
};

export const registerUser = (name, email, password) => {
  return fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(res => res.json())
    .then(res => {
      if (!res.accessToken) {
        return {
          success: false,
          message: res.message
        };
      }
      return {
        success: true
      };
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
      return res.json();
    })
    .then(res => {
      if (!res.accessToken) {
        return {
          success: false,
          message: res.message
        };
      }
      window.localStorage.setItem("accessToken", res.accessToken);
      return {
        success: true
      };
    })
    .catch(err => {
      console.log(err);
    });
};
