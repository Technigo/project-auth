// import { useState } from 'react';
// import './register-form.css'

// export const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form data submitted:', formData);
//   };

//   return (
//     <div className='form-container'>
//     <form onSubmit={handleSubmit} className="register-form">
//       <h1 className="register-header">Register</h1>
//       <div className="form-group">
//         <label htmlFor="name" className="label">
//           Name:
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleInput}
//           placeholder="Your name"
//           className="input"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="email" className="label">
//           Email:
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInput}
//           placeholder="Your email"
//           className="input"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="password" className="label">
//           Password:
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInput}
//           placeholder="xxxx"
//           className="input"
//         />
//       </div>
//       <div className="form-group">
//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </div>

//         <div className="form-group">
//           <p>Already have an account? Log in here</p>
//         </div>
//     </form>
//     </div>
//   );
// };




// //ChatGPT-code 

import { useState, useEffect } from 'react';

const API_URL = 'https://project-auth-w4ta.onrender.com'; // Replace with your actual backend URL

export const Register  = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [authenticatedContent, setAuthenticatedContent] = useState('');

  useEffect(() => {
    if (accessToken) {
      // Fetch authenticated content when the component mounts
      fetchAuthenticatedContent();
    }
  }, [accessToken]);

  const registerUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  const loginUser = async () => {
    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const fetchAuthenticatedContent = async () => {
    try {
      const response = await fetch(`${API_URL}/secrets`, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAuthenticatedContent(data.content);
      } else {
        // Handle error fetching authenticated content
        console.error('Error fetching authenticated content');
      }
    } catch (error) {
      console.error('Error during authenticated content fetch:', error);
    }
  };

  const signOut = () => {
    setAccessToken('');
    localStorage.removeItem('accessToken');
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Welcome, {username}!</p>
          <p>{authenticatedContent}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h2>Register</h2>
          <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
          type="text" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={registerUser}>Register</button>

          <h2>Login</h2>
          <input 
          type="text" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={loginUser}>Login</button>
        </div>
      )}
    </div>
  );
};

// export default App;



