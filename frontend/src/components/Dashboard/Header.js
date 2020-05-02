import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setSelectedItem } from "../store/selectedItem/action";



import '../../services/localizationService';


const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles(theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  },

}));


function Header(props) {
  const classes = useStyles();
  const { onDrawerToggle } = props;
  const [userName, setUserName] = useState("");
  const [userLastName] = useState("");

  

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      //if token is not found
      if (props.credentials.name) {
        setUserName(props.credentials.name);
        //setUserLastName(props.credentials.last_name);
      } else {
        setUserName("Guest");
      }
    } else {
      //if token is found
      var name = sessionStorage.getItem("name");
      setUserName(name);
    }
  });



  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
          <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} href="#" variant="body2">
                {window.app("Language:")}
              </Link>
            </Grid>
            <Grid item >
              <div id="lenguage" style={{display:'flex'}}>
                <Avatar src="es.png" width="3%" alt="es" data-language="es" onClick={props.callback}/>
                <Avatar src="de.png" width="3%" alt="de" data-language="de" onClick={props.callback}/>
                <Avatar src="pt.png" width="3%" alt="pt" data-language="pt" onClick={props.callback}/>
                <Avatar src="en.png" width="3%" alt="en" data-language="en" onClick={props.callback}/>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {window.app("Welcome")} {userName} {userLastName}
              </Typography>
            </Grid>
            <Grid item>
            <Link 
              className={classes.button}
              
              color="inherit"
              size="small" 
              href="login">
              {window.app("Log out")}
              </Link>
              
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        {/*<Tabs textColor="inherit">
          <Tab textColor="inherit" value={"0"} label="Users" />
          <Tab textColor="inherit" value={"2"}label="Sign-in Client" />
          <Tab textColor="inherit" value={"3"}label="Templates" />
  <Tab textColor="inherit" value={"4"} label="Usage" />
  </Tabs>*/}
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    credentials: state.loginReducer.credentials,
    item: state.itemReducer.item
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedItem: item => dispatch(setSelectedItem(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
