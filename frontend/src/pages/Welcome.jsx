export const Welcome = () => {

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Please sign in to see the content 🧡</h2>
            <form >
                <label htmlFor="email">Username</label>
                <input type="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </>
    )
}
