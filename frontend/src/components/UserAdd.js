import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    image: {
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
    },
    formControl: {
      marginLeft: theme.spacing(1)
    },
  }));

export default function SignUp() {
    const classes = useStyles();
    const [userIdentification, setUserIdentification] = useState("");
    const [names, setNames] = useState("");
    const [lastname, setLastname] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");
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
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            value={userIdentification}
            onChange={event => setUserIdentification(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Identification card"
            label="Identification card"
            name="identification"
            autoComplete="identification"
            autoFocus
          />
          <TextField
            value={names}
            onChange={event => setNames(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="names"
            label="Name(s)"
            name="names"
            autoComplete="name"
          />
          <TextField
            value={lastname}
            onChange={event => setLastname(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="names"
            label="Last Name"
            name="lastnames"
            autoComplete="lastname"
          />
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
          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-filled-label" className={classes.formControl}>Type</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={type}
              onChange={event => setType(event.target.value)}
              className={classes.selectEmpty}
              variant="outlined"
              margin="normal"
              required
              fullWidth
            >
              <MenuItem value="" disabled>
                None
              </MenuItem>
              <MenuItem value={"A"}>Administrator</MenuItem>
              <MenuItem value={"O"}>Operator</MenuItem>
              <MenuItem value={"G"}>Gerent</MenuItem>
            </Select>
          </FormControl>
          
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>

      );
    }
  }
  