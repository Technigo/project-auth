import { Button } from "./Button";
import { Headline } from "./Headline";

export const Register = () => {
  return (
    <form>
      <div className="title-box">
        <Headline titleText={"Register"} />
        <div className="text-box">
          <p>Love to read and want to meet fellow book enthusiasts?</p>
          <p>
            {" "}
            Register now for our OMC Book Club and dive into lively discussions, discover new genres, and share your
            favorite reads!
          </p>
          <p>We can't wait to welcome you and embark on literary adventures together!</p>
        </div>
      </div>
      <label>
        First name
        <input type="text" name="first-name" placeholder="Type your first name" required />
      </label>

      <label>
        Last name
        <input type="text" name="last-name" placeholder="Type your last name" required />
      </label>

      <label>
        E-mail
        <input type="email" name="email" placeholder="Type your e-mail" required />
      </label>

      <fieldset>
        <legend>Address</legend>

        <label>
          Street
          <input type="text" name="street" placeholder="Type your street" required />
        </label>

        <div className="address-tablet-desktop">
          <div className="postcode-box">
            <label>
              Post code
              <input type="text" name="post-code" placeholder="xxx xx" required />
            </label>
          </div>

          <div className="city-box">
            <label>
              City
              <input type="text" name="city" placeholder="Type your city" required />
            </label>
          </div>
        </div>
      </fieldset>

      <label>
        Username
        <input type="text" name="username" placeholder="Type your username" required />
      </label>

      <label>
        Password
        <input type="password" name="username" placeholder="Type your username" required />
      </label>

      <div className="button-box">
        <Button btnText={"Sign up"} />
      </div>
    </form>
  );
};
