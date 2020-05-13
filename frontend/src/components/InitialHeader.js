import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
  header:{
    display: "-webkit-box"
    
  }
}));


//create your forceUpdate hook
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    let val = value +1
    return () => setValue(val); // update the state to force render
  }

export default function InitialHeader(props) {
    const classes = useStyles();

    const forceUpdate = useForceUpdate();

    function send(x){
        props.callback(x)
        forceUpdate()
    }

    return (
    <AppBar position="relative" className={classes.header}>
    <Toolbar>
      <CameraIcon className={classes.icon} />
      <Typography variant="h6" color="inherit" noWrap>
        Album layout
      </Typography>
    </Toolbar>
    <div>
    <TextField
            key="active"
            variant="outlined"
            margin="normal"
            select
            InputProps={{
              defaultValue:"en"
            }}
            
            onChange={send}
            label={window.app("Language")}
            >
            <option value="en">{window.app("English")}</option>
            <option value="es">{window.app("Spanish")}</option>
            <option value="de">{window.app("German")}</option>
            <option value="pt">{window.app("Portuguese")}</option>
          </TextField>
      </div>
  </AppBar>)
}