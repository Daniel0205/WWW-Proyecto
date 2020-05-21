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
import Recaptcha from "react-recaptcha";
import Paper from "@material-ui/core/Paper";
import Background from "./Images/login.jpg";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../components/SnackbarMesssages";
import axios from "axios";
import { connect } from "react-redux";
import { setCredentials } from "./store/login/action";
import { Redirect } from "react-router-dom";
import '../services/localizationService';
import InitialHeader from './InitialHeader';

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

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  let val = value +1
  return () => setValue(val); // update the state to force render
}


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

  // specifying verify callback function
  var verifyCallback = function (response) {
    if(response){
      setdisabledLogin(false);
    }
  };

  function onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/login/", {
        id_user: userID,
        password: password
      })
      .then(response => {

        if (response.data) {
          if (response.data.code === 200) {
            props.setCredentials(response.data.data); //stored in the redux state
            storeCredentialsInBroser(response.data.data); //store data in the browser
            setType("success");
          } else setType("error");
          setMessaje(response.data.message);
          setOpen(true);

          if (response.data.code === 200)
            setTimeout(() => setRedirectToHome(true), 1000);
        }
      })
      .catch(error => {
        setType("error");
        setMessaje("Server is not working");
        setOpen(true);
      });
  }

  function storeCredentialsInBroser(credentials) {
    sessionStorage.setItem("id_user", credentials.id_user);
    sessionStorage.setItem("name", credentials.name);
    sessionStorage.setItem("token", credentials.token);
    sessionStorage.setItem("type", credentials.type);
  }

  const forceUpdate = useForceUpdate();


  let changeLanguage = (e) => {

    window.changeLanguage(e.target.value);
    
    forceUpdate()
}

  if (RedirectToHome) {
    return <Redirect from="/login" to="/dashboard" />
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <InitialHeader callback={changeLanguage}/>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {window.app("Log In")}
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
                  label={window.app("User ID")}
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
                  label={window.app("Password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <br />
                <br />
                <Recaptcha
                  align="center"
                  sitekey="6Ldev_gUAAAAABBKuj7jNeKE2NS7w6J8vG_SBXIC"
                  render="explicit"
            
                  verifyCallback={verifyCallback}
                />
                <Button
                  disabled={disabledLogin}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {window.app("Log In")}
                </Button>
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
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCredentials: credentials => dispatch(setCredentials(credentials))
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
