


const Form = () => {
  return (
    <div>
      <form>
        <h1>Welcome to GreenBuddy</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="John Doe"></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"></input>
        </div>
        
        <div className="sign-up">
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email"></input>
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Form;