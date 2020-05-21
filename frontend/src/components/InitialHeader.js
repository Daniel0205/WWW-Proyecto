import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import TranslateIcon from "@material-ui/icons/Translate";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  header: {
    display: "-webkit-box",
  },
  logo: {
    color: theme.palette.common.white,
  },
  input: {
    color: theme.palette.common.white,
  }, 
  notchedOutline: {
    borderColor: "white !important",
    borderWidth: "1px",
},
}));

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  let val = value + 1;
  return () => setValue(val); // update the state to force render
}

export default function InitialHeader(props) {
  const classes = useStyles();

  const forceUpdate = useForceUpdate();

  function send(x) {
    props.callback(x);
    forceUpdate();
  }
  //position="static"

  return (
      <Typography variant="h6" color="primary !important" >
    <AppBar position="static" className={classes.header}>
      <CssBaseline />
      <Toolbar></Toolbar>
        <TextField  
             className={classes.input}   
           style={{
            // backgroundColor: "blue"
        }}
          key="active"
          variant="outlined"
          margin="normal"
          select
          InputProps={{
            defaultValue: "en", 
            startAdornment: (
              <InputAdornment position="start">
                <TranslateIcon className={classes.logo} />
              </InputAdornment>            
            ),
            className: classes.input,
            
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
          onChange={send}
          label={window.app("Language")} 
        >
          <option value="en">{window.app("English")}</option>
          <option value="es">{window.app("Spanish")}</option>
          <option value="de">{window.app("German")}</option>
          <option value="pt">{window.app("Portuguese")}</option>
        </TextField>
    </AppBar>
      </Typography>
  );
}
