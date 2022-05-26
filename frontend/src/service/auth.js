class AuthService {
  requestOptions;
  token;

  constructor(url) {
    this.url = url;
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
      const res = await fetch(`${this.url}/signup`, reqOptions);
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
      const res = await fetch(`${this.url}/login`, reqOptions);
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
      const res = await fetch(`${this.url}/secret`, reqOptions);
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
