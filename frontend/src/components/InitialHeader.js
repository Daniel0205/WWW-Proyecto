import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import OfflineBoltRoundedIcon from '@material-ui/icons/OfflineBoltRounded';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  header:{
    display: "-webkit-box" 
  },
  languages:{
    display:'flex',
    paddingTop:"5%",
    paddingLeft:"00%"
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <OfflineBoltRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            EnergyUnivalle
          </Typography>
          <Grid item >
            <div id="lenguage" className={classes.languages}>
              <Avatar src="es.png" width="3%" alt="es" data-language="es" onClick={props.callback}/>
              <Avatar src="de.png" width="3%" alt="de" data-language="de" onClick={props.callback}/>
              <Avatar src="pt.png" width="3%" alt="pt" data-language="pt" onClick={props.callback}/>
              <Avatar src="en.png" width="3%" alt="en" data-language="en" onClick={props.callback}/>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
    )
}