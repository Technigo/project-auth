import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Container,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";

const font = "'PT Sans', sans-serif";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#FAACA8",
    backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"
  },
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontFamily: font
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontFamily: font
  },
  container: {
    // marginTop: "50px"
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  header: {
    fontFamily: font,
    fontWeight: "bold",
    fontSize: "38px",
    color: "#4B0082",
    marginTop: "100px"
  },
  paragraph: {
    fontFamily: font,
    fontWeight: "bold",
    fontSize: "24px",
    color: "#4B0082",
    marginBottom: "40px",
    paddingLeft: "5px"
  },
  button: {
    marginTop: "10px"
  }
}));

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <div className={classes.wrapper}>
          <Typography className={classes.header}>Are you feeling blue..? </Typography>
          <Typography className={classes.paragraph}>
            Here are some secret questions to answer that could hopefully help you feeling a bit
            better{" "}
          </Typography>
        </div>
        <div className={classes.root}>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header">
              <Typography className={classes.heading}>Question 1 </Typography>
              <Typography className={classes.secondaryHeading}>How do I Feel right now</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                What do you feel at the moment. Are you feeling, happy angry, sad, anxious😣?
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header">
              <Typography className={classes.heading}>Question 2 </Typography>
              <Typography className={classes.secondaryHeading}>
                What do I think makes me feel like this?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Maybe you are working too much? You are not sleeping well or someone makes you feel
                bad😢
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header">
              <Typography className={classes.heading}>Question 3</Typography>
              <Typography className={classes.secondaryHeading}>How do I want to feel?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Maybe you want to feel more peaceful, at ease and happy with your self❤️
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header">
              <Typography className={classes.heading}>Question 4</Typography>
              <Typography className={classes.secondaryHeading}>
                What can I do to make me feel like this?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Maybe you need to prioritise your own health and tell yourself only nice things🙏
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            onClick={() => dispatch(user.actions.logout())}>
            Log out
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Main;
