import React from 'react'


export const SignUp = () => {
    const signupAPI = "https://localhost:8081"
    const handleSignup = async (name, username, password) => {
        if (!name || !username || !password) {
            alert("Please enter name, username and password");
            return;
        }

        try {
            const response = await fetch(`${signupAPI}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, username, password }),
            });

            const data = await response.json();
            if (data.success) {
                // set({ username });
                // Redirect or update UI
                alert("Signup successful!");
                console.log("Signing up with:", username);
            } else {
                // Display error message from server
                alert(data.response || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup");
        }
    }

    return (
        <>
            <div className="signup">
                <input
                    type="text"
                    placeholder="Name"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign Up</button>
            </div>

        </>
    )
}
