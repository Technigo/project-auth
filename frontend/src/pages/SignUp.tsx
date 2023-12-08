import { FormControl, FormLabel, Input, LinearProgress, Typography } from "@mui/joy";
import { ButtonSubmit } from "../components/ButtonSubmit";
import { checkFormIsValid } from "../actions/action";
import { FormEvent, useState } from "react";
import { createUser } from "../sevices/apis";
import { FormError } from "../types/formType";
import { useNavigate } from "react-router-dom";
import { Key } from "@mui/icons-material";
import { useAtom } from "jotai";
import { userState } from "../atoms/userAtom";

const initialState = {
  name: { error: false, message: "" },
  email: { error: false, message: "" },
  password: { error: false, message: "" },
  passwordConfirm: { error: false, message: "" },
};

const initialDBerror = {
  status: false,
  message: "",
};

const minLength = 12;

export const SignUp = () => {
  const [formError, setFormError] = useState<FormError>(initialState);
  const [dbError, setDbError] = useState(initialDBerror);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [currentUser, setCurrentUser] = useAtom(userState);

  const hanldleSubmit = async (e: FormEvent<HTMLFormElement> | undefined) => {
    const result = checkFormIsValid(e);
    setDbError(initialDBerror);
    let userObj;
    if (!result.success) {
      result.error.issues.map((issue, index) => {
        const key = issue.path[0];
        Object.hasOwn(formError, key)
          ? setFormError((prev) => ({ [key]: { error: true, message: issue.message }, ...prev }))
          : "";
      });
    } else {
      const data = result;
      userObj = {
        name: data.data.name,
        email: data.data.email,
        password: data.data.passwords.password,
        passwordConfirm: data.data.passwords.passwordConfirm,
      };
    }
    let res;
    if (userObj) res = await createUser(userObj);

    if (!res.status) {
      setDbError({ status: true, message: res.message });
    } else if (userObj) {
      setCurrentUser({ name: userObj.name, accessToken: res.accessToken, login: true });
      navigate("/home");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-green-800">Saku TODO 🌸</h1>
      <div className="w-[300px] sm:w-[500px] mx-auto pt-10">
        <h2 className="text-2xl font-bold text-teal-900 text-center mb-4">Sign Up</h2>
        <form className="w-96 sm:w-full" onSubmit={hanldleSubmit}>
          <FormControl id="name" error={formError.name.error}>
            <FormLabel required={true}>Name</FormLabel>
            <Input name="name" placeholder="Harry Potter" className="p-2 mb-4 " />
          </FormControl>
          <FormControl id="email" error={formError.email.error}>
            <FormLabel required={true}>Email</FormLabel>
            <Input name="email" placeholder="harry@hogwarts.ed" className="p-2 mb-4" />
          </FormControl>
          <FormControl id="password" error={formError.password.error}>
            <FormLabel required={true}>Password</FormLabel>
            <Input
              name="password"
              type="password"
              startDecorator={<Key />}
              placeholder="password..."
              className="p-2 mb-4"
              onChange={(event) => setValue(event.target.value)}
            />
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((value.length * 100) / minLength, 100)}
              sx={{
                bgcolor: "background.level3",
                color: "#4d7c0f",
              }}
            />
            <Typography level="body-xs" sx={{ alignSelf: "flex-end", color: "#052e16" }}>
              {value.length < 3 && "Very weak"}
              {value.length >= 3 && value.length < 6 && "Weak"}
              {value.length >= 6 && value.length < 10 && "Strong"}
              {value.length >= 10 && "Very strong"}
            </Typography>
          </FormControl>
          <FormControl id="passwordConfirm" error={formError.passwordConfirm.error}>
            <FormLabel required={true}>Confirm Password</FormLabel>
            <Input
              name="passwordConfirm"
              placeholder="password..."
              className="p-2 mb-4"
              type="password"
              startDecorator={<Key />}
            />
          </FormControl>
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Submit" icon={true} />
          </div>
          {dbError && <p className="text-red-700 text-base">{dbError.message}</p>}
        </form>
      </div>
    </div>
  );
};
