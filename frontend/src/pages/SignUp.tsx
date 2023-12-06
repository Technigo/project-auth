import { FormControl, FormLabel, Input } from "@mui/joy";
import { ButtonSubmit } from "../components/ButtonSubmit";

export const SignUp = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-green-800">Saku TODO 🌸</h1>
      <div className="w-[300px] sm:w-[500px] mx-auto pt-10">
        <h2 className="text-2xl font-bold text-teal-900 text-center mb-4">Sign Up</h2>
        <form
          className="w-96 sm:w-full"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            alert(JSON.stringify(formJson));
            console.log(formJson);
          }}
        >
          <FormControl id="name">
            <FormLabel required={true}>Name</FormLabel>
            <Input name="name" placeholder="Harry Potter" className="p-2 mb-4 " />
          </FormControl>
          <FormControl id="email">
            <FormLabel required={true}>Email</FormLabel>
            <Input name="email" placeholder="harry@hogwarts.ed" className="p-2 mb-4" />
          </FormControl>
          <FormControl id="password">
            <FormLabel required={true}>Password</FormLabel>
            <Input name="password" placeholder="password..." className="p-2 mb-4" />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel required={true}>Confirm Password</FormLabel>
            <Input name="confirmPassword" placeholder="password..." className="p-2 mb-4" />
          </FormControl>
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Submit" icon={true} />
          </div>
        </form>
      </div>
    </div>
  );
};
