const AuthenticatedContent = ({ username, onSignOut }) => {
    return (
        <div className="authenticated-content">
            <h2>🎉 Congratulations, {username}! 🎉</h2>
            <p>You've successfully signed in!</p>
            <p>Your profile is currently under construction, but stay tuned for more exciting features coming your way!</p>
            <p>Meanwhile, sit back and relax😉.</p>
            <button onClick={onSignOut} className="button">Sign Out</button>
        </div>
    );
};

export default AuthenticatedContent;
