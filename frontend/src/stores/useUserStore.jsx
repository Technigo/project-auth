import { create } from "zustand";

// Gets the url to the API from the env file
const API_URL = import.meta.env.VITE_BACKEND_API;
// Saves the endpoint in a variable for easy access
const withEndpoint = (endpoint) => `${API_URL}/${endpoint}`;

// Creates a store for the user handling
export const useUserStore = create((set, get) => ({

  // Saves some state variables in the store with default values
  email:"",
  username: "",
  password: "",
  token: null,
  isLoggedIn: false,

  // Sets the values of the state variables to the values being passed in
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setEmail:(email) => set({email}),
  setAccessToken: (token) => set({ token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn: isLoggedIn }),

  // Creates a function for registering a user
  registerUser: async (username, password, email) => {
    // Checks if the username or password is empty, and if so, alerts the user and returns
    if (!username || !password || !email ) {
      alert("Please enter both username, password and email");
      return;
    }

    try {
      const response = await fetch(withEndpoint("register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });


      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      // If the response is ok, saves the response as a variable called data
      const data = await response.json();
      const successfullFetch = data.success;

      // In case of a successfull fetch, sets the state variables to the values from the response
      if (successfullFetch) {
        set({
          username
        })
      }

      // Alerts to the user that the username has been registered
      alert(successfullFetch ? `The user ${data.response.username} has been created` : `The username ${data.response.username} couldn't be registered`);

      set({
        password: "" // Sets the password to empty, indicating to the user that they can now try logging in
      })

      set({
        email: "" // Sets the password to empty, indicating to the user that they can now try logging in
      })

    } catch (error) {
      // If the error message is 400, the username already exists, so an alert is shown and the fields are emptied
      if (error.message == 400) {
        alert("Username already exists, please choose another one");
        set({
          username: "",
          password: "",
          email: ""
        })
      }
      console.error("There was an error =>", error);
    }
  },

  // // LOGIN
  // loginUser: async (username, password) => {
  //   if (!username || !password) {
  //     alert("Please enter both username and password");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(withEndpoint("signin"), {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

      

  //     const data = await response.json();
  //     console.log("Server response:", data);
      
  //     if (data.success) {
  //       set({
  //         username,
  //         token: data.response.token,
  //         isLoggedIn: true,
  //       }); // Update the state with username and accessToken
  //       // Redirect or update UI
  //       localStorage.setItem("token", data.response.token);
  //       alert("Login successful!");
  //       console.log("Loging up with:", username, password);
  //     } else {
  //       // Display error message from server
  //       alert(data.response || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("An error occurred during login");
  //   }
  // },


 loginUser: async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch(withEndpoint("signin"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          set({
            username,
            token: data.token,
            isLoggedIn: true,
          });
          localStorage.setItem("token", data.token);
          alert("Login successful!");
        } else {
          alert("Login failed. Invalid username or password.");
        }
      } else {
        console.error("Login error:", response.status);
        alert("An error occurred during login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  },



  

  fetchLoggedInData: async () => {
    try {
      const token = get().token
      const response = await fetch(withEndpoint("protected"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        set({ loggedInData: data.response })
        console.log("Data from /logged-in", data);
      } else {
        console.error(data.response || "Failed to fetch /logged-in")
      }
    } catch (error) {
      console.error("Error fetching /logged-in:", error)

    }
  },



  logoutUser: () => {
    // Removes the accessToken from the store and sets isLoggedIn to false. Also empties the username and password fields
    set({
      username: "",
      password: "",
      token: null,
      isLoggedIn: false
    });
    // Removes the accessToken from localStorage
    localStorage.removeItem("token");
  },
}));