class AuthService {
  constructor() {}
  async signup(username, password, email) {
    return new Promise((resolve, reject) => {
      console.log("signup called");
    });
  }

  async login(username, password) {
    return new Promise((resolve, reject) => {
      console.log("signup called");
    });
  }

  logout() {
    console.log("log out!");
  }
}

export default AuthService;
