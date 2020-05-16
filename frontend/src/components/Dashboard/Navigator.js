import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Description";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PowerIcon from "@material-ui/icons/Power";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PaymentIcon from "@material-ui/icons/Payment";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import BusinessIcon from "@material-ui/icons/Business";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import BarChartIcon from "@material-ui/icons/BarChart";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { connect } from "react-redux";
import { setSelectedItem } from "../store/selectedItem/action";


import '../../services/localizationService';

const categories = [
  {
    id:  "Company",
    children: [
      { id:  "Users", icon: <PeopleIcon />, active: true },
      { id:  "Reports", icon: <EqualizerIcon />, active: false },
      { id:  "Banks", icon: <AccountBalanceIcon />, active: false },
      { id:  "Bills", icon: <DescriptionIcon />, active: false },
      { id:  "Customers", icon: <PeopleAltIcon />, active: false }
    ]
  },
  {
    id: "Inventory",
    children: [
      { id:  "Substations", icon: <AccountTreeIcon />, active: false },
      { id:  "Transformers", icon: <PowerIcon />, active: false }
      // { id: "Analytics", icon: <SettingsIcon />, active: false },
      // { id: "Performance", icon: <TimerIcon />, active: false }
    ]
  }
];


const categoriesManager = [
  {
    id:  "Company",
    children: [
      { id:  "Banks", icon: <AccountBalanceIcon />, active: false },
    ]
  },
  {
    id:  "Reports",
    children: [
      { id:  "Income", icon: <AttachMoneyIcon />, active: false },
      { id:  "Clients", icon: <BarChartIcon />, active: false },
      { id:  "Employees", icon: <SupervisedUserCircleIcon />, active: false },
      { id:  "Assets", icon: <BusinessIcon />, active: false },
    ]
  }
];

const categoriesAdministrator = [
  {
    id:  "Company",
    children: [
      { id:  "Users", icon: <PeopleIcon />, active: true }
    ]
  },
  {
    id:  "Inventory",
    children: [
      { id:  "Substations", icon: <AccountTreeIcon />, active: false },
      { id:  "Transformers", icon: <PowerIcon />, active: false }
      // { id: "Analytics", icon: <SettingsIcon />, active: false },
      // { id: "Performance", icon: <TimerIcon />, active: false }
    ]
  }
];


const categoriesOperator = [
  {
    id:  "Company",
    children: [

      { id:  "Bills", icon: <DescriptionIcon />, active: false },
      { id:  "Customers", icon: <PeopleAltIcon />, active: false },
      { id:  "Record Payments", icon: <PaymentIcon />, active: false }
    ]
  }/*,
  {
    id: "Inventory",
    children: [
      { id: "Substations", icon: <AccountTreeIcon />, active: false },
      { id: "Transformers", icon: <PowerIcon />, active: false }
      // { id: "Analytics", icon: <SettingsIcon />, active: false },
      // { id: "Performance", icon: <TimerIcon />, active: false }
    ]
  }*/
];

const useStyles = makeStyles(theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    fontSize: "inherit"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  }
}));

function Navigator(props) {
  const classes = useStyles();
  //const { ...other } = {PaperProps:props.PaperProps};
  const { ...other } = props;
  const [userType, setUserType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(()=>
  {
    switch (sessionStorage.getItem("type")) {
      case "A":
        return categoriesAdministrator;
      case "O":
        return categoriesOperator;
      case "G":
        return categoriesManager;
      default:
          return categories;
    }
  });

  //Returns all elements with active=false, except "item"
  function activateItem(itemId, categories) {
    props.setSelectedItem(itemId);
    
    var result = categories.map(({ id, children }) => {
      let object = {
        id: id,
        children: children.map(({ id, icon }) => {
          let active = itemId === id ? true : false;
          return { id, icon, active };
        })
      };
      return object;
    });
    return result;
  }

  //Welcome message depending on type of user logged in
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      setUserType("Guest",[]);
    } else {
      if (sessionStorage.getItem("type") === "A") setUserType("Administrator",[]);
      if (sessionStorage.getItem("type") === "O") setUserType("Operator",[]);
      if (sessionStorage.getItem("type") === "G") setUserType("Manager",[]);
    }
  });


  return (
    <Drawer variant="permanent" { ...other } >
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          {window.app(userType)}
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}
          >
            {window.app("Company Overview")}
          </ListItemText>
        </ListItem>
        {selectedCategory.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {window.app(id)}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                onClick={() =>
                  setSelectedCategory(activateItem(childId, selectedCategory))
                }
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {window.app(childId)}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
