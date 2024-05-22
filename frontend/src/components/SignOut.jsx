export const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null); // Reset the user state to null
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};
