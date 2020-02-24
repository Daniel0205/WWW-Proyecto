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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Background from "./Images/login.jpg";
import Dashboard from "./Dashboard/Paperbase";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

export default function SignIn() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [disabledLogin, setdisabledLogin] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [RedirectToHome, setRedirectToHome] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function onSubmit(event) {
    event.preventDefault();
    setOpen(true);
    if (user === "jem" || password === "jem") {
      setTimeout(() => setRedirectToHome(true), 2000);
    }
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
                value={user}
                onChange={event => setUser(event.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert severity="success" variant="filled" onClose={handleClose}>
                {"     "}
                Succesfuly logged!{"     "}
              </Alert>
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
