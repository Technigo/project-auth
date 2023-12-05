import "@fontsource/inter";
import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const App = () => {
  return (
    <div className="bg-gradient-to-r from-amber-200 to-yellow-500 min-h-screen">
      <div className="max-w-[600px] mx-auto pt-20">
        <h2 className="text-4xl font-bold text-teal-900 text-center mb-6">Sign in</h2>
        <form className="w-96 sm:w-full">
          <FormControl id="name">
            <FormLabel required={true}>Name</FormLabel>
            <Input name="name" placeholder="Tom Tayler" className="p-2 mb-4 " />
          </FormControl>
          <FormControl id="email">
            <FormLabel required={true}>Email</FormLabel>
            <Input name="email" placeholder="example@gmail.com" className="p-2 mb-4" />
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
            <Button
              endDecorator={<ArrowForwardIosIcon />}
              color="success"
              variant="outlined"
              sx={{
                marginTop: "20px",
                border: "#3f6212 solid 1px",
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              Go to checkout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
