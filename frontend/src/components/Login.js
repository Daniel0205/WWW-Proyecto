import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Background from "./Images/login.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../components/SnackbarMesssages";
import axios from "axios";
import qs from "qs";
import { connect } from "react-redux";
import { setCredentials } from "./store/login/action";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.blankwebsite.com/">
        Antimateria
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [disabledLogin, setdisabledLogin] = useState(true);
  const [RedirectToHome, setRedirectToHome] = React.useState(false);
  const [messaje, setMessaje] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function fetchData(id_user) {
    const response = await axios.get("http://localhost:8000/api/user/" + id_user);
    let data = response.data;
    props.setCredentials({ ...data });
  }

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:8000/rest-auth/login/",
        qs.stringify({
          username: userID,
          password: password
        })
      )
      .then(response => {
        console.log(response)
        if (response.data) {

          let token = response.data.key;
          props.setCredentials({ token });
          fetchData(userID);

          setType("success");
          setMessaje("Succesfuly logged!");
          setOpen(true);
          setTimeout(() => setRedirectToHome(true), 2000);
        }
      })
      .catch(error => {
        setType("error");
        setMessaje("User id not found!");
        setOpen(true);
      });
  }

  function CaptchaPassed() {
    console.log("Captcha passed!");
    setdisabledLogin(false);
  }

  if (RedirectToHome) {
    return <Redirect to="/" />;
  } else {
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                value={userID}
                onChange={event => setUserID(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="id"
                label="User ID"
                name="id"
                autoComplete="id"
                autoFocus
              />
              <TextField
                value={password}
                onChange={event => setPassword(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <br />
              <br />
              <ReCAPTCHA
                align="center"
                sitekey="6LcTTdQUAAAAAO4tccHs-veRpt1qFHe8vvKaNpZS"
                onChange={CaptchaPassed}
              />
              <Button
                disabled={disabledLogin}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              onClose={handleClose}
              open={open}
              autoHideDuration={3000}
            >
              <SnackbarMesssages
                variant={type}
                onClose={handleClose}
                message={messaje}
              />
            </Snackbar>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
          <br />
          <br />
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCredentials: credentials => dispatch(setCredentials(credentials))
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
