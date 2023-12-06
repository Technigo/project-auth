import { FormControl, FormLabel, Input } from "@mui/joy";

export const LoginForm = () => {
  return (
    <>
      <FormControl id="email">
        <FormLabel required={true}>Email</FormLabel>
        <Input name="email" placeholder="example@gmail.com" className="p-2 mb-4" />
      </FormControl>
      <FormControl id="password">
        <FormLabel required={true}>Password</FormLabel>
        <Input name="password" placeholder="password..." className="p-2 mb-4" />
      </FormControl>
    </>
  );
};
