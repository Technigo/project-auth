import { RegistrationForm } from "../components/RegistrationForm";
import { LogInForm } from "../components/LogInForm";

export const SignLogInPage = () => {
  return (
    <main>
      <h2>Welcome!</h2>
      <section>
        <RegistrationForm />
        <LogInForm />
      </section>
    </main>
  );
};
