import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Navigator from "./Navigator";
import Header from "./Header";
import Substation from "./Content/Substation";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarMesssages from "../SnackbarMesssages";

//Options of content listed the Navigation Panel
import UsertList from "./Content/UsertList";
import Banks from "./Content/Banks";
import Customers from "./Content/Customers";
import Apartments from "./Content/Apartments";
import Transformer from "./Content/Transformer";
import SingleBill from "./Content/Bills/SingleBill";
import Reports from "./Content/reports";

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

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1",
  },
}));

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  let val = value + 1;
  return () => setValue(val); // update the state to force render
}

function Paperbase(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [messaje, setMessaje] = React.useState("");
  const [type, setType] = React.useState("");
  const content = props.item;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const forceUpdate = useForceUpdate();

  let changeLanguage = (e) => {
    window.changeLanguage(e.currentTarget.dataset.language);
    forceUpdate();
  };

  //Return a react component in th
  const contentElement = (content) => {
    switch (content) {
      case "Users":
        return <UsertList language={window.language} />;
      case "Banks":
        return <Banks language={window.language} />;
      case "Manager":
        return <Banks language={window.language} />;
      case "Customers":
        return <Customers language={window.language} />;
      case "Apartments":
        return <Apartments language={window.language} />;
      case "Substations":
        return <Substation language={window.language} />;
      case "SingleBill":
        return <SingleBill language={window.language} />;
      case "Transformers":
        return <Transformer language={window.language} />;
      case "Income":
        return <Reports language={window.language} type="Income" />;
      case "Clients":
        return <Reports language={window.language} type="Clients" />;
      case "Assets":
        return <Reports language={window.language} type="Assets" />;
      case "Employees":
        return <Reports language={window.language} type="Employees" />;
      default:
        return (
          <div>
            <h1>{content}</h1>
          </div>
        );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function showMsj(x) {
    console.log(x);
    setType(x.type);
    setMessaje(x.msj);
    setOpen(true);
  }

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            callback={changeLanguage}
            simu={showMsj}
          />
          <main className={classes.main}>
            {/* <Content /> */}
            {/* <UsertList /> */}
            {contentElement(content)}
          </main>
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
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    item: state.itemReducer.item,
  };
};

export default connect(mapStateToProps)(Paperbase);
