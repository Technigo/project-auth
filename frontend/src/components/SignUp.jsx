import React from 'react'
import { useState } from 'react'

export const SignUp = () => {
    const signupAPI = "http://localhost:8081"
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        try {
            const response = await fetch(`${signupAPI}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, userName: username, password }),
            })
            console.log(username, password, name)

            if (response.ok) {
                alert('Signup was successful, please log in!')
            } else {
                const data = await response.json()
                alert('Signup failed:', data.message)
            }
        } catch (error) {
            alert('Error during registration:', error)
        }
    }

    // SAMMA KOD SOM VI HADE TIDIGARE HÄRIFRÅN
    return (
        <>
            <div className="signup">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign Up</button>
            </div>
        </>
    )
}


//**** DETTA FUNGERADE MEN VI TESTAR ANNAT SÄTT */
// export const SignUp = () => {
//     const [name, setName] = useState("")
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const signupAPI = "http://localhost:8081"
//     const handleSignup = async (name, username, password) => {
//         if (!name || !username || !password) {
//             alert("Please enter name, username and password");
//             console.log(name, username, password)
//             return;

//         }

//         try {
//             const response = await fetch(`${signupAPI}/signup`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ name, username, password }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setUsername(username);
//                 // Redirect or update UI
//                 alert("Signup successful!");
//                 console.log("Signing up with:", username);
//             } else {
//                 // Display error message from server
//                 alert(data.response || "Signup failed");
//             }
//         } catch (error) {
//             console.error("Signup error:", error);
//             alert("An error occurred during signup");
//         }
//     }

//     const handleSignupClick = async () => {
//         if (!name || !username || !password) {
//             alert("Please enter name, username and password");
//             return;
//         }
//         try {
//             await handleSignup(name, username, password);
//             if (username && password) {
//                 alert("Signup successful!")
//                 // navigate("/"); // Replace with your desired path
//             }
//         } catch (error) {
//             // Handle any errors that occur during signup
//             console.error("Signup error:", error);
//             alert("An error occurred during signup");
//         }
//     };
// **** DET SOM FUNGERADE SLUTAR HÄR *** //

// console.log(username);
    // Text
    // const text = {
    //     heading: "SignUp Page",
    //     intro: "signup here...",
    //     loremIpsum:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",




