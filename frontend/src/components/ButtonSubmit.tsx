import { Button } from "@mui/joy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  text: string;
  icon?: boolean;
};

export const ButtonSubmit = ({ text, icon }: Props) => {
  return (
    <Button
      color="success"
      variant="outlined"
      type="submit"
      endDecorator={icon ? <ArrowForwardIosIcon /> : ""}
      sx={{
        marginTop: "20px",
        border: "#3f6212 solid 1px",
        fontWeight: 800,
        fontSize: 20,
        padding: "4px 16px",
        transition: "all .3s ease",
        "&:hover": {
          background: "orange",
        },
      }}
    >
      {text}
    </Button>
  );
};
