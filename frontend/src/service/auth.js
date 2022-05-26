import { backendURL } from "./url";

class AuthService {
  requestOptions;
  token;

  constructor() {
    this.requestOptions = {
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    };
  }

  async signup(username, password, email) {
    const body = JSON.stringify({
      username,
      password,
      email,
    });
    const reqOptions = { ...this.requestOptions, method: "POST", body };

    try {
      const res = await fetch(`${backendURL}/signup`, reqOptions);
      const data = await res.json();
      if (data.accessToken) {
        // set token
        this.token = data.accessToken;
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async login(username, password) {
    const body = JSON.stringify({
      username,
      password,
    });
    const reqOptions = { ...this.requestOptions, method: "POST", body };

    try {
      const res = await fetch(`${backendURL}/login`, reqOptions);
      const data = await res.json();
      if (data.accessToken) {
        // set token
        this.token = data.accessToken;
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async myPage() {
    this.requestOptions.headers["Authorization"] = this.token;
    const reqOptions = { ...this.requestOptions, method: "GET" };
    try {
      const res = await fetch(`${backendURL}/secret`, reqOptions);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  logout() {
    this.token = undefined;
  }
}

export default AuthService;
