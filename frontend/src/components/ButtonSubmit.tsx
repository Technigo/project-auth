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
      endDecorator={icon ? <ArrowForwardIosIcon /> : ""}
      sx={{
        marginTop: "20px",
        border: "#3f6212 solid 1px",
        fontWeight: 800,
        fontSize: 20,
      }}
    >
      {text}
    </Button>
  );
};
