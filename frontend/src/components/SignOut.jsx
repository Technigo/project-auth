export const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUser(null); // Reset the user state to null
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
